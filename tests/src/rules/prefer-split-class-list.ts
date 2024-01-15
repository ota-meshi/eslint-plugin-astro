import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/prefer-split-class-list"
import { loadTestCases } from "../../utils/utils"

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
