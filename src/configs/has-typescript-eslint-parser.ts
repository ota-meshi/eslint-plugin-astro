import { createRequire } from "module"
import path from "path"

export let hasTypescriptEslintParser = false

try {
  const cwd = process.cwd()
  const relativeTo = path.join(cwd, "__placeholder__.js")
  if (createRequire(relativeTo)("@typescript-eslint/parser"))
    hasTypescriptEslintParser = true
} catch {
  // noop
}
