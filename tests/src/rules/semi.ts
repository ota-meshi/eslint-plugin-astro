import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/semi"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("semi", rule as any, loadTestCases("semi"))
