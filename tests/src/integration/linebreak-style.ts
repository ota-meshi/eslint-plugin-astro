import { RuleTester } from "../../utils/eslint-compat"
import { Linter } from "eslint"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"
import semver from "semver"

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
        code: `{/*eslint ${
          semver.gte(Linter.version, "9.0.0-0") ? "rule-to-test/" : ""
        }linebreak-style:0*/}
        <script define:vars={{ bar: 42 }}>
          console.log(foo)\r
        </script>
        `,
        output: `{/*eslint ${
          semver.gte(Linter.version, "9.0.0-0") ? "rule-to-test/" : ""
        }linebreak-style:0*/}
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
        code: `{/*eslint ${
          semver.gte(Linter.version, "9.0.0-0") ? "rule-to-test/" : ""
        }linebreak-style:0*/}
<script define:vars={{ bar: 42 }}>\r
\r
\r
  // empty lines\r
  console.log(foo)\r
</script>
        `,
        output: `{/*eslint ${
          semver.gte(Linter.version, "9.0.0-0") ? "rule-to-test/" : ""
        }linebreak-style:0*/}
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
