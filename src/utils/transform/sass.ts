import type { AST } from "astro-eslint-parser"
import type { TransformResult } from "./types"
import { getContentRange, loadModule } from "./utils"
import type { RuleContext } from "../../types"
import { getSourceCode } from "../compat"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports --- Ignore inline type
type Sass = typeof import("sass")
/**
 * Transpile with sass
 */
export function transform(
  node: AST.JSXElement,
  context: RuleContext,
  type: "scss" | "sass",
): TransformResult | null {
  const sass = loadSass(context)
  if (!sass) {
    return null
  }
  const inputRange = getContentRange(node)
  const sourceCode = getSourceCode(context)
  const code = sourceCode.text.slice(...inputRange)

  try {
    const output = sass.compileString(code, {
      sourceMap: true,
      syntax: type === "sass" ? "indented" : undefined,
    })
    if (!output) {
      return null
    }
    return {
      inputRange,
      output: output.css,
      mappings: output.sourceMap!.mappings,
    }
  } catch {
    return null
  }
}

/**
 * Load sass
 */
function loadSass(context: RuleContext): Sass | null {
  return loadModule(context, "sass")
}
