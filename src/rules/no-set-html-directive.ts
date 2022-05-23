import type { AST } from "astro-eslint-parser"
import { createRule } from "../utils"

export default createRule("no-set-html-directive", {
  meta: {
    docs: {
      description: "disallow use of `set:html` to prevent XSS attack",
      category: "Security Vulnerability",
      recommended: false,
    },
    schema: [],
    messages: {
      unexpected: "`set:html` can lead to XSS attack.",
    },
    type: "suggestion",
  },
  create(context) {
    if (!context.parserServices.isAstro) {
      return {}
    }

    /** Verify */
    function verifyName({
      name: node,
    }: {
      name: AST.JSXIdentifier | AST.JSXNamespacedName
    }) {
      if (
        node.type !== "JSXNamespacedName" ||
        node.namespace.name !== "set" ||
        node.name.name !== "html"
      ) {
        return
      }
      context.report({
        node,
        messageId: "unexpected",
      })
    }

    return {
      JSXAttribute: verifyName,
      AstroTemplateLiteralAttribute: verifyName,
    }
  },
})
