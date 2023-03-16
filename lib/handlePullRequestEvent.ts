import { AuthInterface } from "@octokit/auth-app/dist-types/types"
import { Octokit } from "@octokit/rest"
import { getFirstComment } from "@utils/getFirstComment"
import { parseDiff } from "@utils/parseDiff"
import { openai } from "./openAI"

export async function handlePullRequestEvent(
  payload: any,
  auth: AuthInterface
) {
  // Get relevant PR information
  const pr = payload.pull_request
  const installationId = payload.installation.id
  const { owner, repo, number } = {
    owner: pr.base.repo.owner.login,
    repo: pr.base.repo.name,
    number: pr.number
  }

  // Authenticate as the GitHub App installation
  const { token } = await auth({ type: "installation", installationId })

  // Create a new Octokit instance with the authenticated token
  const octokit = new Octokit({ auth: token })

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

  const maxChanges = 300
  const { parsedFiles, skippedFiles } = parseDiff(diffContent, maxChanges)
  const codeDiff = parsedFiles.join("").trim()

  // If there are changes, trigger workflow
  if (codeDiff.length != 0) {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a Git diff assistant. You are given a code diff and you must provide a simple description in <200 chars which sums up the changes. Then follow up with a comprehensive summary formatted as a bullet list.${
            skippedFiles
              ? " After the list, add a markdown note mentioning that some files were skipped due to too many changes."
              : ""
          }`
        },
        {
          role: "user",
          content: `Here is the code diff:\n${codeDiff}`
        }
      ],
      temperature: 0.5
    })
    const summary = completion.data.choices[0].message.content

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
  }
}
