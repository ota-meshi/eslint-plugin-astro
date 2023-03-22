import { RuleTester, Linter } from "eslint"
import { processor } from "../../../src/processor"

describe("Integration test for eol-last", () => {
  const eolLast = new Linter().getRules().get("eol-last")!
  const tester = new RuleTester({
    parser: require.resolve("./auto-parser"),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })
  tester.run("eol-last", eolLast, {
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
        </script>\n`,
      },
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...processor,
        },
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
        </script>`,
        options: ["never"],
      },
      {
        // @ts-expect-error -- fine name with processor
        filename: {
          filename: "foo.astro",
          ...processor,
        },
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)</script>`,
        options: ["never"],
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
        <script define:vars={{ foo: 42 }}>
          console.log(foo)</script>\n`,
        output: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
</script>\n`,
        errors: [
          {
            message: "Newline required at end of file but not found.",
            line: 3,
            column: 27,
          },
        ],
      },
    ],
  })
})
