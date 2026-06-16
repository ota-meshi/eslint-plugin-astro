import rule from "../../../src/rules/no-deprecated-astro-resolve.ts"
import { loadTestCases } from "../../utils/utils.ts"
import { RuleTester } from "eslint"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      Astro: false,
    },
  },
})

tester.run(
  "no-deprecated-astro-resolve",
  rule as any,
  loadTestCases("no-deprecated-astro-resolve"),
)
