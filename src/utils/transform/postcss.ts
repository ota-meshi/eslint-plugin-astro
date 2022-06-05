import type { AST } from "astro-eslint-parser"
import postcss from "postcss"
import type postcssLoadConfig from "postcss-load-config"
import type { RuleContext } from "../../types"
import { getContentRange, loadModule } from "./utils"
import type { TransformResult } from "./types"
type PostcssLoadConfig = typeof postcssLoadConfig
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

  const code = context.getSourceCode().text.slice(...inputRange)

  const filename = `${context.getFilename()}.css`
  try {
    const config = postcssLoadConfig.sync({
      cwd: context.getCwd?.() ?? process.cwd(),
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
  } catch (e) {
    // console.log(e)
    return null
  }
}

/**
 * Load postcss-load-config
 */
function loadPostcssLoadConfig(context: RuleContext): PostcssLoadConfig | null {
  return loadModule(context, "postcss-load-config")
}
