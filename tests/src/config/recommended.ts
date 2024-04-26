import assert from "assert"
import plugin from "../../../src/index.cts"
import { LegacyESLint, FlatESLint } from "../../utils/eslint-compat"

const code = `---
const foo = 42
---
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--foreground);
  }
</style>
`
describe("`recommended` config", () => {
  it("legacy `recommended` config should work. ", async () => {
    const linter = new LegacyESLint({
      plugins: {
        astro: plugin as never,
      },
      baseConfig: {
        parserOptions: {
          ecmaVersion: 2020,
        },
        extends: ["plugin:astro/recommended"],
      },
      useEslintrc: false,
    })
    const result = await linter.lintText(code, { filePath: "test.astro" })
    const messages = result[0].messages

    assert.deepStrictEqual(
      messages.map((m) => ({
        ruleId: m.ruleId,
        line: m.line,
        message: m.message,
      })),
      [
        {
          line: 4,
          message: "'foregroundColor' is defined but never used.",
          ruleId: "astro/no-unused-define-vars-in-style",
        },
      ],
    )
  })
  it("`flat/recommended` config should work. ", async () => {
    const linter = new FlatESLint({
      // @ts-expect-error -- typing bug
      overrideConfigFile: true,
      // @ts-expect-error -- typing bug
      overrideConfig: [...plugin.configs["flat/recommended"]],
    })
    const result = await linter.lintText(code, { filePath: "test.astro" })
    const messages = result[0].messages

    assert.deepStrictEqual(
      messages.map((m) => ({
        ruleId: m.ruleId,
        line: m.line,
        message: m.message,
      })),
      [
        {
          line: 4,
          message: "'foregroundColor' is defined but never used.",
          ruleId: "astro/no-unused-define-vars-in-style",
        },
      ],
    )
  })
  it("`flat/recommended` config with *.js should work. ", async () => {
    const linter = new FlatESLint({
      // @ts-expect-error -- typing bug
      overrideConfigFile: true,
      // @ts-expect-error -- typing bug
      overrideConfig: [...plugin.configs["flat/recommended"]],
    })

    const result = await linter.lintText(";", { filePath: "test.js" })
    const messages = result[0].messages

    assert.deepStrictEqual(
      messages.map((m) => ({
        ruleId: m.ruleId,
        line: m.line,
        message: m.message,
      })),
      [],
    )
  })
})
