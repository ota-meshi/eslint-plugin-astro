import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/no-set-html-directive"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-set-html-directive",
  rule as any,
  loadTestCases("no-set-html-directive"),
)
