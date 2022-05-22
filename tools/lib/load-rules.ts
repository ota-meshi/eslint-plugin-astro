import path from "path"
import fs from "fs"

/**
 * Get the all rules
 * @returns {Array} The all rules
 */
function readRules() {
  const rulesLibRoot = path.resolve(__dirname, "../../src/rules")
  const rules = []
  for (const name of fs
    .readdirSync(rulesLibRoot)
    .filter((n) => n.endsWith(".ts"))) {
    const ruleName = name.replace(/\.ts$/u, "")
    const ruleId = `astro/${ruleName}`
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- ignore
    const rule = require(path.join(rulesLibRoot, name)).default

    rule.meta.docs.ruleName = ruleName
    rule.meta.docs.ruleId = ruleId

    rules.push(rule)
  }
  return rules
}

export const rules = readRules()
