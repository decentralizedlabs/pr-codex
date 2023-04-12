export function joinStringsUntilMaxLength(
  parsedFiles: string[],
  maxLength: number
): string {
  let combinedString = ""
  let currentLength = 0

  for (const file of parsedFiles) {
    const fileLength = file.length

    if (currentLength + fileLength <= maxLength) {
      combinedString += file
      currentLength += fileLength
    } else {
      const remainingLength = maxLength - currentLength
      combinedString += file.slice(0, remainingLength)
      break
    }
  }

  return combinedString
}
