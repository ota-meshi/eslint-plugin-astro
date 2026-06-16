import path from "node:path"
import { fileURLToPath } from "node:url"
// @ts-expect-error -- ignore
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"
import { formatAndSave } from "./lib/utils.ts"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const { rules, configs } = jsxA11yPlugin
const ruleKeys = Object.keys(rules)
  .filter((s) => !rules[s].meta.deprecated)
  .map((s) => `      ${JSON.stringify(s)},`)
  .join("\n")
const configKeys = Object.keys(configs)
  .map((s) => `      ${JSON.stringify(s)},`)
  .join("\n")

const content = `// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import { getPluginJsxA11y } from "./load.ts"

const plugin = getPluginJsxA11y()
export const a11yRuleKeys: string[] = plugin?.rules
  ? Object.keys(plugin.rules).filter(
      (s) => !plugin?.rules?.[s]?.meta?.deprecated,
    )
  : ([
${ruleKeys}
    ] as const)
export const a11yConfigKeys: string[] = plugin?.configs
  ? Object.keys(plugin.configs)
  : ([
${configKeys}
    ] as const)
`

const filePath = path.resolve(dirname, "../src/a11y/keys.ts")

// Update file.
void formatAndSave(filePath, content)
