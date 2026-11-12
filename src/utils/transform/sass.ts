import type { AST } from "astro-eslint-parser"
import { decode, encode } from "@jridgewell/sourcemap-codec"
import type { TransformResult } from "./types.ts"
import { getContentRange, loadModule } from "./utils.ts"
import type { RuleContext } from "../../types.ts"

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
  const sourceCode = context.sourceCode
  let code = sourceCode.text.slice(...inputRange)
  let indent = 0
  if (type === "sass") {
    // The indented syntax does not allow the whole document to be indented,
    // but the content of `<style lang="sass">` usually is.
    ;({ code, indent } = dedent(code))
  }

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
      mappings: indent
        ? shiftSourceColumns(output.sourceMap!.mappings, indent)
        : output.sourceMap!.mappings,
    }
  } catch {
    return null
  }
}

/**
 * Remove the indentation shared by all non-blank lines.
 */
function dedent(code: string): { code: string; indent: number } {
  const lines = code.split("\n")
  let prefix: string | null = null
  for (const line of lines) {
    if (!line.trim()) {
      continue
    }
    const lineIndent = /^[\t ]*/u.exec(line)![0]
    if (prefix == null) {
      prefix = lineIndent
    } else {
      let i = 0
      while (
        i < prefix.length &&
        i < lineIndent.length &&
        prefix[i] === lineIndent[i]
      ) {
        i++
      }
      prefix = prefix.slice(0, i)
    }
    if (!prefix) {
      return { code, indent: 0 }
    }
  }
  if (!prefix) {
    return { code, indent: 0 }
  }
  const indent = prefix.length
  return {
    code: lines
      .map((line) => (line.startsWith(prefix) ? line.slice(indent) : ""))
      .join("\n"),
    indent,
  }
}

/**
 * Add the removed indentation back to the source columns of the mappings.
 */
function shiftSourceColumns(mappings: string, indent: number): string {
  const decoded = decode(mappings)
  for (const line of decoded) {
    for (const segment of line) {
      if (segment.length !== 1) {
        segment[3] += indent
      }
    }
  }
  return encode(decoded)
}

/**
 * Load sass
 */
function loadSass(context: RuleContext): Sass | null {
  return loadModule(context, "sass")
}
