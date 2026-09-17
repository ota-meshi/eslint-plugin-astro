import type { AST } from "astro-eslint-parser"
import postcss from "postcss"
import type { RuleContext } from "../../types.ts"
import { getContentRange, loadModule } from "./utils.ts"
import type { TransformResult } from "./types.ts"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports --- Ignore inline type
type PostcssLoadConfig = typeof import("postcss-load-config")
/**
 * Transform with postcss
 */
export function transform(
  node: AST.JSXElement,
  context: RuleContext,
): TransformResult | null {
  const postcssLoadConfig = loadPostcssLoadConfig(context)
  if (!postcssLoadConfig) {
    return null
  }
  const inputRange = getContentRange(node)

  const sourceCode = context.sourceCode
  const code = sourceCode.text.slice(...inputRange)

  const filename = `${context.filename}.css`
  try {
    const config = postcssLoadConfig.sync({
      cwd: context.cwd ?? process.cwd(),
      from: filename,
    })

    const result = postcss(config.plugins.map(unwrapDefault)).process(code, {
      ...config.options,
      map: {
        inline: false,
      },
    })

    return {
      inputRange,
      output: result.content,
      mappings: result.map.toJSON().mappings,
    }
  } catch {
    return null
  }
}

/**
 * Load postcss-load-config
 */
function loadPostcssLoadConfig(context: RuleContext): PostcssLoadConfig | null {
  return loadModule(context, "postcss-load-config")
}

/**
 * Unwrap the default export of an ES module namespace object.
 *
 * `postcss-load-config` loads plugins with `require`, so an ESM-only plugin
 * (e.g. `postcss-nested` v8) is returned as a module namespace object,
 * which PostCSS does not accept as a plugin.
 */
function unwrapDefault<T>(plugin: T): T {
  if (
    typeof plugin === "object" &&
    plugin !== null &&
    "default" in plugin &&
    plugin.default
  ) {
    return plugin.default as T
  }
  return plugin
}
