import rule from "../../../src/rules/no-deprecated-astro-fetchcontent.ts"
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
  "no-deprecated-astro-fetchcontent",
  rule as any,
  loadTestCases("no-deprecated-astro-fetchcontent"),
)
