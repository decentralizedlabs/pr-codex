import { App } from "@octokit/app"

export async function getInstallations() {
  const app = new App({
    appId: process.env.GH_APP_ID,
    privateKey: process.env.GH_PK
  })

  let allInstallations = []
  let page = 1
  const per_page = 100 // max 100

  while (true) {
    const { data } = await app.octokit.request("GET /app/installations", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      },
      per_page,
      page
    })

    allInstallations = allInstallations.concat(data)

    if (data.length < per_page) {
      break
    }

    page++
  }

  return allInstallations
}
