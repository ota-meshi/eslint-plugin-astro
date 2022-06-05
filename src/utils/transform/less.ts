import type { AST } from "astro-eslint-parser"
import type less from "less"
import type { TransformResult } from "./types"
import { getContentRange, loadModule } from "./utils"
import type { RuleContext } from "../../types"

type Less = typeof less
/**
 * Transpile with less
 */
export function transform(
  node: AST.JSXElement,
  context: RuleContext,
): TransformResult | null {
  const less = loadLess(context)
  if (!less) {
    return null
  }
  const inputRange = getContentRange(node)

  const code = context.getSourceCode().text.slice(...inputRange)

  const filename = `${context.getFilename()}.less`
  try {
    let output: Awaited<ReturnType<Less["render"]>> | undefined

    less.render(
      code,
      {
        sourceMap: {},
        syncImport: true,
        filename,
        lint: false,
      },
      (_error, result) => {
        output = result
      },
    )
    if (!output) {
      return null
    }
    return {
      inputRange,
      output: output.css,
      mappings: JSON.parse(output.map).mappings,
    }
  } catch (e) {
    return null
  }
}

/**
 * Load less
 */
function loadLess(context: RuleContext): Less | null {
  return loadModule(context, "less")
}
