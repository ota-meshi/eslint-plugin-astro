import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-set-html-directive"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-set-html-directive",
  rule as any,
  loadTestCases("no-set-html-directive"),
)
