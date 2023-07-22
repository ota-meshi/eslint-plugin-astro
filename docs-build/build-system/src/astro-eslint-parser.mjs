/* eslint require-jsdoc:0 -- shim */

import * as all from "astro-eslint-parser"
export const { parseForESLint, parseTemplate, traverseNodes } = all
export default all
// eslint-disable-next-line n/no-extraneous-import -- Demo
export { setup, parse as parseByCompiler } from "astrojs-compiler-sync"
