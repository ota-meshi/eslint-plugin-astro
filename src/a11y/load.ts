import type { RuleContext, RuleListener } from "../types.ts"
import { requireUserLocal } from "../utils/resolve-parser/require-user.ts"

/** A variable used to load modules within our website. */
declare const _ESLINT_PLUGIN_ASTRO_MODULES: {
  require: <T>(id: string) => T
}

export type PluginRuleModule = {
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
type PluginConfig = {
  plugins?: string | string[]
  parserOptions?: unknown
  rules?: Record<string, string | unknown[]>
}
export type PluginJsxA11y = {
  rules?: Record<string, PluginRuleModule | undefined>
  configs?: Record<string, PluginConfig | undefined>
}
let pluginJsxA11yCache: PluginJsxA11y | null = null
let loaded = false
/**
 * Load `eslint-plugin-jsx-a11y` from the user local.
 */
export function getPluginJsxA11y(): PluginJsxA11y | null {
  if (loaded) {
    return pluginJsxA11yCache
  }
  if (!pluginJsxA11yCache) {
    pluginJsxA11yCache = requireUserLocal("eslint-plugin-jsx-a11y")
  }
  if (!pluginJsxA11yCache) {
    try {
      if (typeof _ESLINT_PLUGIN_ASTRO_MODULES !== "undefined")
        pluginJsxA11yCache = _ESLINT_PLUGIN_ASTRO_MODULES.require(
          "eslint-plugin-jsx-a11y",
        )
    } catch {
      // ignore
    }
  }

  loaded = true
  return pluginJsxA11yCache || null
}
