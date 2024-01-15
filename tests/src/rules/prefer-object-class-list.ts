import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/prefer-object-class-list"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "prefer-object-class-list",
  rule as any,
  loadTestCases("prefer-object-class-list"),
)
