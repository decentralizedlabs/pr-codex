import { NextRequest, NextResponse } from "next/server"
import { createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"
import { Webhooks } from "@octokit/webhooks"

const APP_ID = process.env.GH_APP_ID
const privateKey = process.env.PK

const auth = createAppAuth({
  appId: APP_ID,
  privateKey: privateKey,
  installationId: undefined, // Leave it undefined, it will be updated later
  clientId: undefined,
  clientSecret: undefined
})

async function handlePullRequestEvent(event: any) {
  // Get relevant PR information
  const pr = event.payload.pull_request
  const installationId = event.payload.installation.id
  const { owner, repo, number } = {
    owner: pr.base.repo.owner.login,
    repo: pr.base.repo.name,
    number: pr.number
  }

  // Authenticate as the GitHub App installation
  const { token } = await auth({ type: "installation", installationId })

  // Create a new Octokit instance with the authenticated token
  const octokit = new Octokit({ auth: token })

  // Get the diff content
  const diffResponse = await octokit.request("GET /", {
    url: pr.diff_url
  })

  // Process the diff content to create a summary and estimate effort
  // This is a placeholder and should be replaced with actual logic for
  // processing the diff and interacting with the OpenAI API
  const summary = "This is a placeholder summary of the code diff."
  const effortEstimate = `The estimated effort is X hours.`

  // Add a comment to the PR
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: number,
    body: `### Summary:\n${summary}\n\n### Effort Estimate:\n${effortEstimate}`
  })
}

const webhook = new Webhooks({ secret: "my-secret" })
webhook.on("pull_request.opened", handlePullRequestEvent)
webhook.on("pull_request.synchronize", handlePullRequestEvent)

export async function POST(req: NextRequest, res: NextResponse) {
  const body = req.body
  console.log(body)

  // const webhooks = new Webhooks({
  //   secret: process.env.GH_WEBHOOKS_SECRET
  // })
  // const verified = await webhooks.verify(
  //   body,
  //   <string>req.headers["x-hub-signature-256"]
  // )

  // /**
  //  * If the request is verified the following EVENTS are handled:
  //  * PR Opened
  //  * PR Merged
  //  * Comments on PR with state open
  //  */
  // const isPullRequestOpened = body.pull_request && body?.action == "opened"
  // const isPullRequestMerged = body.pull_request?.merged == true
  // const isCommentOnPR =
  //   body.issue?.state == "open" && // PR is open
  //   body.action == "created" && // Comment is created
  //   String(body.comment.user.id) != process.env.GH_APP_USERID && // Comment is not from the bot
  //   body.comment

  // if (verified) {
  //   // isCommentOnPR
  //   //   ? await onComment(body)
  //   //   : isPullRequestOpened
  //   //   ? await onPrOpened(body)
  //   //   : isPullRequestMerged && (await onMerge(body))

  //   res.status(200).json({ message: "OK" })
  // } else {
  //   res.status(401).json({ message: "Unauthorized" })
  // }

  // return res.json({ data })
}
