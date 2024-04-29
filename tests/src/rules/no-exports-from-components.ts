import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/no-exports-from-components"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-exports-from-components",
  rule as any,
  loadTestCases("no-exports-from-components"),
)
