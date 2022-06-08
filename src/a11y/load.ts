import type { RuleContext, RuleListener } from "../types"
import { requireUserLocal } from "../utils/resolve-parser/require-user"

export type PluginRuleModule = {
  meta?: {
    docs?: {
      url?: string
    }
    messages?: never
    schema?: never
    type?: never
    fixable?: never
    deprecated?: boolean
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
    if (typeof require !== "undefined") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
        pluginJsxA11yCache = require("eslint-plugin-jsx-a11y")
      } catch {
        loaded = true
      }
    }
  }

  return pluginJsxA11yCache || null
}
