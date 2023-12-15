import { RuleTester } from "eslint"
import { astroProcessor } from "../../../src/processor"
import { builtinRules } from "eslint/use-at-your-own-risk"

describe("Integration test for no-undef", () => {
  const ruleNoUnusedVars = builtinRules.get("no-undef")!
  const tester = new RuleTester({
    parser: require.resolve("./auto-parser"),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    globals: {
      console: false,
    },
  })
  tester.run("no-undef", ruleNoUnusedVars, {
    valid: [
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
        <script define:vars={{ bar: 42 }}>
          console.log(foo)
        </script>
        `,
        errors: [
          {
            message: "'foo' is not defined.",
            line: 3,
            column: 23,
          },
        ],
      },
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        },
        code: `
<script define:vars={{ bar: 42 }}>


  // empty lines
  console.log(foo)
</script>
        `,
        errors: [
          {
            message: "'foo' is not defined.",
            line: 6,
            column: 15,
          },
        ],
      },
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        },
        code: `
<script define:vars={{ bar: 42 }}>


  // empty lines
  console.log(foo)
</script>
        `.replace(/\n/gu, "\r\n"),
        errors: [
          {
            message: "'foo' is not defined.",
            line: 6,
            column: 15,
          },
        ],
      },
    ],
  })
})
