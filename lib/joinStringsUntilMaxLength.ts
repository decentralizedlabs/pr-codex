export function joinStringsUntilMaxLength(
  parsedFiles: string[],
  maxLength: number
) {
  let codeDiff = ""
  let currentLength = 0
  let maxLengthExceeded = false

  for (const file of parsedFiles) {
    const fileLength = file.length

    if (currentLength + fileLength <= maxLength) {
      codeDiff += file
      currentLength += fileLength
    } else {
      maxLengthExceeded = true
      const remainingLength = maxLength - currentLength
      codeDiff += file.slice(0, remainingLength)
      break
    }
  }

  return { codeDiff, maxLengthExceeded }
}
