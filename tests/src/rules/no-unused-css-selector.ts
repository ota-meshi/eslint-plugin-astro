import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-unused-css-selector"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-unused-css-selector",
  rule as any,
  loadTestCases("no-unused-css-selector"),
)
