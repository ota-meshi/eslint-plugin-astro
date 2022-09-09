import { RuleTester } from "eslint"
import rule from "../../../src/rules/semi"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("semi", rule as any, loadTestCases("semi"))
