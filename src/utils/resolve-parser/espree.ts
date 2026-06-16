import type { ParserOptions, TSESTree } from "@typescript-eslint/types"
import Module, { createRequire } from "node:module"
import path from "node:path"
import * as espree from "espree"
import { requireUserLocal } from "./require-user.ts"

type Espree = {
  parse(code: string, options?: ParserOptions | null): TSESTree.Program
}
type ModuleWithCache = typeof Module & {
  _cache?: Record<string, unknown>
}
let espreeCache: Espree | null = null

/** Checks if given path is linter path */
function isLinterPath(p: string): boolean {
  return p.includes(`eslint${path.sep}lib${path.sep}linter${path.sep}linter.js`)
}

/**
 * Load `espree` from the loaded ESLint.
 * If the loaded ESLint was not found, fall back to the local `espree`.
 */
export function getEspree(): Espree {
  if (!espreeCache) {
    // Lookup the loaded eslint
    const moduleCache = (Module as ModuleWithCache)._cache
    const linterPath = Object.keys(moduleCache || {}).find(isLinterPath)
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
    espreeCache = espree
  }

  return espreeCache
}
