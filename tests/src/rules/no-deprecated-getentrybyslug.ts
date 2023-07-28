import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-deprecated-getentrybyslug"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-deprecated-getentrybyslug",
  rule as any,
  loadTestCases("no-deprecated-getentrybyslug"),
)
