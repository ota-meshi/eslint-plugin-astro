import type { ParserOptions } from "@typescript-eslint/types"
import { parseForESLint as parseAstro } from "astro-eslint-parser"
import { parseForESLint as parseJs } from "@typescript-eslint/parser"

/** Change the parser used by the file name. */
export function parseForESLint(code: string, options: ParserOptions): any {
  if (options.filePath!.endsWith(".astro")) {
    return parseAstro(code, options)
  }
  return parseJs(code, options)
}
