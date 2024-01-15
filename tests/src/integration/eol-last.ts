import { ESLint } from "eslint"
import { RuleTester } from "../../utils/eslint-compat"
import { astroProcessor } from "../../../src/processor"
import { getCoreRule } from "./get-core-rule"
import semver from "semver"

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
        filename: {
          filename: "foo.astro",
          ...astroProcessor,
        } as any,
        code: `
        <script define:vars={{ foo: 42 }}>
          console.log(foo)
        </script>\n`,
      } as any,

      ...(semver.lt(ESLint.version, "9.0.0-0")
        ? [
            {
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
          ]
        : []),
      {
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
