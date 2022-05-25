import { RuleTester } from "eslint"
import rule from "../../../src/rules/prefer-class-list-directive"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "prefer-class-list-directive",
  rule as any,
  loadTestCases("prefer-class-list-directive"),
)
