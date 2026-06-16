import { RuleTester } from "eslint"
import { astroProcessor } from "../../../src/processor/index.ts"
import { getCoreRule } from "./get-core-rule.ts"
import * as autoParser from "./auto-parser.ts"

describe("Integration test for no-unused-vars", () => {
  const ruleNoUnusedVars = getCoreRule("no-unused-vars")!
  const tester = new RuleTester({
    languageOptions: {
      parser: autoParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })
  tester.run("no-unused-vars", ruleNoUnusedVars, {
    valid: [
      {
        filename: "foo.astro",
        processor: astroProcessor,
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
        </script>
        `,
      },
    ],
    invalid: [
      {
        filename: "foo.astro",
        processor: astroProcessor,
        code: `
        <script define:vars={{ foo: 42, bar: 42 }}>
          console.log(foo)
        </script>
        `,
        errors: [
          {
            message: "'bar' is defined but never used.",
            line: 2,
            column: 41,
          },
        ],
      },
    ],
  })
})
