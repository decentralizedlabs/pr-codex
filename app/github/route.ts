export const runtime = "nodejs"
export const fetchCache = "force-no-store"

import { NextRequest, NextResponse } from "next/server"
import { summarizePullRequest } from "@lib/summarizePullRequest"
import { handleGithubAuth } from "@lib/handleGithubAuth"

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.json()

  if (payload.action == "opened" || payload.action == "synchronize") {
    const octokit = await handleGithubAuth(payload)

    await summarizePullRequest(payload, octokit)
  }

  return res.json()
}

export async function GET(req: NextRequest, res: NextResponse) {
  return res.json()
}
