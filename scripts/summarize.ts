import { testPayload } from "../utils/github/testPayload"
import { handleGithubAuth } from "../lib/handleGithubAuth"
import { summarizePullRequest } from "../lib/summarizePullRequest"
import dotenv from "dotenv"
dotenv.config()

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
