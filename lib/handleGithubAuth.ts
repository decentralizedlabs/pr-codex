import { createAppAuth } from "@octokit/auth-app"
import { Octokit } from "@octokit/rest"

export async function handleGithubAuth(payload: any) {
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

  const installationId = payload.installation.id

  // Authenticate as the GitHub App installation
  const { token } = await auth({ type: "installation", installationId })

  // Create a new Octokit instance with the authenticated token
  return new Octokit({ auth: token })
}
