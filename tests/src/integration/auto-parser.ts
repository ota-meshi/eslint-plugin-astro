import type { ParserOptions } from "@typescript-eslint/types"
import { fileURLToPath } from "node:url"
import { parseForESLint as parseAstro } from "astro-eslint-parser"
import { parseForESLint as parseJs } from "@typescript-eslint/parser"

const filename = fileURLToPath(import.meta.url)

/** Change the parser used by the file name. */
export function parseForESLint(code: string, options: ParserOptions): any {
  if (options.filePath!.endsWith(".astro")) {
    return parseAstro(code, options)
  }
  return parseJs(code, options)
}

export const meta: {
  name: string
} = {
  name: filename,
}
