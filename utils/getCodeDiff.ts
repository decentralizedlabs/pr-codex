import { Octokit } from "@octokit/rest"
import { joinStringsUntilMaxLength } from "../lib/joinStringsUntilMaxLength"
import { parseDiff } from "./parseDiff"

const maxChanges = 1000
const maxCodeDiff = 11500

export const getCodeDiff = async (
  owner: string,
  repo: string,
  pull_number: number,
  octokit: Octokit
) => {
  const compareResponse = await octokit.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: {
      format: "diff"
    }
  })

  const diffContent = String(compareResponse.data)

  // Parses the diff content and returns the parsed files.
  // If the number of changes in a file is greater than `maxChanges` changes, the file will be skipped.
  // The codeDiff is the joined string of parsed files, up to a max length of `maxCodeDiff`.
  const { parsedFiles, skippedFiles } = parseDiff(diffContent, maxChanges)

  const { codeDiff, maxLengthExceeded } = joinStringsUntilMaxLength(
    parsedFiles,
    maxCodeDiff
  )

  return { codeDiff, skippedFiles, maxLengthExceeded }
}
