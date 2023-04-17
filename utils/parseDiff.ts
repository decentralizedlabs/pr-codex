type FileChange = { parsedFiles: string[]; skippedFiles: string[] }

export function parseDiff(diff: string, maxChanges: number): FileChange {
  let skippedFiles: string[] = []
  const files = diff.split(/diff --git /).slice(1)

  const parsedFiles = files.flatMap((file) => {
    const lines = file.split("\n")

    const filepath = lines[0].split(" ")[1]

    // Don't consider diff in deleted files
    if (lines[1].startsWith("deleted")) return `deleted ${filepath}`

    const mainContent = lines.slice(6).flatMap((line) => {
      if (line.startsWith("+") || line.startsWith("-")) {
        const trimmedContent = line.slice(1).trim()
        if (!trimmedContent) return []
        return line[0] + trimmedContent
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
