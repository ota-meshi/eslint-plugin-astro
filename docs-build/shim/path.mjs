/* eslint require-jsdoc:0 -- shim */

export function extname(p) {
  return /\.[\w$-]+$/iu.exec(p)[0]
}

export function join(...args) {
  return args.join("/")
}

export function isAbsolute() {
  return false
}

export function basename(p, ext) {
  const base = p.split("/").pop() || p
  return base.endsWith(ext) ? base.slice(0, -ext.length) : base
}

export function dirname(p) {
  return p.split("/").slice(0, -1).join("/") || p
}

export default { extname, join, isAbsolute, basename, dirname }
