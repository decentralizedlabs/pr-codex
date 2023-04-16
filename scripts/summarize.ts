import dotenv from "dotenv"
import { handleGithubAuth } from "../lib/handleGithubAuth"
import { summarizePullRequest } from "../lib/summarizePullRequest"
import { testPayloadSyncPr } from "../utils/github/testPayloadSyncPr"

dotenv.config()

// Customize payload in `utils/testPayloadSyncPr`

async function main() {
  const octokit = await handleGithubAuth(testPayloadSyncPr)

  try {
    console.log("Generating summary...")

    const summary = await summarizePullRequest(testPayloadSyncPr, octokit)

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
