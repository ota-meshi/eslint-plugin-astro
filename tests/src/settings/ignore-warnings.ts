import assert from "assert"
import eslint from "eslint"
import plugin from "../../../src/index"

describe("ignore-warnings", () => {
  it("disable rules if ignoreWarnings: [ruleName]", async () => {
    const code = `
      {@html a+b}
      {@debug a}
      <script>
        a+b;
      </script>
      `

    const linter = new eslint.ESLint({
      plugins: {
        astro: plugin,
      },
      baseConfig: {
        parser: require.resolve("astro-eslint-parser"),
        parserOptions: {
          ecmaVersion: 2020,
        },
        plugins: ["astro"],
        rules: {
          "no-undef": "error",
          "space-infix-ops": "error",
          "astro/no-at-html-tags": "error",
          "astro/no-at-debug-tags": "error",
          "astro/system": "error",
        },
        settings: {
          astro: {
            ignoreWarnings: [
              "no-undef",
              "space-infix-ops",
              "astro/no-at-debug-tags",
            ],
          },
        },
      },
      useEslintrc: false,
    })
    const result = await linter.lintText(code, { filePath: "test.astro" })
    const messages = result[0].messages

    assert.deepStrictEqual(
      messages.map((m) => ({ ruleId: m.ruleId, line: m.line })),
      [
        {
          ruleId: "astro/no-at-html-tags",
          line: 2,
        },
        {
          ruleId: "no-undef",
          line: 5,
        },
        {
          ruleId: "space-infix-ops",
          line: 5,
        },
        {
          ruleId: "no-undef",
          line: 5,
        },
      ],
    )
  })
  it("disable rules if ignoreWarnings: [regexp]", async () => {
    const code = `
      {@html a+b}
      {@debug a}
      <script>
        a+b;
      </script>
      `

    const linter = new eslint.ESLint({
      plugins: {
        astro: plugin,
      },
      baseConfig: {
        parser: require.resolve("astro-eslint-parser"),
        parserOptions: {
          ecmaVersion: 2020,
        },
        plugins: ["astro"],
        rules: {
          "no-undef": "error",
          "space-infix-ops": "error",
          "astro/no-at-html-tags": "error",
          "astro/no-at-debug-tags": "error",
          "astro/system": "error",
        },
        settings: {
          astro: {
            ignoreWarnings: ["no-undef", "/debug/", "/^space/"],
          },
        },
      },
      useEslintrc: false,
    })
    const result = await linter.lintText(code, { filePath: "test.astro" })
    const messages = result[0].messages

    assert.deepStrictEqual(
      messages.map((m) => ({ ruleId: m.ruleId, line: m.line })),
      [
        {
          line: 2,
          ruleId: "astro/no-at-html-tags",
        },
        {
          ruleId: "no-undef",
          line: 5,
        },
        {
          ruleId: "space-infix-ops",
          line: 5,
        },
        {
          ruleId: "no-undef",
          line: 5,
        },
      ],
    )
  })

  it("without settings", async () => {
    const code = `
      {@html a+b}
      {@debug a}
      <script>
        a+b;
      </script>
      `

    const linter = new eslint.ESLint({
      plugins: {
        astro: plugin,
      },
      baseConfig: {
        parser: require.resolve("astro-eslint-parser"),
        parserOptions: {
          ecmaVersion: 2020,
        },
        plugins: ["astro"],
        rules: {
          "astro/system": "error",
        },
      },
      useEslintrc: false,
    })
    const result = await linter.lintText(code, { filePath: "test.astro" })
    const messages = result[0].messages

    assert.deepStrictEqual(
      messages.map((m) => ({ ruleId: m.ruleId, line: m.line })),
      [],
    )
  })
})
