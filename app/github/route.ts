import { handleGithubAuth } from "@lib/handleGithubAuth"
import { summarizePullRequest } from "@lib/summarizePullRequest"
import { NextRequest, NextResponse } from "next/server"

export const fetchCache = "force-no-store"

export async function POST(req: NextRequest) {
  const payload = await req.json()

  try {
    if (payload.action == "opened" || payload.action == "synchronize") {
      const octokit = await handleGithubAuth(payload)

      await summarizePullRequest(payload, octokit)
    }

    return NextResponse.json("ok")
  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}
