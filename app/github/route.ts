import { handleGithubAuth } from "@lib/handleGithubAuth"
import { replyIssueComment } from "@lib/replyIssueComment"
import { summarizePullRequest } from "@lib/summarizePullRequest"
import { codexCommand } from "@utils/constants"
import { NextRequest, NextResponse } from "next/server"

export const fetchCache = "force-no-store"

export async function POST(req: NextRequest) {
  const payload = await req.json()

  try {
    if (payload.action == "opened" || payload.action == "synchronize") {
      // If a PR is opened or updated, summarize it
      const octokit = await handleGithubAuth(payload)

      await summarizePullRequest(payload, octokit)
    } else if (payload.action == "created") {
      if (payload.comment.body.includes(codexCommand)) {
        // If a comment is created, reply to it
        const octokit = await handleGithubAuth(payload)

        await replyIssueComment(payload, octokit)
      }
    }

    return NextResponse.json("ok")
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}
