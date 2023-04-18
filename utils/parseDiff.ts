type FileChange = { parsedFiles: string[] }

export function parseDiff(diff: string): FileChange {
  const files = diff.split(/diff --git /).slice(1)

  const parsedFiles = files
    .map((file) => {
      const lines = file.split("\n")

      const filepath = lines[0].split(" ")[0].slice(2)

      // Don't consider diff in deleted files
      if (lines[1].startsWith("deleted")) return `deleted ${filepath}`

      const mainContent = lines.slice(6).flatMap((line) => {
        if (line.startsWith("+") || line.startsWith("-")) {
          const trimmedContent = line.slice(1).trim()
          if (!trimmedContent) return []
          return line[0] + trimmedContent
        } else return line.trim()
      })

      return `${filepath}\n${mainContent.join("\n")}`
    })
    .sort((a, b) => a.length - b.length)

  return { parsedFiles }
}
