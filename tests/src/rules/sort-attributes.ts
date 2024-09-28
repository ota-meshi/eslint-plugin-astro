import { RuleTester } from "eslint"
import rule from "../../../src/rules/sort-attributes"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  globals: {
    Astro: false,
  },
})

tester.run("sort-attributes", rule as any, loadTestCases("sort-attributes"))
