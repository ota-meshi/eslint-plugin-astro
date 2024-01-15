import { ESLint, Linter } from "eslint"
import astroPlugin from "../../../src/index"
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
  if (semver.lt(Linter.version, "9.0.0-0"))
    it("should work with parse error", async () => {
      const eslint = new ESLint({
        plugins: {
          astro: astroPlugin as any,
        },
        useEslintrc: false,
        overrideConfig: {
          extends: ["plugin:astro/base"],
        },
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
