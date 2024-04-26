import { ESLint } from "eslint"
import astroPlugin from "../../../src/index.cts"
import assert from "assert"
import Module from "module"
import semver from "semver"

describe("Integration test for parse error", () => {
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
  it("should work with parse error", async () => {
    const eslint = semver.lt(ESLint.version, "9.0.0-0")
      ? new ESLint({
          plugins: {
            astro: astroPlugin as any,
          },
          useEslintrc: false,
          overrideConfig: {
            extends: ["plugin:astro/base"],
          },
        })
      : new ESLint({
          overrideConfigFile: true as any,
          // @ts-expect-error -- typing bug
          overrideConfig: astroPlugin.configs["flat/base"],
        })

    const result = await eslint.lintText(
      `---
const foo = true
---

<style is:inline set:html={"" >
`,
      { filePath: "path/to/test.astro" },
    )

    assert.deepStrictEqual(
      result
        .flatMap((r) => r.messages)
        .map((m) => {
          return {
            ruleId: m.ruleId,
          }
        }),
      [
        {
          ruleId: null,
        },
      ],
    )
  })
})
