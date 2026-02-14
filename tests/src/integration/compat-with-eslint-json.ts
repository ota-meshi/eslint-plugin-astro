import json from "@eslint/json"
import { Linter } from "eslint"
import { rules } from "../../../src/rules/index.ts"
import assert from "assert"

describe("compat with @eslint/json", () => {
  describe("should not throw error from astro rules when used with @eslint/json", () => {
    for (const rule of rules) {
      it(rule.meta.docs.ruleName, () => {
        const code = `{
          "key": "value"
        }`
        const linter = new Linter()

        const messages = linter.verify(
          code,
          [
            {
              files: ["**/*.json", "*.json"],
              plugins: {
                json: json as any,
                astro: {
                  rules: {
                    [rule.meta.docs.ruleName]: rule as any,
                  },
                },
              },
              language: "json/json",
              rules: {
                [rule.meta.docs.ruleId]: "error",
              },
            },
          ],
          "test.json",
        )
        assert.deepStrictEqual(messages, [])
      })
    }
  })
})
