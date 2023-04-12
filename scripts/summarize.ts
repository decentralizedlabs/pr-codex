import { handleGithubAuth } from "../lib/handleGithubAuth"
import { summarizePullRequest } from "../lib/summarizePullRequest"
import dotenv from "dotenv"
dotenv.config()

const testPayload = {
  installation: { id: 35293807 },
  action: "synchronize",
  pull_request: {
    number: 4,
    base: {
      repo: { owner: { login: "decentralizedlabs" }, name: "pr-codex" },
      sha: "99dfdd96142d171546b59504fbba84cffe23ebd2"
    },
    head: { sha: "51cfb7599b7eea7fd74ec5a0cc4c8c5c77150404" }
  }
}

async function main() {
  const octokit = await handleGithubAuth(testPayload)

  try {
    console.log("Generating summary...")

    const summary = await summarizePullRequest(testPayload, octokit)

    console.log(
      "PR-Codex wrote:\n\n",
      summary,
      "\n\nView on Github: https://github.com/decentralizedlabs/pr-codex/pull/4#issuecomment-1471921714"
    )
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
