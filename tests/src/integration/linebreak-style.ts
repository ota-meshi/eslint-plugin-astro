import { RuleTester, testRuleIdPrefix } from "../../utils/eslint-compat"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"

describe("Integration test for linebreak-style", () => {
  const ruleNoUnusedVars = getCoreRule("linebreak-style")!
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
  tester.run("linebreak-style", ruleNoUnusedVars, {
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
      },
    ],
    invalid: [
      {
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
        code: `{/*eslint ${testRuleIdPrefix}linebreak-style:0*/}
        <script define:vars={{ bar: 42 }}>
          console.log(foo)\r
        </script>
        `,
        output: `{/*eslint ${testRuleIdPrefix}linebreak-style:0*/}
        <script define:vars={{ bar: 42 }}>
          console.log(foo)
        </script>
        `,
        errors: 1,
      },
      {
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
        code: `{/*eslint ${testRuleIdPrefix}linebreak-style:0*/}
<script define:vars={{ bar: 42 }}>\r
\r
\r
  // empty lines\r
  console.log(foo)\r
</script>
        `,
        output: `{/*eslint ${testRuleIdPrefix}linebreak-style:0*/}
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
