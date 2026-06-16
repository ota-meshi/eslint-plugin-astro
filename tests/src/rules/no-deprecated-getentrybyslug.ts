import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-deprecated-getentrybyslug.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-deprecated-getentrybyslug",
  rule as any,
  loadTestCases("no-deprecated-getentrybyslug"),
)
