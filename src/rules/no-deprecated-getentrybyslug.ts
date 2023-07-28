import { createRule } from "../utils"
import type { TSESTree } from "@typescript-eslint/types"

export default createRule("no-deprecated-getentrybyslug", {
  meta: {
    docs: {
      description: "disallow using deprecated `getEntryBySlug()`",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      deprecated: "'getEntryBySlug()' is deprecated. Use 'getEntry()' instead.",
    },
    type: "problem",
  },
  create(context) {
    if (!context.parserServices.isAstro) {
      return {}
    }

    return {
      ImportSpecifier(node: TSESTree.ImportSpecifier) {
        if (
          node.imported.name === "getEntryBySlug" &&
          node.parent?.type === "ImportDeclaration" &&
          node.parent.source.value === "astro:content"
        ) {
          context.report({
            node,
            messageId: "deprecated",
          })
        }
      },
    }
  },
})
