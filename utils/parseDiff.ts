type FileChange = { parsedFiles: string[]; skippedFiles: string[] }

export function parseDiff(diff: string, maxChanges: number): FileChange {
  let skippedFiles: string[] = []
  const files = diff.split(/diff --git /).slice(1)

  const parsedFiles = files.flatMap((file) => {
    const lines = file.split("\n")

    const filepath = lines[0].split(" ")[1]

    // Don't consider diff in deleted files
    if (lines[1].startsWith("deleted")) return `deleted ${filepath}`

    const mainContent = lines.slice(6).map((line) => {
      if (line.startsWith("+") || line.startsWith("-")) {
        const trimContent = line.slice(1).trim()
        return line[0] + trimContent
      } else return line.trim()
    })
    const changes = mainContent.filter(
      (line) => line.startsWith("+") || line.startsWith("-")
    ).length

    if (changes <= maxChanges) {
      return `${filepath}\n${mainContent.join("\n")}`
    }
    skippedFiles.push(`\`${filepath.slice(2)}\``)
    return []
  })

  return { parsedFiles, skippedFiles }
}
