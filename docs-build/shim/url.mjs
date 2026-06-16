/* eslint jsdoc/require-jsdoc:0 -- shim */

export default { fileURLToPath }

export function fileURLToPath(url) {
  const normalizedUrl = typeof url === "string" ? url : url.href
  if (normalizedUrl.startsWith("file://")) {
    return decodeURIComponent(normalizedUrl.slice(7))
  }
  throw new Error(`Invalid URL: ${normalizedUrl}`)
}
