import { getPluginJsxA11y } from "./load.ts"
import { a11yConfigKeys } from "./keys.ts"
import flatBase from "../configs/flat/base.ts"
import type { Linter } from "eslint"

/**
 * Normalize a rule name from the underlying a11y plugin to the
 * namespace exposed by eslint-plugin-astro.
 */
function getAstroRuleName(ruleName: string): string {
  return ruleName.replace(/^(?:jsx-a11y|jsx-a11y-x)\//u, "astro/jsx-a11y/")
}

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
          newRules[getAstroRuleName(ruleName)] = baseRules[ruleName]
        }

        return [
          ...flatBase,
          {
            rules: newRules,
            ...(baseConfig.languageOptions
              ? { languageOptions: baseConfig.languageOptions }
              : {}),
          },
        ]
      },
    })
  }
  return configs
}
