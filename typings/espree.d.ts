declare module "espree" {
  import type { ParserOptions, TSESTree } from "@typescript-eslint/types"

  export function parse(
    code: string,
    options?: ParserOptions | null,
  ): TSESTree.Program
}
