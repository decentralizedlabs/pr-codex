import { createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"

const appId = Number(process.env.GH_APP_ID)
const privateKey = process.env.GH_PK

export async function getRepositories(ids: number[]) {
  async function fetchRepositoriesForInstallation(id: number) {
    const installationOctokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId,
        privateKey,
        installationId: id
      }
    })

    let repositories: any[] = []
    let page = 1
    let hasNextPage = true
    try {
      while (hasNextPage) {
        const response =
          await installationOctokit.rest.apps.listReposAccessibleToInstallation(
            {
              per_page: 100,
              page: page
            }
          )

        repositories = repositories.concat(response.data.repositories)
        hasNextPage = response.data.total_count > repositories.length
        page++
      }
    } catch (error) {
      console.error(error.message)
    }

    return repositories
  }

  const repos = ids.map((id) => fetchRepositoriesForInstallation(id))

  const repositoriesArrays = await Promise.all(repos)

  return repositoriesArrays.flat()
}
