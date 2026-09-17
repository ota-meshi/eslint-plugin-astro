/* eslint jsdoc/require-jsdoc:0 -- shim */

export default { createSyncFn, runAsWorker }

export function createSyncFn() {
  return () => {
    throw new Error("synckit is not available in the browser")
  }
}

export function runAsWorker() {
  // noop
}
