import type { AST } from "astro-eslint-parser"
import type { TransformResult } from "./types"
import { getContentRange, loadModule } from "./utils"
import type { RuleContext } from "../../types"
import { getFilename, getSourceCode } from "../compat"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports --- Ignore inline type
type Less = typeof import("less")
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

  const sourceCode = getSourceCode(context)
  const code = sourceCode.text.slice(...inputRange)

  const filename = `${getFilename(context)}.less`
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
  } catch {
    return null
  }
}

/**
 * Load less
 */
function loadLess(context: RuleContext): Less | null {
  return loadModule(context, "less")
}
