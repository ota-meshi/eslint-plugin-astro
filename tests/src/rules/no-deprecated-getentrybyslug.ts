import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/no-deprecated-getentrybyslug"
import { loadTestCases } from "../../utils/utils"

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
