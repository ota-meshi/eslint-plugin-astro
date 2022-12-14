import type { AST } from "astro-eslint-parser"
import { decode, type SourceMapMappings } from "@jridgewell/sourcemap-codec"
import type { RuleContext } from "../../types"
import { findAttribute, getStaticAttributeStringValue } from "../ast-utils"
import { getContentRange } from "./utils"
import { transform as transformWithPostCSS } from "./postcss"
import { transform as transformWithSass } from "./sass"
import { transform as transformWithLess } from "./less"
import { transform as transformWithStylus } from "./stylus"
import type { TransformResult } from "./types"
import { LinesAndColumns } from "./lines-and-columns"

const cache = new WeakMap<AST.JSXElement, StyleContentCSS>()

export type StyleContentCSS = {
  css: string
  remap: (index: number) => number
}
/** Get style content css */
export function getStyleContentCSS(
  node: AST.JSXElement,
  context: RuleContext,
): StyleContentCSS | null {
  const cachedResult = cache.get(node)
  if (cachedResult) {
    return cachedResult
  }
  const langNode = findAttribute(node, "lang")
  const lang = langNode && getStaticAttributeStringValue(langNode)
  if (!langNode || lang === "css") {
    const inputRange = getContentRange(node)
    return {
      css: context.getSourceCode().text.slice(...inputRange),
      remap: (i) => inputRange[0] + i,
    }
  }
  let transform: TransformResult | null = null
  if (lang === "postcss") {
    transform = transformWithPostCSS(node, context)
  } else if (lang === "scss" || lang === "sass") {
    transform = transformWithSass(node, context, lang)
  } else if (lang === "less") {
    transform = transformWithLess(node, context)
  } else if (lang === "styl" || lang === "stylus") {
    transform = transformWithStylus(node, context)
  }
  if (!transform) {
    return null
  }

  const result = transformToStyleContentCSS(transform, context)
  cache.set(node, result)
  return result
}

/** TransformResult to style content css */
function transformToStyleContentCSS(
  transform: TransformResult,
  context: RuleContext,
): StyleContentCSS {
  let outputLocs: LinesAndColumns | null = null
  let inputLocs: LinesAndColumns | null = null
  let decoded: SourceMapMappings | null = null
  return {
    css: transform.output,
    remap: (index) => {
      outputLocs = outputLocs ?? new LinesAndColumns(transform.output)
      inputLocs =
        inputLocs ??
        new LinesAndColumns(
          context.getSourceCode().text.slice(...transform.inputRange),
        )
      const outputCodePos = outputLocs.getLocFromIndex(index)
      const inputCodePos = remapPosition(outputCodePos)
      return inputLocs.getIndexFromLoc(inputCodePos) + transform.inputRange[0]
    },
  }

  /** Remapping source position */
  function remapPosition(pos: { line: number; column: number }): {
    line: number
    column: number
  } {
    decoded = decoded ?? decode(transform.mappings)

    const lineMaps = decoded[pos.line - 1]

    if (!lineMaps?.length) {
      for (let line = pos.line - 1; line >= 0; line--) {
        const prevLineMaps = decoded[line]
        if (prevLineMaps?.length) {
          const [, , sourceCodeLine, sourceCodeColumn] =
            prevLineMaps[prevLineMaps.length - 1]
          return {
            line: sourceCodeLine! + 1,
            column: sourceCodeColumn!,
          }
        }
      }
      return { line: -1, column: -1 }
    }

    for (let index = 0; index < lineMaps.length - 1; index++) {
      const [generateCodeColumn, , sourceCodeLine, sourceCodeColumn] =
        lineMaps[index]
      if (
        generateCodeColumn <= pos.column &&
        pos.column < lineMaps[index + 1][0]
      ) {
        return {
          line: sourceCodeLine! + 1,
          column: sourceCodeColumn! + (pos.column - generateCodeColumn),
        }
      }
    }
    const [generateCodeColumn, , sourceCodeLine, sourceCodeColumn] =
      lineMaps[lineMaps.length - 1]
    return {
      line: sourceCodeLine! + 1,
      column: sourceCodeColumn! + (pos.column - generateCodeColumn),
    }
  }
}
