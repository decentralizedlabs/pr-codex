import { Octokit } from "@octokit/rest"
import { ChatCompletionRequestMessage } from "openai-streams"
import { generateChatGpt } from "../utils/generateChatGpt"
import { getCodeDiff } from "../utils/getCodeDiff"

export const startDescription = "\n\n<!-- start pr-codex -->"
export const endDescription = "<!-- end pr-codex -->"
const systemPrompt =
  "You are a Git diff assistant. Given a code diff, you answer any question related to it. Be concise. Use line breaks and lists to improve readability. Always wrap file names, functions, objects and similar in backticks (`)."

export async function replyIssueComment(payload: any, octokit: Octokit) {
  // Get relevant PR information
  const { repository, issue, sender, comment } = payload

  const question = comment.body.split("/ask-codex")[1].trim()

  if (question) {
    const { owner, repo, issue_number } = {
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: issue.number
    }

    // Get the diff content using Octokit and GitHub API
    const { codeDiff } = await getCodeDiff(owner, repo, issue_number, octokit)

    // If there are changes, trigger workflow
    if (codeDiff?.length != 0) {
      const messages: ChatCompletionRequestMessage[] = [
        {
          role: "system",
          content: `${systemPrompt}\n\nHere is the code diff:\n\n${codeDiff}`
        },
        {
          role: "user",
          content: `${question}`
        }
      ]

      const codexResponse = await generateChatGpt(messages)

      const description = `> ${question}\n\n@${sender.login} ${codexResponse}`

      await octokit.issues.createComment({
        owner,
        repo,
        issue_number,
        body: description
      })

      return codexResponse
    }
    throw new Error("No changes in PR")
  }
}
