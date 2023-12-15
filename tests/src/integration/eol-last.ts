import { RuleTester } from "eslint"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"

describe("Integration test for eol-last", () => {
  const eolLast = getCoreRule("eol-last")!
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
          ...astroProcessor,
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
          ...astroProcessor,
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
          ...astroProcessor,
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
          ...astroProcessor,
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
