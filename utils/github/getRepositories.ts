import { createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"

export async function getRepositories(ids: number[]) {
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

  const req = Promise.all(
    ids.map(async (id) => {
      try {
        // Authenticate as the GitHub App installation
        const { token } = await auth({
          type: "installation",
          installationId: id
        })

        // Create a new Octokit instance with the authenticated token
        const octokit = new Octokit({ auth: token })

        return octokit.request("GET /installation/repositories", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28"
          },
          per_page: 100 // max 100
        })
      } catch (error) {
        return null
      }
    })
  )

  const res = await req

  const repositories = res
    .filter((repo) => !!repo)
    .flatMap((repo) => repo.data.repositories)

  return repositories
}
