export default {
  createRequire,
}
export function createRequire() {
  return () => {
    throw new Error()
  }
}
