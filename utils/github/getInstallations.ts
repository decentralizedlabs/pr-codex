import { App } from "@octokit/app"

export async function getInstallations() {
  const app = new App({
    appId: process.env.GH_APP_ID,
    privateKey: process.env.GH_PK
  })

  const { data } = await app.octokit.request("GET /app/installations", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28"
    },
    // TODO: handle pagination
    per_page: 100 // max 100
  })

  return data
}
