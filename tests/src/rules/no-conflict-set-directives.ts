import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/no-conflict-set-directives.ts"
import { loadTestCases } from "../../utils/utils.ts"

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
