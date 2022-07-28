import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-deprecated-astro-canonicalurl"
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

tester.run(
  "no-deprecated-astro-canonicalurl",
  rule as any,
  loadTestCases("no-deprecated-astro-canonicalurl"),
)
