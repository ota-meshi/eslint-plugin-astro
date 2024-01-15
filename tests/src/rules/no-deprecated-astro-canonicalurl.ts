import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/no-deprecated-astro-canonicalurl"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    globals: {
      Astro: false,
    },
  },
})

tester.run(
  "no-deprecated-astro-canonicalurl",
  rule as any,
  loadTestCases("no-deprecated-astro-canonicalurl"),
)
