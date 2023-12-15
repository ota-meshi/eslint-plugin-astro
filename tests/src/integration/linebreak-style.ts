import { RuleTester } from "eslint"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"

describe("Integration test for linebreak-style", () => {
  const ruleNoUnusedVars = getCoreRule("linebreak-style")!
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
  tester.run("linebreak-style", ruleNoUnusedVars, {
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
      },
    ],
    invalid: [
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        },
        code: `{/*eslint linebreak-style:0*/}
        <script define:vars={{ bar: 42 }}>
          console.log(foo)\r
        </script>
        `,
        output: `{/*eslint linebreak-style:0*/}
        <script define:vars={{ bar: 42 }}>
          console.log(foo)
        </script>
        `,
        errors: 1,
      },
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        },
        code: `{/*eslint linebreak-style:0*/}
<script define:vars={{ bar: 42 }}>\r
\r
\r
  // empty lines\r
  console.log(foo)\r
</script>
        `,
        output: `{/*eslint linebreak-style:0*/}
<script define:vars={{ bar: 42 }}>\r

\r
  // empty lines
  console.log(foo)
</script>
        `,
        errors: 4,
      },
    ],
  })
})
