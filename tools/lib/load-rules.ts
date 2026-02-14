import path from "node:path"
import fs from "node:fs"
import { createRequire } from "node:module"
import type { RuleModule } from "../../src/types.ts"

const url = import.meta.url
const require = createRequire(url)

/**
 * Import all rules from `src/rules` and return them as an array.
 * @returns {RuleModule[]}
 */
function readRules(): RuleModule[] {
  const rulesPath = path.resolve(__dirname, "../../src/rules")
  return fs
    .readdirSync(rulesPath)
    .filter((n) => n.endsWith(".ts") && n !== "index.ts")
    .map((fileName) => require(path.join(rulesPath, fileName)).default)
}

/**
 * This array is designed primarily for generator scripts in the "tools/" folder.
 * It does not include extended rules (such as `a11y` rules).
 * For a complete set of rules, consider using the generated file `rules/index.ts` instead.
 */
export const rules: RuleModule[] = readRules()
