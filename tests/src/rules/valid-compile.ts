import rule from "../../../src/rules/valid-compile"
import { RuleTester } from "../../utils/eslint-compat"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("valid-compile", rule as any, loadTestCases("valid-compile"))
