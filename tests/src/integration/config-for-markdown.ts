import { ESLint } from "eslint"
import astroPlugin from "../../../src/index"
import assert from "assert"
import Module from "module"

describe("Integration test for markdown config", () => {
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
  it("should work with markdown config", async () => {
    const eslint = new ESLint({
      plugins: {
        astro: astroPlugin as any,
      },
      useEslintrc: false,
      overrideConfig: {
        extends: ["plugin:astro/base-for-markdown", "eslint:recommended"],
      },
    })

    const result = await eslint.lintText(
      `---
title: Foo
setup: |
  const text = "Hello!"
  const foo = 42
---
# {frontmatter.title}

{text} {bar}
`,
      { filePath: "path/to/test.md" },
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
          ruleId: "no-unused-vars",
          message: "'foo' is assigned a value but never used.",
          line: 5,
          column: 9,
        },
        {
          ruleId: "no-undef",
          message: "'bar' is not defined.",
          line: 9,
          column: 9,
        },
      ],
    )
  })
})
