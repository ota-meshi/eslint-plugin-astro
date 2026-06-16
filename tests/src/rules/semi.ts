import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/semi.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("semi", rule as any, loadTestCases("semi"))
