import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/no-unused-define-vars-in-style.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-unused-define-vars-in-style",
  rule as any,
  loadTestCases("no-unused-define-vars-in-style"),
)
