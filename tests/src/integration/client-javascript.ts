import { ESLint } from "eslint"
import astroPlugin from "../../../src/index.cts"
import assert from "assert"
import Module from "module"
import semver from "semver"

describe("Integration test for client-side script", () => {
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
  it("should work with astro processor", async () => {
    const eslint = semver.lt(ESLint.version, "9.0.0-0")
      ? new ESLint({
          plugins: {
            astro: astroPlugin as any,
          },
          useEslintrc: false,
          overrideConfig: {
            // @ts-expect-error -- typing bug
            extends: ["plugin:astro/base"],
            rules: {
              "no-restricted-syntax": ["error", "Identifier[name='id']"],
            } as Record<string, any>,
          },
        })
      : new ESLint({
          overrideConfigFile: true as any,
          overrideConfig: [
            ...astroPlugin.configs["flat/base"],
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
