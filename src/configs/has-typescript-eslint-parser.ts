import type { Linter } from "eslint"
import { requireUserLocal } from "../utils/resolve-parser/require-user.ts"

type TypescriptEslint = {
  parser?: Linter.Parser
  default?: {
    parser?: Linter.Parser
  }
}

/** Load the TypeScript parser installed in the user's project. */
function loadTypescriptEslintParser(): Linter.Parser | null {
  const parser = requireUserLocal<Linter.Parser>("@typescript-eslint/parser")
  if (parser) {
    return parser
  }

  const typescriptEslint =
    requireUserLocal<TypescriptEslint>("typescript-eslint")
  return typescriptEslint?.parser ?? typescriptEslint?.default?.parser ?? null
}

export const tsESLintParser: Linter.Parser | null = loadTypescriptEslintParser()
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export const hasTypescriptEslintParser = Boolean(tsESLintParser) as boolean
