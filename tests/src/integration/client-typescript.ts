import { ESLint } from "eslint"
import astroPlugin from "../../../src/index.cts"
import assert from "assert"
import Module from "module"
import semver from "semver"
import { tsESLintParser } from "../../../src/configs/has-typescript-eslint-parser"

describe("Integration test for client-side ts", () => {
  // @ts-expect-error -- ignore
  const originalLoad = Module._load
  before(() => {
    // @ts-expect-error -- ignore
    Module._load = function (name, ...args) {
      if (name === "eslint-plugin-astro") {
        return astroPlugin
      }
      return originalLoad(name, ...args)
    }
  })
  after(() => {
    // @ts-expect-error -- ignore
    Module._load = originalLoad
  })
  it("should work with client-side-ts processor", async () => {
    const eslint = semver.lt(ESLint.version, "9.0.0-0")
      ? new ESLint({
          plugins: {
            astro: astroPlugin as any,
          },
          useEslintrc: false,
          overrideConfig: {
            extends: ["plugin:astro/base"],
            parser: "@typescript-eslint/parser",
            rules: {
              "no-restricted-syntax": ["error", "TSTypeAnnotation"],
            } as Record<string, any>,
            overrides: [
              {
                files: ["*.astro"],
                parser: "astro-eslint-parser",
                parserOptions: {
                  parser: "@typescript-eslint/parser",
                  extraFileExtensions: [".astro"],
                },
                processor: "astro/client-side-ts",
              },
            ],
          },
        })
      : new ESLint({
          overrideConfigFile: true as any,
          // @ts-expect-error -- typing bug
          overrideConfig: [
            ...astroPlugin.configs["flat/base"],
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
