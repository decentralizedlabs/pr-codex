import { Octokit } from "@octokit/rest"
import { ChatCompletionRequestMessage } from "openai-streams"
import { generateChatGpt } from "../utils/generateChatGpt"
import { getCodeDiff } from "../utils/getCodeDiff"

export const startDescription = "\n\n<!-- start pr-codex -->"
export const endDescription = "<!-- end pr-codex -->"
const systemPrompt =
  "You are a Git diff assistant. Given a code diff, you provide a clear and concise description of its content. Always wrap file names, functions, objects and similar in backticks (`)."

export async function summarizePullRequest(payload: any, octokit: Octokit) {
  // Get relevant PR information
  const pr = payload.pull_request
  const { owner, repo, pull_number } = {
    owner: pr.base.repo.owner.login,
    repo: pr.base.repo.name,
    pull_number: pr.number
  }

  // Get the diff content using Octokit and GitHub API
  const { codeDiff, skippedFiles, maxLengthExceeded } = await getCodeDiff(
    owner,
    repo,
    pull_number,
    octokit
  )

  // If there are changes, trigger workflow
  if (codeDiff?.length != 0) {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: `${systemPrompt}\n\nHere is the code diff:\n\n${codeDiff}`
      },
      {
        role: "user",
        content:
          'Starting with "This PR", clearly explain the focus of this PR in prose, in less than 300 characters. Then follow up with "\n\n### Detailed summary\n" and make a comprehensive list of all changes.'
      }
    ]

    const codexResponse = await generateChatGpt(messages)

    // Check if the PR already has a comment from the bot
    const hasCodexCommented =
      payload.action == "synchronize" &&
      pr.body?.split(startDescription).length > 1

    const prCodexText = `${startDescription}\n\n${
      (hasCodexCommented ? pr.body.split(startDescription)[0].trim() : pr.body)
        ? "---\n\n"
        : ""
    }## PR-Codex overview\n${codexResponse}${
      skippedFiles.length != 0
        ? `\n\n> The following files were skipped due to too many changes: ${skippedFiles.join(
            ", "
          )}`
        : ""
    }${
      maxLengthExceeded
        ? "\n\n> The code diff exceeds the max number of characters, so this overview may be incomplete."
        : ""
    }\n\n${endDescription}`

    const description = hasCodexCommented
      ? pr.body.split(startDescription)[0] +
        prCodexText +
        pr.body.split(endDescription)[1]
      : (pr.body ?? "") + prCodexText

    await octokit.issues.update({
      owner,
      repo,
      issue_number: pull_number,
      body: description
    })

    return codexResponse
  }
  throw new Error("No changes in PR")
}
