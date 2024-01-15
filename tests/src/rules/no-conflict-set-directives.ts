import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/no-conflict-set-directives"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-conflict-set-directives",
  rule as any,
  loadTestCases("no-conflict-set-directives"),
)
