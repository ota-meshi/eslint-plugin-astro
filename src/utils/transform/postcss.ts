import type { AST } from "astro-eslint-parser"
import postcss from "postcss"
import type { RuleContext } from "../../types"
import { getContentRange, loadModule } from "./utils"
import type { TransformResult } from "./types"
import { getCwd, getFilename, getSourceCode } from "../compat"

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

  const sourceCode = getSourceCode(context)
  const code = sourceCode.text.slice(...inputRange)

  const filename = `${getFilename(context)}.css`
  try {
    const config = postcssLoadConfig.sync({
      cwd: getCwd(context) ?? process.cwd(),
      from: filename,
    })

    const result = postcss(config.plugins).process(code, {
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
