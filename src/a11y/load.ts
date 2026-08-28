import type { RuleContext, RuleListener } from "../types.ts"
import { requireUserLocal } from "../utils/resolve-parser/require-user.ts"

/** A variable used to load modules within our website. */
declare const _ESLINT_PLUGIN_ASTRO_MODULES: {
  require: <T>(id: string) => T
}

export const PLUGIN_NAMES = {
  jsxA11yX: "eslint-plugin-jsx-a11y-x",
  jsxA11y: "eslint-plugin-jsx-a11y",
} as const
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
type PluginJsxA11yXRuleModule = {
  meta?: {
    name?: string
    version?: string
  }
  rules?: PluginRules
}
type PluginJsxA11yXConfig = Omit<PluginJsxA11yConfig, "plugins"> & {
  plugins?: Record<string, PluginJsxA11yXRuleModule>
}
type PluginJsxA11yX = {
  configs?: Record<string, PluginJsxA11yXConfig | undefined>
}
let pluginJsxA11yCache: PluginJsxA11y | null = null
let loaded = false

/**
 * Normalize `eslint-plugin-jsx-a11y-x` to the interface used internally.
 * `eslint-plugin-jsx-a11y-x` exposes its rules through: configs.<config>.plugins["jsx-a11y-x"].rules
 * while `eslint-plugin-jsx-a11y` exposes them directly through: rules
 * Both plugins are normalized to the same internal interface.
 */
function normalizePlugin(
  plugin: PluginJsxA11y | PluginJsxA11yX,
): PluginJsxA11y {
  if ("rules" in plugin && plugin.rules) {
    return plugin
  }
  const jsxA11yXPlugin = plugin as PluginJsxA11yX
  const configs = jsxA11yXPlugin.configs
  if (!configs) {
    return {}
  }

  const rules =
    configs.recommended?.plugins?.["jsx-a11y-x"]?.rules ??
    configs.strict?.plugins?.["jsx-a11y-x"]?.rules
  const normalizedConfigs: Record<string, PluginJsxA11yConfig> = {}

  for (const [configName, config] of Object.entries(configs)) {
    if (!config) {
      continue
    }

    normalizedConfigs[configName] = {
      rules: config.rules,
      languageOptions: config.languageOptions,
    }
  }

  return {
    rules,
    configs: normalizedConfigs,
  }
}

/**
 * Resolves a plugin by name from the available module sources.
 */
function requirePlugin(
  pluginName: string,
): PluginJsxA11y | PluginJsxA11yX | null {
  if (typeof _ESLINT_PLUGIN_ASTRO_MODULES !== "undefined") {
    try {
      return _ESLINT_PLUGIN_ASTRO_MODULES.require<
        PluginJsxA11y | PluginJsxA11yX
      >(pluginName)
    } catch {
      // ignore
    }
  }

  return requireUserLocal<PluginJsxA11y | PluginJsxA11yX>(pluginName)
}

/**
 * Load `eslint-plugin-jsx-a11y-x` or `eslint-plugin-jsx-a11y` from the user local.
 */
export function getPluginJsxA11y(): PluginJsxA11y | null {
  if (loaded) {
    return pluginJsxA11yCache
  }

  const pluginNames = [PLUGIN_NAMES.jsxA11yX, PLUGIN_NAMES.jsxA11y]

  for (const pluginName of pluginNames) {
    const plugin = requirePlugin(pluginName)

    if (plugin) {
      pluginJsxA11yCache = normalizePlugin(plugin)
      loaded = true
      return pluginJsxA11yCache
    }
  }

  return null
}
