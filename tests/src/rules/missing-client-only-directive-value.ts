import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/missing-client-only-directive-value"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "missing-client-only-directive-value",
  rule as any,
  loadTestCases("missing-client-only-directive-value"),
)
