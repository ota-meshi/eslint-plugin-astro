import astroPlugin from "../../../src/index.mts"
import assert from "node:assert"
import { ESLint } from "eslint"

describe("Integration test for a11y config", () => {
  it("should work with a11y config strict", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: astroPlugin.configs["jsx-a11y-strict"],
    })

    const result = await eslint.lintText(
      `---
const src = 'icon.png'
---
<img {src} />
`,
      { filePath: "path/to/test.astro" },
    )

    assert.deepStrictEqual(
      result
        .flatMap((r) => r.messages)
        .map((m) => {
          return {
            ruleId: m.ruleId,
            message: m.message,
            line: m.line,
            column: m.column,
          }
        }),
      [
        {
          ruleId: "astro/jsx-a11y/alt-text",
          message:
            "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.",
          line: 4,
          column: 1,
        },
      ],
    )
  })
  it("should work with a11y config recommended", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: astroPlugin.configs["jsx-a11y-recommended"],
    })

    const result = await eslint.lintText(
      `---
const src = 'icon.png'
---
<img {src} />
`,
      { filePath: "path/to/test.astro" },
    )

    assert.deepStrictEqual(
      result
        .flatMap((r) => r.messages)
        .map((m) => {
          return {
            ruleId: m.ruleId,
            message: m.message,
            line: m.line,
            column: m.column,
          }
        }),
      [
        {
          ruleId: "astro/jsx-a11y/alt-text",
          message:
            "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.",
          line: 4,
          column: 1,
        },
      ],
    )
  })
})
