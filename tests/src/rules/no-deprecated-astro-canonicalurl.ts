import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/no-deprecated-astro-canonicalurl.ts"
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

tester.run(
  "no-deprecated-astro-canonicalurl",
  rule as any,
  loadTestCases("no-deprecated-astro-canonicalurl"),
)
