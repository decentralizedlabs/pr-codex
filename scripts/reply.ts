import dotenv from "dotenv"
import { handleGithubAuth } from "../lib/handleGithubAuth"
import { replyIssueComment } from "../lib/replyIssueComment"
import { testPayloadComment } from "../utils/github/testPayloadComment"

dotenv.config()

// Customize payload in `utils/testPayloadComment`

async function main() {
  try {
    const octokit = await handleGithubAuth(testPayloadComment)

    console.log("Generating comment...")

    const comment = await replyIssueComment(testPayloadComment, octokit)

    console.log(
      "PR-Codex commented:\n\n",
      comment,
      "\n\nView on Github: https://github.com/decentralizedlabs/pr-codex/pull/4"
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
