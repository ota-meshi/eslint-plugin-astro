import { RuleTester, Linter } from "eslint"

describe("Integration test for no-unused-vars", () => {
  const ruleNoUnusedVars = new Linter().getRules().get("no-unused-vars")!
  const tester = new RuleTester({
    parser: require.resolve("astro-eslint-parser"),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })
  tester.run("no-unused-vars", ruleNoUnusedVars, {
    valid: [
      `
      <script>
        import { a } from "./stores"
        $a = 42
      </script>
      `,
      `
      <script>
        import { a as b } from "./stores"
        $b = 42
      </script>
      `,
      `
      <script>
        import a from "./stores"
        $a = 42
      </script>
      `,
      `
      <script>
        import * as a from "./stores"
        $a = 42
      </script>
      `,
    ],
    invalid: [
      {
        code: `
          <script>
            import { a } from "./stores"
            $b = 42
          </script>
          `,
        errors: 1,
      },
      {
        code: `
          <script>
            import { a as b } from "./stores"
            $a = 42
          </script>
          `,
        errors: 1,
      },
      {
        code: `
          <script>
            import a from "./stores"
            $b = 42
          </script>
          `,
        errors: 1,
      },
      {
        code: `
          <script>
            import * as a from "./stores"
            $b = 42
          </script>
          `,
        errors: 1,
      },
    ],
  })
})
