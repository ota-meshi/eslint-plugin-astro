import { getPluginJsxA11y } from "./load"
import path from "path"
import { a11yConfigKeys } from "./keys"
import flatBase from "../configs/flat/base"

/** Build a11y configs */
export function buildConfigs(): Record<string, unknown> {
  const basePath = require.resolve("../configs/base")
  const baseExtend =
    path.extname(`${basePath}`) === ".ts" ? "plugin:astro/base" : basePath

  const configs: Record<string, unknown> = {}

  for (const configName of a11yConfigKeys) {
    // flat config
    Object.defineProperty(configs, `flat/jsx-a11y-${configName}`, {
      enumerable: true,
      get() {
        const base = getPluginJsxA11y()
        const baseConfig = base?.configs?.[configName] ?? {}

        const baseRules = baseConfig.rules ?? {}
        const newRules: Record<string, string | unknown[]> = {}
        for (const ruleName of Object.keys(baseRules)) {
          newRules[`astro/${ruleName}`] = baseRules[ruleName]
        }

        return [
          ...flatBase,
          {
            plugins: { "jsx-a11y": base },
            rules: newRules,
          },
        ]
      },
    })
    // legacy config
    Object.defineProperty(configs, `jsx-a11y-${configName}`, {
      enumerable: true,
      get() {
        const base = getPluginJsxA11y()
        const baseConfig = base?.configs?.[configName] ?? {}

        const baseRules = baseConfig.rules ?? {}
        const newRules: Record<string, string | unknown[]> = {}
        for (const ruleName of Object.keys(baseRules)) {
          newRules[`astro/${ruleName}`] = baseRules[ruleName]
        }

        return {
          ...baseConfig,
          plugins: ["jsx-a11y"],
          extends: [baseExtend],
          rules: newRules,
        }
      },
    })
  }
  return configs
}
