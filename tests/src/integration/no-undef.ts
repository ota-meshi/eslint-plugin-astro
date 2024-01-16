import { RuleTester } from "../../utils/eslint-compat"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"

describe("Integration test for no-undef", () => {
  const ruleNoUnusedVars = getCoreRule("no-undef")!
  const tester = new RuleTester({
    languageOptions: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
      parser: require("./auto-parser"),
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        console: false,
      },
    },
  })
  tester.run("no-undef", ruleNoUnusedVars, {
    valid: [
      {
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
        code: `
        <script define:vars={{ foo: 42, bar: 42 }}>
          console.log(foo)
        </script>
        `,
      },
    ],
    invalid: [
      {
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
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
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
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
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
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
