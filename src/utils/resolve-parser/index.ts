import type { parseForESLint } from "@typescript-eslint/parser"
import { getEspree } from "./espree.ts"
import { requireUserLocal } from "./require-user.ts"

/** A variable used to load modules within our website. */
declare const _ESLINT_PLUGIN_ASTRO_MODULES: {
  require: <T>(id: string) => T
}

/** Resolve parser */
export function resolveParser(): { parseForESLint: typeof parseForESLint } {
  if (typeof _ESLINT_PLUGIN_ASTRO_MODULES !== "undefined") {
    try {
      return toParserForESLint(
        _ESLINT_PLUGIN_ASTRO_MODULES.require("@typescript-eslint/parser"),
      )!
    } catch {
      // ignore
    }
  }

  const modules = [
    "@typescript-eslint/parser",
    "@babel/eslint-parser",
    "espree",
  ]
  for (const id of modules) {
    const parser = toParserForESLint(requireUserLocal(id))
    if (!parser) {
      continue
    }
    return parser
  }

  return toParserForESLint(getEspree())!
}

/** Get the installed parser ID */
export function getInstalledParserId():
  "@typescript-eslint/parser" | "@babel/eslint-parser" | undefined {
  const modules = ["@typescript-eslint/parser", "@babel/eslint-parser"] as const
  return modules.find(requireUserLocal)
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
