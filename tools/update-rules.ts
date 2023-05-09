import path from "path"
import { rules } from "./lib/load-rules"
import { formatAndSave } from "./lib/utils"

/**
 * Convert text to camelCase
 */
function camelCase(str: string) {
  return str.replace(/[-_](\w)/gu, (_, c) => (c ? c.toUpperCase() : ""))
}

const content = `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
import type { RuleModule } from "../types"
${rules
  .map(
    (rule) =>
      `import ${camelCase(rule.meta.docs.ruleName)} from "../rules/${
        rule.meta.docs.ruleName
      }"`,
  )
  .join("\n")}
import { buildA11yRules } from "../a11y"

export const rules = [
  ${rules.map((rule) => camelCase(rule.meta.docs.ruleName)).join(",")},
  ...buildA11yRules()
] as RuleModule[]
`

const filePath = path.resolve(__dirname, "../src/utils/rules.ts")

// Update file.
void formatAndSave(filePath, content)
