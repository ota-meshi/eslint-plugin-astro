import astroPlugin from "../../../src/index.mts"
import assert from "node:assert"
import { ESLint } from "eslint"

describe("Integration test for client-side script", () => {
  it("should work with astro processor", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        ...astroPlugin.configs.base,
        {
          rules: {
            "no-restricted-syntax": ["error", "Identifier[name='id']"],
          } as Record<string, any>,
        },
      ],
    })

    const result = await eslint.lintText(
      `
      <script>
      let id
      </script>
      `,
      { filePath: "path/to/test.astro" },
    )

    assert.deepStrictEqual(
      result
        .flatMap((r) => r.messages)
        .map((m) => ({ ruleId: m.ruleId, message: m.message })),
      [
        {
          message: "Using 'Identifier[name='id']' is not allowed.",
          ruleId: "no-restricted-syntax",
        },
      ],
    )
  })

  it("should work with self-closing script", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [...astroPlugin.configs.base],
    })

    const result = await eslint.lintText(
      `
      <script src="something.js" />
      `,
      { filePath: "path/to/test.astro" },
    )

    assert.deepStrictEqual(
      result
        .flatMap((r) => r.messages)
        .map((m) => ({ ruleId: m.ruleId, message: m.message })),
      [],
    )
  })
})
