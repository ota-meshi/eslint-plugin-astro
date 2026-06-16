import rule from "../../../src/rules/valid-compile.ts"
import { RuleTester } from "../../utils/eslint-compat.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("valid-compile", rule as any, loadTestCases("valid-compile"))
