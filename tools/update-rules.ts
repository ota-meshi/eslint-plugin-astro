import path from "path"
import fs from "fs"
import { rules } from "./lib/load-rules"
import { ESLint } from "eslint"

/**
 * Convert text to camelCase
 */
function camelCase(str: string) {
  return str.replace(/[-_](\w)/gu, (_, c) => (c ? c.toUpperCase() : ""))
}

const content = `
import type { RuleModule } from "../types"
${rules
  .map(
    (rule) =>
      `import ${camelCase(rule.meta.docs.ruleName)} from "../rules/${
        rule.meta.docs.ruleName
      }"`,
  )
  .join("\n")}

export const rules = [
    ${rules.map((rule) => camelCase(rule.meta.docs.ruleName)).join(",")}
] as RuleModule[]
`

const filePath = path.resolve(__dirname, "../src/utils/rules.ts")

// Update file.
fs.writeFileSync(filePath, content)

// Format files.
// const linter = new eslint.CLIEngine({ fix: true })
// const report = linter.executeOnFiles([filePath])
// eslint.CLIEngine.outputFixes(report)

// Format files.
const linter = new ESLint({ fix: true })
void linter.lintFiles([filePath]).then((report) => ESLint.outputFixes(report))
