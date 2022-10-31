import { RuleTester } from "eslint"
import { rules } from "../../../../src/utils/rules"
import { loadTestCases } from "../../../utils/utils"

const rule = rules.find(
  (r) => r.meta.docs.ruleName === "jsx-a11y/label-has-associated-control",
)!

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "jsx-a11y/label-has-associated-control",
  rule as any,
  loadTestCases("jsx-a11y/label-has-associated-control"),
)
