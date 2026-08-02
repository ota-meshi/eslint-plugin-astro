import assert from "node:assert"
import childProcess from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

describe("Integration test for typescript-eslint parser fallback", () => {
  it("should use the parser exported by typescript-eslint", () => {
    const cwd = fs.mkdtempSync(
      path.join(os.tmpdir(), "eslint-plugin-astro-typescript-eslint-"),
    )

    try {
      const typescriptEslintDirectory = path.join(
        cwd,
        "node_modules/typescript-eslint",
      )
      fs.mkdirSync(typescriptEslintDirectory, { recursive: true })
      fs.writeFileSync(
        path.join(typescriptEslintDirectory, "package.json"),
        JSON.stringify({ main: "index.cjs" }),
      )
      fs.writeFileSync(
        path.join(typescriptEslintDirectory, "index.cjs"),
        `module.exports = require(${JSON.stringify(
          fileURLToPath(import.meta.resolve("typescript-eslint")),
        )})\n`,
      )

      const childSource = `
import assert from "node:assert"
import path from "node:path"
import { createRequire } from "node:module"
import { ESLint } from ${JSON.stringify(import.meta.resolve("eslint"))}

assert.strictEqual(process.env.NODE_PATH, undefined)
const requireFromCwd = createRequire(
  path.join(process.cwd(), "__placeholder__.js"),
)
assert.throws(
  () => requireFromCwd.resolve("@typescript-eslint/parser"),
  { code: "MODULE_NOT_FOUND" },
)
assert.doesNotThrow(() => requireFromCwd.resolve("typescript-eslint"))

const { default: astroPlugin } = await import(${JSON.stringify(
        new URL("../../../src/index.mts", import.meta.url).href,
      )})
const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [...astroPlugin.configs.base],
})
const [result] = await eslint.lintText(
  ${JSON.stringify(`---
import type { Foo } from "./types"
const foo: Foo = {} as Foo
---
<div>{foo}</div>
<script>
const clientValue: string = "value"
console.log(clientValue)
</script>
`)},
  { filePath: "src/index.astro" },
)
assert.deepStrictEqual(result.messages, [])
`
      // eslint-disable-next-line no-process-env -- The child must not inherit NODE_PATH.
      const inheritedEnvironment = process.env
      const env = Object.fromEntries(
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
          env,
          input: childSource,
          timeout: 60_000,
        },
      )

      assert.ifError(child.error)
      assert.strictEqual(child.status, 0, child.stderr || child.stdout)
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true })
    }
  })
})
