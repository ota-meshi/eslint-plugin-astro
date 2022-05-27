import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-unused-define-vars-in-style"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-unused-define-vars-in-style",
  rule as any,
  loadTestCases("no-unused-define-vars-in-style"),
)
