import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/missing-client-only-directive-value.ts"
import { loadTestCases } from "../../utils/utils.ts"

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
