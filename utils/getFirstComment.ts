import { Octokit } from "@octokit/rest"

export async function getFirstComment(
  octokit: Octokit,
  owner: string,
  repo: string,
  number: number
) {
  let firstComment: any

  for await (const response of octokit.paginate.iterator(
    octokit.rest.issues.listComments,
    {
      owner,
      repo,
      issue_number: number
    }
  )) {
    for (const comment of response.data) {
      if (comment.user.login === "pr-codex[bot]") {
        firstComment = comment
        break
      }
    }
    if (firstComment) {
      break
    }
  }

  return firstComment
}
