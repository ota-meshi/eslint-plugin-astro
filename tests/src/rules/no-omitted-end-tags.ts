import assert from "node:assert"
import { ESLint, RuleTester } from "eslint"
import * as astroESLintParser from "astro-eslint-parser"
import rule from "../../../src/rules/no-omitted-end-tags.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("no-omitted-end-tags", rule as any, {
  valid: [
    {
      filename: "test.astro",
      code: "<p>hello</p>",
      languageOptions: {
        parser: astroESLintParser,
      },
    },
  ],
  invalid: [],
})

describe("no-omitted-end-tags deprecation metadata", () => {
  it("should expose deprecated info to ESLint.", async () => {
    const linter = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          plugins: {
            astro: {
              rules: {
                "no-omitted-end-tags": rule,
              },
            },
          },
          rules: {
            "astro/no-omitted-end-tags": "error",
          },
        },
      ],
    } as any)

    const [result] = await linter.lintText("const foo = 1")

    assert.deepStrictEqual(result.usedDeprecatedRules, [
      {
        ruleId: "astro/no-omitted-end-tags",
        replacedBy: [],
        info: rule.meta.deprecated,
      },
    ])
  })
})
