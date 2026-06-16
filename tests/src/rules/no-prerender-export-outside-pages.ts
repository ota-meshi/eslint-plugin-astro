import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/no-prerender-export-outside-pages.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-prerender-export-outside-pages",
  rule as any,
  loadTestCases("no-prerender-export-outside-pages"),
)
