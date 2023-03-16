type FileChange = { parsedFiles: string[]; skippedFiles: boolean }

export function parseDiff(diff: string, maxChanges: number): FileChange {
  let skippedFiles: boolean
  const files = diff.split(/diff --git /).slice(1)
  const parsedFiles = files.map((file) => {
    const lines = file.split("\n")
    const mainContent = lines.slice(4)
    const changes = mainContent.filter(
      (line) => line.startsWith("+") || line.startsWith("-")
    ).length

    if (changes <= maxChanges) {
      return file
    }
    skippedFiles = true
  })
  return { parsedFiles, skippedFiles }
}
