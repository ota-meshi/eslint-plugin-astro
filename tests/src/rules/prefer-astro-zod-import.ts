import { RuleTester } from "../../utils/eslint-compat.ts"
import rule from "../../../src/rules/prefer-astro-zod-import.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
})

tester.run(
  "prefer-astro-zod-import",
  rule as never,
  loadTestCases("prefer-astro-zod-import"),
)
