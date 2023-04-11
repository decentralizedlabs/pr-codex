export const runtime = "nodejs"
export const fetchCache = "force-no-store"

import { NextRequest, NextResponse } from "next/server"
import { createAppAuth } from "@octokit/auth-app"
import { handlePullRequestEvent } from "@lib/handlePullRequestEvent"

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.json()

  const appId = Number(process.env.GH_APP_ID)
  const privateKey = process.env.GH_PK
  const clientId = process.env.GH_APP_CLIENT_ID
  const clientSecret = process.env.GH_APP_CLIENT_SECRET

  const auth = createAppAuth({
    appId,
    privateKey,
    clientId,
    clientSecret
  })

  if (payload.action == "opened" || payload.action == "synchronize") {
    await handlePullRequestEvent(payload, auth)
  }

  return res.json()
}
