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

  async function fetchRepositoriesForInstallation(id: number) {
    try {
      const { token } = await auth({
        type: "installation",
        installationId: id
      })

      const octokit = new Octokit({ auth: token })

      let page = 1
      const per_page = 100
      let allRepositories = []

      while (true) {
        const { data } = await octokit.request(
          "GET /installation/repositories",
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28"
            },
            per_page,
            page
          }
        )

        allRepositories.push(...data.repositories)

        if (data.repositories.length < per_page) {
          break
        }

        page++
      }

      return allRepositories
    } catch (error) {
      console.error(
        `Error fetching repositories for installation ${id}:`,
        error
      )
      return []
    }
  }

  const repositoriesPromises = ids.map(fetchRepositoriesForInstallation)
  const repositoriesArrays = await Promise.all(repositoriesPromises)

  return repositoriesArrays.flat()
}
