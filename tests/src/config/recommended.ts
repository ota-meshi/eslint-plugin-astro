import assert from "node:assert"
import plugin from "../../../src/index.mts"
import { ESLint } from "eslint"

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
  it("`recommended` config should work. ", async () => {
    const linter = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [...plugin.configs.recommended],
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
  it("`recommended` config with *.js should work. ", async () => {
    const linter = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [...plugin.configs.recommended],
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
