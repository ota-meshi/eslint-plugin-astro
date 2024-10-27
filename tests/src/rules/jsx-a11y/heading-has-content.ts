import { RuleTester } from "../../../utils/eslint-compat"
import { rules } from "../../../../src/rules"
import { loadTestCases } from "../../../utils/utils"

const rule = rules.find(
  (r) => r.meta.docs.ruleName === "jsx-a11y/heading-has-content",
)!

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "jsx-a11y/heading-has-content",
  rule as any,
  loadTestCases("jsx-a11y/heading-has-content"),
)
