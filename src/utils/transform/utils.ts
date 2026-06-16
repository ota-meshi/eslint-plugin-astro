import type { AST } from "astro-eslint-parser"
import Module from "node:module"
import path from "node:path"
import type { RuleContext } from "../../types.ts"
import { getCwd, getSourceCode } from "../compat.ts"
const cache = new WeakMap<AST.AstroProgram, Record<string, unknown>>()
/**
 * Load module
 */
export function loadModule<R>(context: RuleContext, name: string): R | null {
  const sourceCode = getSourceCode(context)
  const key = sourceCode.ast
  let modules = cache.get(key)
  if (!modules) {
    modules = {}
    cache.set(key, modules)
  }
  const mod = modules[name]
  if (mod) return mod as R
  try {
    const cwd = getCwd(context)
    const relativeTo = path.join(cwd, "__placeholder__.js")
    return (modules[name] = Module.createRequire(relativeTo)(name) as R)
  } catch {
    return null
  }
}

/** Get content range */
export function getContentRange(node: AST.JSXElement): AST.Range {
  if (node.closingElement) {
    return [node.openingElement.range[1], node.closingElement.range[0]]
  }
  return [node.openingElement.range[1], node.range[1]]
}
