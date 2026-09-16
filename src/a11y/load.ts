import type { RuleContext, RuleListener } from "../types.ts"
import { requireUserLocal } from "../utils/resolve-parser/require-user.ts"

/** A variable used to load modules within our website. */
declare const _ESLINT_PLUGIN_ASTRO_MODULES: {
  require: <T>(id: string) => T
}

export type PluginJsxA11yRuleModule = {
  meta?: {
    docs?: {
      url?: string
    }
    messages?: never
    schema?: never
    type?: never
    fixable?: never
    deprecated?: boolean | object
  }
  create: (context: RuleContext) => RuleListener
}
type PluginRules = Record<string, PluginJsxA11yRuleModule | undefined>
type PluginJsxA11yConfig = {
  plugins?: string | string[]
  parserOptions?: unknown
  rules?: Record<string, string | unknown[]>
  languageOptions?: unknown
}
type PluginJsxA11y = {
  rules?: PluginRules
  configs?: Record<string, PluginJsxA11yConfig | undefined>
}
let pluginJsxA11yCache: PluginJsxA11y | null = null
let loaded = false

/**
 * Resolves a plugin by name from the available module sources.
 */
function requirePlugin(pluginName: string): PluginJsxA11y | null {
  if (typeof _ESLINT_PLUGIN_ASTRO_MODULES !== "undefined") {
    try {
      return _ESLINT_PLUGIN_ASTRO_MODULES.require<PluginJsxA11y>(pluginName)
    } catch {
      // ignore
    }
  }

  return requireUserLocal<PluginJsxA11y>(pluginName)
}

/**
 * Load `eslint-plugin-jsx-a11y` or `eslint-plugin-jsx-a11y-x` from the user local.
 */
export function getPluginJsxA11y(): PluginJsxA11y | null {
  if (loaded) {
    return pluginJsxA11yCache
  }

  const pluginNames = ["eslint-plugin-jsx-a11y", "eslint-plugin-jsx-a11y-x"]

  for (const pluginName of pluginNames) {
    const plugin = requirePlugin(pluginName)

    if (plugin) {
      pluginJsxA11yCache = plugin
      loaded = true
      return pluginJsxA11yCache
    }
  }

  loaded = true
  return null
}
