import astroPlugin from "../../../src/index.mts"
import assert from "node:assert"
import { FlatESLint } from "../../utils/eslint-compat.ts"

describe("Integration test for client-side script", () => {
  it("should work with astro processor", async () => {
    const eslint = new FlatESLint({
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
})
