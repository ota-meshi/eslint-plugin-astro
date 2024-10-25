import path from "path"
import fs from "fs"
import { createRequire } from "module"
import type { RuleModule } from "../../src/types"

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
    .filter((n) => n.endsWith(".ts"))
    .map((fileName) => require(path.join(rulesPath, fileName)).default)
}

export const rules = readRules()
