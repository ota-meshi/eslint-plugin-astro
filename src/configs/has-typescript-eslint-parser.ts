import { createRequire } from "module"
import path from "path"
import type tsParser from "@typescript-eslint/parser"

export let hasTypescriptEslintParser = false
export let tsESLintParser: typeof tsParser | null = null

try {
  const cwd = process.cwd()
  const relativeTo = path.join(cwd, "__placeholder__.js")
  if ((tsESLintParser = createRequire(relativeTo)("@typescript-eslint/parser")))
    hasTypescriptEslintParser = true
} catch {
  // noop
}
