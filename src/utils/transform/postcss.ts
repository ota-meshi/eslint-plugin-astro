import type { AST } from "astro-eslint-parser"
import postcss from "postcss"
import type postcssLoadConfig from "postcss-load-config"
import type { RuleContext } from "../../types"
import { getContentRange, loadModule } from "./utils"
import type { TransformResult } from "./types"
import { getCwd, getFilename, getSourceCode } from "../compat"
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
  } catch (_e) {
    // console.log(_e)
    return null
  }
}

/**
 * Load postcss-load-config
 */
function loadPostcssLoadConfig(context: RuleContext): PostcssLoadConfig | null {
  return loadModule(context, "postcss-load-config")
}
