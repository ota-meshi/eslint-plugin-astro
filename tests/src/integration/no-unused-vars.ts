import { RuleTester } from "eslint"
import { astroProcessor } from "../../../src/processor"
import { builtinRules } from "eslint/use-at-your-own-risk"

describe("Integration test for no-unused-vars", () => {
  const ruleNoUnusedVars = builtinRules.get("no-unused-vars")!
  const tester = new RuleTester({
    parser: require.resolve("./auto-parser"),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })
  tester.run("no-unused-vars", ruleNoUnusedVars, {
    valid: [
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        },
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
        </script>
        `,
      },
    ],
    invalid: [
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        },
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
