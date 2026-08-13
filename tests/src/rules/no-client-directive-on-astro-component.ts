import { RuleTester } from "eslint"
import * as astroESLintParser from "astro-eslint-parser"
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
  loadTestCases("no-client-directive-on-astro-component", {
    filter: () => true,
    additionals: {
      valid: [
        {
          filename: "lowercase-import.astro",
          code: `---
import dialog from "./Dialog.astro"
---

<dialog client:load>Native dialog</dialog>
`,
          languageOptions: { parser: astroESLintParser },
        },
      ],
    },
  }),
)
