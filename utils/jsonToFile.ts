export default function jsonToFile(obj: object, fileName: string) {
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" })

  const files = [new File([blob], `${fileName}.json`)]
  return files
}
