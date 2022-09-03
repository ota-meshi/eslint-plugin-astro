/* eslint require-jsdoc:0 -- shim */

import * as all from "astro-eslint-parser"
export const { parseForESLint, parseTemplate, traverseNodes } = all
export default all
// eslint-disable-next-line node/no-missing-import -- ignore
export { setup, parse as parseByCompiler } from "astrojs-compiler-sync"
