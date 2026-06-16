import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/prefer-split-class-list.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "prefer-split-class-list",
  rule as any,
  loadTestCases("prefer-split-class-list"),
)
