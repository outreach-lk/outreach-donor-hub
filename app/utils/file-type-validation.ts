export function isFileValidImage(
  file: File,
  maxSize: number = 5000000
): boolean {
  return file && file["type"].split("/")[0] === "image" && file.size <= maxSize;
}
