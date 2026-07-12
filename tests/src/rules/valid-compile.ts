import assert from "node:assert"
import { ESLint, RuleTester } from "eslint"
import rule from "../../../src/rules/valid-compile.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run("valid-compile", rule as any, loadTestCases("valid-compile"))

describe("valid-compile deprecation metadata", () => {
  it("should expose deprecated info to ESLint.", async () => {
    const linter = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          plugins: {
            astro: {
              rules: {
                "valid-compile": rule,
              },
            },
          },
          rules: {
            "astro/valid-compile": "error",
          },
        },
      ],
    } as any)

    const [result] = await linter.lintText("const foo = 1")

    assert.deepStrictEqual(result.usedDeprecatedRules, [
      {
        ruleId: "astro/valid-compile",
        replacedBy: [],
        info: rule.meta.deprecated,
      },
    ])
  })
})
