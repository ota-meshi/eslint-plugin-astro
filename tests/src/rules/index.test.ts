import { readdirSync } from "fs"
import { join } from "path"
import assert from "assert"
import { rules } from "../../../src/rules/index"
import { buildA11yRules } from "src/a11y"

describe("Test src/rules/index.ts", () => {
  function getImportedRuleNames() {
    return rules.map((rule) => rule.meta.docs.ruleName)
  }

  function assertRulesImported(rulesToCheck: string[]) {
    const importedRules = getImportedRuleNames()
    rulesToCheck.forEach((ruleName) => {
      assert(
        importedRules.includes(ruleName),
        `Imported rules should include ${ruleName}`,
      )
    })
  }

  it("should import all rule files", () => {
    const rulesDir = join(__dirname, "../../../src/rules")
    const ruleFiles = readdirSync(rulesDir)
      .filter(
        (file) =>
          file.endsWith(".ts") &&
          file !== "index.ts" &&
          !file.endsWith(".test.ts"),
      )
      .map((file) => file.replace(".ts", ""))
    assertRulesImported(ruleFiles)
  })

  it("should import all a11y rules", () => {
    const a11yRules = buildA11yRules().map((rule) => rule.meta.docs.ruleName)
    assertRulesImported(a11yRules)
  })
})
