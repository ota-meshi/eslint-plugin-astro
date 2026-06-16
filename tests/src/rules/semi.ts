import { RuleTester } from "eslint"
import rule from "../../../src/rules/semi.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("semi", rule as any, loadTestCases("semi"))
