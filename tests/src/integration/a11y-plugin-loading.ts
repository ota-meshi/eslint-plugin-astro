import assert from "node:assert"
import childProcess from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

type PluginName = "eslint-plugin-jsx-a11y" | "eslint-plugin-jsx-a11y-x"

function runScenario(
  availablePlugins: PluginName[],
  expectedPlugin: PluginName,
): void {
  const cwd = fs.mkdtempSync(
    path.join(os.tmpdir(), "eslint-plugin-astro-a11y-"),
  )

  try {
    const nodeModulesDirectory = path.join(cwd, "node_modules")
    fs.mkdirSync(nodeModulesDirectory, { recursive: true })

    for (const pluginName of availablePlugins) {
      const packageJsonPath = fileURLToPath(
        import.meta.resolve(`${pluginName}/package.json`),
      )
      const packageDirectory = path.dirname(packageJsonPath)

      fs.symlinkSync(
        packageDirectory,
        path.join(nodeModulesDirectory, pluginName),
        "dir",
      )
    }

    const childSource = `
import assert from "node:assert"
import path from "node:path"
import { createRequire } from "node:module"
import { ESLint } from ${JSON.stringify(import.meta.resolve("eslint"))}

assert.strictEqual(process.env.NODE_PATH, undefined)
const requireFromCwd = createRequire(
  path.join(process.cwd(), "__placeholder__.js"),
)

${(["eslint-plugin-jsx-a11y", "eslint-plugin-jsx-a11y-x"] as PluginName[])
  .map((pluginName) => {
    const isAvailable = availablePlugins.includes(pluginName)

    return isAvailable
      ? `assert.doesNotThrow(() => requireFromCwd.resolve(${JSON.stringify(pluginName)}))`
      : `assert.throws(
  () => requireFromCwd.resolve(${JSON.stringify(pluginName)}),
  { code: "MODULE_NOT_FOUND" },
)`
  })
  .join("\n")}

const { default: astroPlugin } = await import(${JSON.stringify(
      new URL("../../../src/index.mts", import.meta.url).href,
    )})
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    ...astroPlugin.configs.base,
    {
      rules: {
        "astro/jsx-a11y/alt-text": "error",
      },
    },
  ],
})
const [result] = await eslint.lintText(
  ${JSON.stringify(`---
---
<img />
`)},
  { filePath: "src/index.astro" },
)

const rule = astroPlugin.rules["jsx-a11y/alt-text"]
assert.ok(rule)
const { default: expectedPluginModule } = await import(
  ${JSON.stringify(expectedPlugin)}
)
assert.strictEqual(
  rule.meta.docs.extensionRule.plugin,
  ${JSON.stringify(expectedPlugin)},
)
assert.strictEqual(
  rule.meta.docs.extensionRule.url,
  expectedPluginModule.rules["alt-text"].meta.docs.url,
)
assert.deepStrictEqual(
  result.messages.map(({ ruleId, message }) => ({
    ruleId,
    message,
  })),
  [
    {
      ruleId: "astro/jsx-a11y/alt-text",
      message:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.",
    },
  ],
)
`

    // eslint-disable-next-line no-process-env -- The child must not inherit NODE_PATH.
    const inheritedEnvironment = process.env
    const environment = Object.fromEntries(
      Object.entries(inheritedEnvironment).filter(
        ([key]) => key.toUpperCase() !== "NODE_PATH",
      ),
    )

    const child = childProcess.spawnSync(
      process.execPath,
      [
        "--no-global-search-paths",
        "--import",
        import.meta.resolve("@oxc-node/core/register"),
        "--input-type=module",
      ],
      {
        cwd,
        encoding: "utf8",
        env: environment,
        input: childSource,
        timeout: 60_000,
      },
    )

    assert.ifError(child.error)
    assert.strictEqual(child.status, 0, child.stderr || child.stdout)
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true })
  }
}

describe("Integration test for a11y plugin loading", () => {
  it("loads eslint-plugin-jsx-a11y", () => {
    runScenario(["eslint-plugin-jsx-a11y"], "eslint-plugin-jsx-a11y")
  })

  it("falls back to eslint-plugin-jsx-a11y-x", () => {
    runScenario(["eslint-plugin-jsx-a11y-x"], "eslint-plugin-jsx-a11y-x")
  })

  it("prefers eslint-plugin-jsx-a11y when both plugins are installed", () => {
    runScenario(
      ["eslint-plugin-jsx-a11y", "eslint-plugin-jsx-a11y-x"],
      "eslint-plugin-jsx-a11y",
    )
  })
})
