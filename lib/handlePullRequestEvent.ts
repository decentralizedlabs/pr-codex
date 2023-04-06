import { AuthInterface } from "@octokit/auth-app/dist-types/types"
import { Octokit } from "@octokit/rest"
import { getFirstComment } from "@utils/getFirstComment"
import { parseDiff } from "@utils/parseDiff"
import { joinStringsUntilMaxLength } from "./joinStringsUntilMaxLength"
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

  // Parses the diff content and returns the parsed files.
  // If the number of changes in a file is greater than 1k changes, the file will be skipped.
  // The codeDiff is the joined string of parsed files, up to a max length of 10k.
  const maxChanges = 1000
  const { parsedFiles, skippedFiles } = parseDiff(diffContent, maxChanges)
  const codeDiff = joinStringsUntilMaxLength(parsedFiles, 10000)

  // If there are changes, trigger workflow
  if (codeDiff.length != 0) {
    const prompt = `You are a Git diff assistant. Given a code diff, you start with a "### Tldr\nThis PR" and provide a simple description in less than 300 chars which sums up the changes in prose. Then continue with a "\n\n### Detailed summary\n" and follow up with a comprehensive list of all changes. Make sure to use backtick \` when mentioning files, functions, objects and similar. ${
      skippedFiles.length != 0
        ? ` After the list, conclude with "\n\n> " and mention that the following files were skipped due to too many changes: ${skippedFiles.join(
            ","
          )}.`
        : ""
    }`

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: `Here is the code diff:\n${codeDiff}`
        }
      ],
      temperature: 0.7
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
