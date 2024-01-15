import { RuleTester } from "../../../utils/eslint-compat"
import { rules } from "../../../../src/utils/rules"
import { loadTestCases } from "../../../utils/utils"

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
