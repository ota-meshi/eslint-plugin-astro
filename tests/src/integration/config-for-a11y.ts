import { ESLint } from "eslint"
// @ts-expect-error -- ignore
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import astroPlugin from "../../../src/index"
import assert from "assert"
import Module from "module"
import semver from "semver"

describe("Integration test for a11y config", () => {
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
  it("should work with a11y config strict", async () => {
    const eslint = semver.lt(ESLint.version, "9.0.0-0")
      ? new ESLint({
          plugins: {
            "jsx-a11y": jsxA11yPlugin,
            astro: astroPlugin as any,
          },
          useEslintrc: false,
          overrideConfig: {
            extends: ["plugin:astro/jsx-a11y-strict"],
          },
        })
      : new ESLint({
          overrideConfigFile: true as any,
          // @ts-expect-error -- typing bug
          overrideConfig: astroPlugin.configs["flat/jsx-a11y-strict"],
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
    const eslint = semver.lt(ESLint.version, "9.0.0-0")
      ? new ESLint({
          plugins: {
            "jsx-a11y": jsxA11yPlugin,
            astro: astroPlugin as any,
          },
          useEslintrc: false,
          overrideConfig: {
            extends: ["plugin:astro/jsx-a11y-recommended"],
          },
        })
      : new ESLint({
          overrideConfigFile: true as any,
          // @ts-expect-error -- typing bug
          overrideConfig: astroPlugin.configs["flat/jsx-a11y-recommended"],
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
