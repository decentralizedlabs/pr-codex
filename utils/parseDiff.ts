type FileChange = { parsedFiles: string[]; skippedFiles: string[] }

export function parseDiff(diff: string, maxChanges: number): FileChange {
  let skippedFiles: string[] = []
  const files = diff.split(/diff --git /).slice(1)
  const parsedFiles = files.map((file) => {
    const lines = file.split("\n")
    const filepath = lines[0].split(" ")[1]
    const mainContent = lines.slice(4)
    const changes = mainContent.filter(
      (line) => line.startsWith("+") || line.startsWith("-")
    ).length

    if (changes <= maxChanges) {
      return file
    }
    skippedFiles.push(`\`${filepath.slice(2)}\``)
  })
  return { parsedFiles, skippedFiles }
}
