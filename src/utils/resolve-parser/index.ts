import { createRequire } from "module"
import path from "path"
import type { parseForESLint } from "@typescript-eslint/parser"
import { getEspree } from "./espree"

/** Resolve parser */
export function resolveParser(): { parseForESLint: typeof parseForESLint } {
  const modules = [
    "@typescript-eslint/parser",
    "@babel/eslint-parser",
    "espree",
  ]
  for (const id of modules) {
    const parser = toParserForESLint(requireLocal(id))
    if (!parser) {
      continue
    }
    return parser
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- ignore
    return toParserForESLint(require("@typescript-eslint/parser"))!
  } catch {
    // ignore
  }
  return toParserForESLint(getEspree())!
}

/** To the parser for ESLint */
function toParserForESLint(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  mod: any,
): { parseForESLint: typeof parseForESLint } | null {
  for (const m of [mod, mod && mod.default]) {
    if (!m) {
      continue
    }
    if (typeof m.parseForESLint === "function") {
      return m
    }
    if (typeof m.parse === "function") {
      return {
        parseForESLint(...args) {
          return {
            ast: m.parse(...args),
          } as never
        },
      }
    }
  }
  return null
}

/** Get the installed parser ID */
export function getInstalledParserId():
  | "@typescript-eslint/parser"
  | "@babel/eslint-parser"
  | undefined {
  const modules = ["@typescript-eslint/parser", "@babel/eslint-parser"] as const
  for (const id of modules) {
    const mod = requireLocal(id)
    if (!mod) {
      continue
    }
    return id
  }
  return undefined
}

/** Require from use local */
function requireLocal(id: string) {
  try {
    // Apply a patch to parse .astro files as TSX.
    const cwd = process.cwd()
    const relativeTo = path.join(cwd, "__placeholder__.js")
    return createRequire(relativeTo)(id)
  } catch {
    return null
  }
}
