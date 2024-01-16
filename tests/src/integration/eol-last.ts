import { RuleTester } from "../../utils/eslint-compat"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"

describe("Integration test for eol-last", () => {
  const eolLast = getCoreRule("eol-last")!
  const tester = new RuleTester({
    languageOptions: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
      parser: require("./auto-parser"),
      ecmaVersion: 2020,
      sourceType: "module",
    },
  })
  tester.run("eol-last", eolLast, {
    valid: [
      {
        filename: "foo.astro",
        processor: astroProcessor,
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
        </script>\n`,
      } as any,

      {
        filename: "foo.astro",
        processor: astroProcessor,
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
        </script>`,
        options: ["never"],
      },
      {
        filename: "foo.astro",
        processor: astroProcessor,
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)</script>`,
        options: ["never"],
      },
    ],
    invalid: [
      {
        filename: "foo.astro",
        // @ts-expect-error -- missing V9 type
        processor: astroProcessor,
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
