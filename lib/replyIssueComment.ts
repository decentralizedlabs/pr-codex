import { Octokit } from "@octokit/rest"
import { ChatCompletionRequestMessage } from "openai-streams"
import { codexCommand } from "../utils/constants"
import { generateChatGpt } from "../utils/generateChatGpt"
import { getCodeDiff } from "../utils/getCodeDiff"

const systemPrompt =
  "You are a Git diff assistant. Given a code diff, you answer any question related to it. Be specific and concise. Use line breaks and lists to improve readability. Always wrap file names, functions, objects and similar in backticks (`)."

export async function replyIssueComment(payload: any, octokit: Octokit) {
  // Get relevant PR information
  const { repository, issue, sender, comment, pull_request } = payload

  const question = comment.body.split(codexCommand)[1].trim()

  if (question) {
    const { owner, repo, number, diff_hunk } = {
      owner: repository.owner.login,
      repo: repository.name,
      number: issue?.number ?? pull_request.number,
      diff_hunk: comment?.diff_hunk
    }

    // Get the diff content
    const { codeDiff } = diff_hunk
      ? { codeDiff: diff_hunk }
      : await getCodeDiff(owner, repo, number, octokit)

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

      if (diff_hunk) {
        // TODO: Also use code diff of the `path` instead of just `diff_hunk`
        // Review comment
        const { commit_id, path, line, side, start_line, start_side, id } = {
          commit_id: comment.commit_id,
          path: comment.path,
          line: comment.line,
          side: comment.side,
          start_line: comment.start_line,
          start_side: comment.start_side,
          id: comment.id
        }

        await octokit.pulls.createReviewComment({
          owner,
          repo,
          pull_number: number,
          body: description,
          commit_id,
          path,
          line,
          side,
          start_line,
          start_side,
          in_reply_to: id
        })
      } else {
        // Issue comment
        await octokit.issues.createComment({
          owner,
          repo,
          issue_number: number,
          body: description
        })
      }

      return codexResponse
    }
    throw new Error("No changes in PR")
  }
}
