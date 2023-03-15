export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"
import { Webhooks } from "@octokit/webhooks"

// export async function POST(req: NextRequest, res: NextResponse) {
export async function GET(req: NextRequest, res: NextResponse) {
  const body = req.body as any
  console.log(body)

  const appId = Number(process.env.GH_APP_ID)
  const privateKey = String(process.env.GH_PK)

  const auth = createAppAuth({
    appId,
    privateKey: privateKey,
    clientId: "Iv1.ff37ab5d8e4202c2",
    clientSecret: "fabeff6ff5149dc6067bacccdae6cbe24cae7998"
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

    console.log(diffResponse)

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

  const webhook = new Webhooks({
    secret: String(process.env.GH_WEBHOOKS_SECRET)
  })
  webhook.on("pull_request.opened", handlePullRequestEvent)
  webhook.on("pull_request.synchronize", handlePullRequestEvent)
}
