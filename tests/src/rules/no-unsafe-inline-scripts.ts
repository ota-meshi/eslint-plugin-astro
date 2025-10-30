import { RuleTester } from "../../utils/eslint-compat"
import { getPlugin } from "../../../src/plugin"
import { loadTestCases, unIndent } from "../../utils/utils"
import * as astroESLintParser from "astro-eslint-parser"
const plugin = getPlugin()

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-unsafe-inline-scripts",
  plugin.rules["no-unsafe-inline-scripts"],
  loadTestCases("no-unsafe-inline-scripts", {
    filter(file) {
      // Exclude define-vars-input.astro from valid tests since allowDefineVars defaults to false
      return (
        file.includes("/valid/") && !file.includes("define-vars-input.astro")
      )
    },
    additionals: {
      valid: [
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/valid/nonce-allowed.astro",
          code: unIndent`
            ---
            ---

            <script nonce="abc123">
              console.log('inline with nonce')
            </script>
          `,
          options: [{ allowNonce: true }],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/valid/module-allowed.astro",
          code: unIndent`
            ---
            ---

            <script type="module">
              console.log('inline module but allowed')
            </script>
          `,
          options: [{ allowModuleScripts: true }],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/valid/define-vars-allowed.astro",
          code: unIndent`
            ---
            const label = "Click"
            ---

            <button id="btn">{label}</button>
            <script define:vars={{ label }}>
              document.getElementById('btn')
                .addEventListener('click', () => console.log('clicked'))
            </script>
          `,
          options: [{ allowDefineVars: true }],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/valid/type-normalization.astro",
          code: unIndent`
            ---
            ---

            <script type="Application/LD+JSON; charset=utf-8">
              { "@context": "http://schema.org" }
            </script>
          `,
          options: [{ allowNonExecutingTypes: ["Application/LD+JSON"] }],
          languageOptions: { parser: astroESLintParser },
        },
      ],
      invalid: [
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/invalid/basic-inline-input.astro",
          code: unIndent`
            ---
            ---

            <button id="btn">Click</button>
            <script>
              document.getElementById('btn')
                .addEventListener('click', () => console.log('clicked'))
            </script>
          `,
          errors: [
            {
              messageId: "unexpected",
            },
          ],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/invalid/module-inline-input.astro",
          code: unIndent`
            ---
            ---

            <script type="module">
              console.log('module inline')
            </script>
          `,
          errors: [
            {
              messageId: "unexpected",
            },
          ],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/invalid/define-vars-default.astro",
          code: unIndent`
            ---
            const label = "Click"
            ---

            <button id="btn">{label}</button>
            <script define:vars={{ label }}>
              document.getElementById('btn')
                .addEventListener('click', () => console.log('clicked'))
            </script>
          `,
          errors: [
            {
              messageId: "unexpected",
            },
          ],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/invalid/define-vars-disallowed.astro",
          code: unIndent`
            ---
            const label = "Click"
            ---

            <button id="btn">{label}</button>
            <script define:vars={{ label }}>
              console.log(label)
            </script>
          `,
          options: [{ allowDefineVars: false }],
          errors: [
            {
              messageId: "unexpected",
            },
          ],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/invalid/json-ld-disallowed.astro",
          code: unIndent`
            ---
            ---

            <script type="application/ld+json">
              {JSON.stringify({"@context":"https://schema.org","@type":"Thing"})}
            </script>
          `,
          options: [{ allowNonExecutingTypes: [] }],
          errors: [
            {
              messageId: "unexpected",
            },
          ],
          languageOptions: { parser: astroESLintParser },
        },
        {
          filename:
            "tests/fixtures/rules/no-unsafe-inline-scripts/invalid/nonce-disallowed.astro",
          code: unIndent`
            ---
            ---

            <script nonce="abc123">
              console.log('inline with nonce')
            </script>
          `,
          // default allowNonce: false
          errors: [
            {
              messageId: "unexpected",
            },
          ],
          languageOptions: { parser: astroESLintParser },
        },
      ],
    },
  }),
)
