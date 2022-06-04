import type { ParserOptions, TSESTree } from "@typescript-eslint/types"
import { createRequire } from "module"
import path from "path"

type Espree = {
  parse(code: string, options?: ParserOptions | null): TSESTree.Program
}
let espreeCache: Espree | null = null

/** Checks if given path is linter path */
function isLinterPath(p: string): boolean {
  return (
    // ESLint 6 and above
    p.includes(`eslint${path.sep}lib${path.sep}linter${path.sep}linter.js`) ||
    // ESLint 5
    p.includes(`eslint${path.sep}lib${path.sep}linter.js`)
  )
}

/**
 * Load `espree` from the loaded ESLint.
 * If the loaded ESLint was not found, just returns `require("espree")`.
 */
export function getEspree(): Espree {
  if (!espreeCache) {
    // Lookup the loaded eslint
    const linterPath = Object.keys(require.cache || {}).find(isLinterPath)
    if (linterPath) {
      try {
        espreeCache = createRequire(linterPath)("espree")
      } catch {
        // ignore
      }
    }
    if (!espreeCache) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
      espreeCache = require("espree")
    }
  }

  return espreeCache!
}
