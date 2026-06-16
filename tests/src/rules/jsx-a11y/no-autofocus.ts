import { RuleTester } from "../../../utils/eslint-compat.ts"
import { rules } from "../../../../src/rules/index.ts"
import { loadTestCases } from "../../../utils/utils.ts"

const rule = rules.find(
  (r) => r.meta.docs.ruleName === "jsx-a11y/no-autofocus",
)!

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "jsx-a11y/no-autofocus",
  rule as any,
  loadTestCases("jsx-a11y/no-autofocus"),
)
