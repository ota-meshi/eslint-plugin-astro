import type { TSESTree } from "@typescript-eslint/types"
import { createRule } from "../utils"
import { getSourceCode } from "../utils/compat"

export default createRule("no-exports-from-components", {
  meta: {
    docs: {
      description: "disallow value export",
      category: "Possible Errors",
      // TODO: Switch to recommended: true, in next major version
      recommended: false,
    },
    schema: [],
    messages: {
      disallowExport: "Exporting values from components is not allowed.",
    },
    type: "problem",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    /**
     * Verify for export declarations
     */
    function verifyDeclaration(
      node:
        | TSESTree.ExportDefaultDeclaration["declaration"]
        | TSESTree.ExportNamedDeclaration["declaration"],
    ) {
      if (!node) return
      if (node.type.startsWith("TS") && !node.type.endsWith("Expression")) {
        return
      }
      context.report({
        node,
        messageId: "disallowExport",
      })
    }

    return {
      ExportAllDeclaration(node) {
        if (node.exportKind === "type") return
        context.report({
          node,
          messageId: "disallowExport",
        })
      },
      ExportDefaultDeclaration(node) {
        if (node.exportKind === "type") return
        verifyDeclaration(node.declaration)
      },
      ExportNamedDeclaration(node) {
        if (node.exportKind === "type") return
        verifyDeclaration(node.declaration)
        for (const spec of node.specifiers) {
          if (spec.exportKind === "type") return
          context.report({
            node: spec,
            messageId: "disallowExport",
          })
        }
      },
    }
  },
})
