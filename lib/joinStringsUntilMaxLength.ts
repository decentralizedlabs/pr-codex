export function joinStringsUntilMaxLength(
  parsedFiles: string[],
  maxLength: number
) {
  let codeDiff = ""
  let currentLength = 0
  let skippedFiles: string[] = []

  for (const file of parsedFiles) {
    if (currentLength === maxLength) {
      const filepath = file.split("\n")[0]
      skippedFiles.push(`\`${filepath}\``)
      continue
    }

    const fileLength = file.length

    if (currentLength + fileLength <= maxLength) {
      codeDiff += file
      currentLength += fileLength
    } else {
      const filepath = file.split("\n")[0]
      const remainingLength = maxLength - currentLength
      codeDiff += file.slice(0, remainingLength)
      currentLength = maxLength
      skippedFiles.push(`\`${filepath}\``)
    }
  }

  return {
    codeDiff,
    skippedFiles
  }
}
