import path from "node:path"
import fs from "node:fs"
import { fileURLToPath, pathToFileURL } from "node:url"
import type { RuleModule } from "../../src/types.ts"

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Import all rules from `src/rules` and return them as an array.
 * @returns {Promise<RuleModule[]>}
 */
async function readRules(): Promise<RuleModule[]> {
  const rulesPath = path.resolve(dirname, "../../src/rules")
  return Promise.all(
    fs
      .readdirSync(rulesPath)
      .filter((n) => n.endsWith(".ts") && n !== "index.ts")
      .map(async (fileName) => {
        const mod = await import(
          pathToFileURL(path.join(rulesPath, fileName)).href
        )
        return mod.default as RuleModule
      }),
  )
}

/**
 * This array is designed primarily for generator scripts in the "tools/" folder.
 * It does not include extended rules (such as `a11y` rules).
 * For a complete set of rules, consider using the generated file `rules/index.ts` instead.
 */
export const rules: RuleModule[] = await readRules()
