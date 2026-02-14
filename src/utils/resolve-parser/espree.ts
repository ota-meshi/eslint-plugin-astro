import type { ParserOptions, TSESTree } from "@typescript-eslint/types"
import { createRequire } from "node:module"
import path from "node:path"
import { requireUserLocal } from "./require-user.ts"

type Espree = {
  parse(code: string, options?: ParserOptions | null): TSESTree.Program
}
let espreeCache: Espree | null = null

/** Checks if given path is linter path */
function isLinterPath(p: string): boolean {
  return p.includes(`eslint${path.sep}lib${path.sep}linter${path.sep}linter.js`)
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
  }
  if (!espreeCache) {
    espreeCache = requireUserLocal("espree")
  }
  if (!espreeCache) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, n/no-extraneous-require -- ignore
    espreeCache = require("espree")
  }

  return espreeCache!
}
