import path from "path"
// @ts-expect-error -- ignore
import { rules, configs } from "eslint-plugin-jsx-a11y"
import { formatAndSave } from "./lib/utils"

const content = `import { getPluginJsxA11y } from "./load"

const plugin = getPluginJsxA11y()
export const a11yRuleKeys = plugin?.rules
  ? Object.keys(plugin.rules).filter(
      (s) => !plugin?.rules?.[s]?.meta?.deprecated,
    )
  : ([
    ${Object.keys(rules)
      .filter((s) => !rules[s].meta.deprecated)
      .map((s) => JSON.stringify(s))
      .join(",")}
] as const)
export const a11yConfigKeys = plugin?.configs
  ? Object.keys(plugin.configs)
  : ([
    ${Object.keys(configs)
      .map((s) => JSON.stringify(s))
      .join(",")}
] as const)
`

const filePath = path.resolve(__dirname, "../src/a11y/keys.ts")

// Update file.
void formatAndSave(filePath, content)
