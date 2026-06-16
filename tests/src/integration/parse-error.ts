import astroPlugin from "../../../src/index.mts"
import assert from "node:assert"
import { ESLint } from "eslint"

describe("Integration test for parse error", () => {
  it("should work with parse error", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: astroPlugin.configs.base,
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
