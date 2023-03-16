export const runtime = "nodejs"
export const fetchCache = "force-no-store"

import { NextRequest, NextResponse } from "next/server"
import { createAppAuth } from "@octokit/auth-app"
import { handlePullRequestEvent } from "@lib/handlePullRequestEvent"

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.json()

  const appId = Number(process.env.GH_APP_ID)
  const privateKey = String(process.env.GH_PK)

  const auth = createAppAuth({
    appId,
    privateKey,
    clientId: "Iv1.ff37ab5d8e4202c2",
    clientSecret: "fabeff6ff5149dc6067bacccdae6cbe24cae7998"
  })

  if (payload.action == "opened" || payload.action == "synchronize") {
    await handlePullRequestEvent(payload, auth)
  }

  return res
}
