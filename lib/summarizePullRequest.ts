import { Octokit } from "@octokit/rest"
import { ChatCompletionRequestMessage } from "openai-streams"
import {
  codexCommand,
  endDescription,
  startDescription
} from "../utils/constants"
import { generateChatGpt } from "../utils/generateChatGpt"
import { getCodeDiff } from "../utils/getCodeDiff"

const systemPrompt =
  'You are a Git diff assistant. Given a code diff, you provide clear information on its content. Always wrap file names, functions, objects and similar in backticks (`). Start your reply with "This PR". Do not mention imports and negligible changes. Follow the user instructions carefully.'

export async function summarizePullRequest(payload: any, octokit: Octokit) {
  // Get relevant PR information
  const pr = payload.pull_request
  const { owner, repo, pull_number } = {
    owner: pr.base.repo.owner.login,
    repo: pr.base.repo.name,
    pull_number: pr.number
  }

  // Get the diff content using Octokit and GitHub API
  const { codeDiff, skippedFiles } = await getCodeDiff(
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
          'Clearly explain the focus of this PR in less than 300 characters. Then write "\n\n### Detailed summary\n" followed by all notable changes formatted as a bullet list. Be specific and concise.'
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
    }\n\n> ✨ Ask PR-Codex anything about this PR by commenting with \`${codexCommand}{your question}\`\n\n${endDescription}`

    const initBody = pr.body?.split(startDescription)[0]?.trim()
    const endBody = pr.body?.split(endDescription)[1]?.trim()

    const description = hasCodexCommented
      ? (initBody ? initBody + "\n\n" : "") +
        prCodexText +
        (endBody ? "\n\n" + endBody : "")
      : (pr.body ? pr.body + "\n\n" : "") + prCodexText

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
