/* eslint require-jsdoc:0 -- shim */

function extname(p) {
  return /\.[\w$-]+$/iu.exec(p)[0]
}

function join(...args) {
  return args.join("/")
}

function isAbsolute() {
  return false
}

export { extname, join, isAbsolute }
export default { extname, join, isAbsolute }
