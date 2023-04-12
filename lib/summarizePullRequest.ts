import { Octokit } from "@octokit/rest"
import { getFirstComment } from "../utils/github/getFirstComment"
import { parseDiff } from "../utils/parseDiff"
import { joinStringsUntilMaxLength } from "./joinStringsUntilMaxLength"

import { ChatCompletionRequestMessage, OpenAI } from "openai-streams"
import { yieldStream } from "yield-stream"

export async function summarizePullRequest(payload: any, octokit: Octokit) {
  // Get relevant PR information
  const pr = payload.pull_request
  const { owner, repo, number } = {
    owner: pr.base.repo.owner.login,
    repo: pr.base.repo.name,
    number: pr.number
  }

  // Get the first comment from the bot
  const firstComment =
    payload.action == "synchronize" &&
    (await getFirstComment(octokit, owner, repo, number))

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
  if (codeDiff.length != 0) {
    const systemPrompt = `You are a Git diff assistant. Given a code diff, you start with a "### Tldr\nThis PR" and provide a simple description in less than 300 chars which sums up the changes in prose. Then continue with a "\n\n### Detailed summary\n" and follow up with a comprehensive list of all changes. Be concise. Make sure to use backticks \` when mentioning files, functions, objects and similar. ${
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

    if (firstComment) {
      // Edit pinned bot comment to the PR
      await octokit.issues.updateComment({
        owner,
        repo,
        comment_id: firstComment.id,
        body: summary
      })
    } else {
      // Add a comment to the PR
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: number,
        body: summary
      })
    }

    return summary
  }
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
