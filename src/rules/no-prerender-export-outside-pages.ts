import type { TSESTree } from "@typescript-eslint/types"
import type { RuleModule } from "../types.ts"
import { createRule } from "../utils/index.ts"
import { getSourceCode, getFilename } from "../utils/compat.ts"

const PAGES_DIR_PATTERN = /(?:^|[/\\])pages[/\\]/

const rule: RuleModule = createRule("no-prerender-export-outside-pages", {
  meta: {
    docs: {
      description: "disallow `prerender` export outside of pages/ directory",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [],
    messages: {
      disallowPrerenderOutsidePages:
        "'prerender' export is only valid inside a pages/ directory.",
    },
    type: "problem",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices?.isAstro) {
      return {}
    }

    const filename = getFilename(context)
    if (PAGES_DIR_PATTERN.test(filename)) {
      return {}
    }

    /**
     * Verify for export declarations
     */
    function verifyDeclaration(
      node: TSESTree.ExportNamedDeclaration["declaration"],
    ) {
      if (!node) return
      if (
        node.type === "VariableDeclaration" &&
        node.declarations.some(
          (decl) =>
            decl.id.type === "Identifier" && decl.id.name === "prerender",
        )
      ) {
        context.report({
          node,
          messageId: "disallowPrerenderOutsidePages",
        })
      }
    }

    return {
      ExportNamedDeclaration(node) {
        if (node.exportKind === "type") return
        verifyDeclaration(node.declaration)
        for (const spec of node.specifiers) {
          if (spec.exportKind === "type") continue
          if (
            spec.exported.type === "Identifier" &&
            spec.exported.name === "prerender"
          ) {
            context.report({
              node: spec,
              messageId: "disallowPrerenderOutsidePages",
            })
          }
        }
      },
    }
  },
})

export default rule
