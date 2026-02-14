import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/sort-attributes.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    globals: {
      Astro: false,
    },
  },
})

tester.run("sort-attributes", rule as any, loadTestCases("sort-attributes"))
