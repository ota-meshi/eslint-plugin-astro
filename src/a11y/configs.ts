import { getPluginJsxA11y } from "./load"
import { a11yConfigKeys } from "./keys"
import flatBase from "../configs/flat/base"
import type { Linter } from "eslint"

/** Build a11y configs */
export function buildFlatConfigs(): Record<string, Linter.Config[]> {
  const configs: Record<string, Linter.Config[]> = {}

  for (const configName of a11yConfigKeys) {
    // flat config
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

        return [...flatBase, { rules: newRules }]
      },
    })
  }
  return configs
}

/** Build a11y configs */
export function buildLegacyConfigs(): Record<string, Linter.Config> {
  const baseExtend = "plugin:astro/base"

  const configs: Record<string, Linter.Config> = {}

  for (const configName of a11yConfigKeys) {
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

        return { extends: [baseExtend], rules: newRules }
      },
    })
  }
  return configs
}
