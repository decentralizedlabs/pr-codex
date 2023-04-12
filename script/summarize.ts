import { handleGithubAuth } from "@lib/handleGithubAuth"
import { summarizePullRequest } from "@lib/summarizePullRequest"

const testPayload = {
  installation: { id: 0 },
  action: "synchronize",
  pull_request: {
    base: { repo: { owner: { login: 0 }, name: 0 }, sha: 0 },
    head: { sha: 0 },
    number: 0
  }
}

async function main() {
  const octokit = await handleGithubAuth(testPayload)

  await summarizePullRequest(testPayload, octokit)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
