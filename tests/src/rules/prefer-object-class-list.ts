import { RuleTester } from "eslint"
import rule from "../../../src/rules/prefer-object-class-list"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "prefer-object-class-list",
  rule as any,
  loadTestCases("prefer-object-class-list"),
)
