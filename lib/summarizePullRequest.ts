import { Octokit } from "@octokit/rest"
import { ChatCompletionRequestMessage, OpenAI } from "openai-streams"
import { yieldStream } from "yield-stream"
import { parseDiff } from "../utils/parseDiff"
import { joinStringsUntilMaxLength } from "./joinStringsUntilMaxLength"

export const startDescription = "\n\n<!-- start pr-codex -->"
export const endDescription = "<!-- end pr-codex -->"

export async function summarizePullRequest(payload: any, octokit: Octokit) {
  // Get relevant PR information
  const pr = payload.pull_request
  const { owner, repo, number } = {
    owner: pr.base.repo.owner.login,
    repo: pr.base.repo.name,
    number: pr.number
  }

  // Get the diff content using Octokit and GitHub API
  const compareResponse = await octokit.rest.repos.compareCommits({
    owner,
    repo,
    base: pr.base.sha,
    head: pr.head.sha,
    mediaType: {
      format: "diff"
    }
  })
  const diffContent = String(compareResponse.data)

  // Parses the diff content and returns the parsed files.
  // If the number of changes in a file is greater than 1k changes, the file will be skipped.
  // The codeDiff is the joined string of parsed files, up to a max length of 10k.
  const maxChanges = 1000
  const { parsedFiles, skippedFiles } = parseDiff(diffContent, maxChanges)
  const codeDiff = joinStringsUntilMaxLength(parsedFiles, 10000)

  // If there are changes, trigger workflow
  if (codeDiff?.length != 0) {
    const systemPrompt = `You are a Git diff assistant. Always begin with "This PR". Given a code diff, you provide a simple description in prose, in less than 300 chars, which sums up the changes. Continue with "\n\n### Detailed summary\n" and make a comprehensive list of all changes, excluding any eventual skipped files. Be concise. Always wrap file names, functions, objects and similar in backticks (\`).${
      skippedFiles.length != 0
        ? ` After the list, conclude with "\n\n> " and mention that the following files were skipped due to too many changes: ${skippedFiles.join(
            ","
          )}.`
        : ""
    }`

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: `Here is the code diff:\n\n${codeDiff}`
      }
    ]

    const summary = await generateChatGpt(messages)

    // Check if the PR already has a comment from the bot
    const hasCodexCommented =
      payload.action == "synchronize" &&
      pr.body?.split(startDescription).length > 1

    // if (firstComment) {
    //   // Edit pinned bot comment to the PR
    //   await octokit.issues.updateComment({
    //     owner,
    //     repo,
    //     comment_id: firstComment.id,
    //     body: summary
    //   })
    // } else {
    //   // Add a comment to the PR
    //   await octokit.issues.createComment({
    //     owner,
    //     repo,
    //     issue_number: number,
    //     body: summary
    //   })
    // }

    const prCodexText = `${startDescription}\n\n${
      (hasCodexCommented ? pr.body.split(startDescription)[0].trim() : pr.body)
        ? "---\n\n"
        : ""
    }## PR-Codex overview\n${summary}\n\n${endDescription}`

    const description = hasCodexCommented
      ? pr.body.split(startDescription)[0] +
        prCodexText +
        pr.body.split(endDescription)[1]
      : (pr.body ?? "") + prCodexText

    await octokit.issues.update({
      owner,
      repo,
      issue_number: number,
      body: description
    })

    return summary
  }
  throw new Error("No changes in PR")
}

const generateChatGpt = async (messages: ChatCompletionRequestMessage[]) => {
  const DECODER = new TextDecoder()
  let text = ""

  try {
    const stream = await OpenAI(
      "chat",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages
      },
      { apiKey: process.env.OPENAI_API_KEY }
    )

    for await (const chunk of yieldStream(stream)) {
      try {
        const decoded: string = DECODER.decode(chunk)

        if (decoded === undefined)
          throw new Error(
            "No choices in response. Decoded response: " +
              JSON.stringify(decoded)
          )

        text += decoded
      } catch (err) {
        console.error(err)
      }
    }
  } catch (err) {
    console.error(err)
  }

  return text
}
