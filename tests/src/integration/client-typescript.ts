import astroPlugin from "../../../src/index.mts"
import assert from "node:assert"
import { tsESLintParser } from "../../../src/configs/has-typescript-eslint-parser.ts"
import { ESLint } from "eslint"

describe("Integration test for client-side ts", () => {
  it("should work with client-side-ts processor", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        ...astroPlugin.configs.base,
        {
          files: ["*.ts", "**/*.ts"],
          languageOptions: {
            parser: tsESLintParser,
          },
          rules: {
            "no-restricted-syntax": ["error", "TSTypeAnnotation"],
          } as Record<string, any>,
          // Auto detect the processor
          // processor: "astro/client-side-ts",
        },
      ],
    })

    const result = await eslint.lintText(
      `
      <script>
      const map: Map<string, string> = new Map<string, string>()
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
          message: "Using 'TSTypeAnnotation' is not allowed.",
          ruleId: "no-restricted-syntax",
        },
      ],
    )
  })
})
