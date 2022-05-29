import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-conflict-set-directives"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-conflict-set-directives",
  rule as any,
  loadTestCases("no-conflict-set-directives"),
)
