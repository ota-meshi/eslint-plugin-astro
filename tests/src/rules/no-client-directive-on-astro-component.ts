import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/no-client-directive-on-astro-component.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-client-directive-on-astro-component",
  rule as any,
  loadTestCases("no-client-directive-on-astro-component"),
)
