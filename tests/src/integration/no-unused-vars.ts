import { RuleTester, Linter } from "eslint"
import { processor } from "../../../src/processor"

describe("Integration test for no-unused-vars", () => {
  const ruleNoUnusedVars = new Linter().getRules().get("no-unused-vars")!
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
          ...processor,
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
          ...processor,
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
