import { createRule } from "../utils"
import type { TSESTree } from "@typescript-eslint/types"
import { getSourceCode } from "../utils/compat"
import type { RuleModule } from "../types"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
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
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    return {
      ImportSpecifier(node: TSESTree.ImportSpecifier) {
        if (
          node.imported.type === "Identifier" &&
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
}) as RuleModule
