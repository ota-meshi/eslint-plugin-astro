import { RuleTester } from "../../utils/eslint-compat"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"

describe("Integration test for no-unused-vars", () => {
  const ruleNoUnusedVars = getCoreRule("no-unused-vars")!
  const tester = new RuleTester({
    languageOptions: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
      parser: require("./auto-parser"),
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })
  tester.run("no-unused-vars", ruleNoUnusedVars, {
    valid: [
      {
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
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
        // @ts-expect-error -- missing V9 type
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
