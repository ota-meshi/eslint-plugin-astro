/* eslint jsdoc/require-jsdoc:0 -- shim */

export { globSync, isDynamicPattern }
export default { globSync, isDynamicPattern }

function globSync(s) {
  return [s]
}

function isDynamicPattern(_s) {
  return false
}
