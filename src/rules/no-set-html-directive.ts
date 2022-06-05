import type { AST } from "astro-eslint-parser"
import { createRule } from "../utils"
import { getAttributeName } from "../utils/ast-utils"

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
    function verifyName(
      attr: AST.JSXAttribute | AST.AstroTemplateLiteralAttribute,
    ) {
      if (getAttributeName(attr) !== "set:html") {
        return
      }
      context.report({
        node: attr.name,
        messageId: "unexpected",
      })
    }

    return {
      JSXAttribute: verifyName,
      AstroTemplateLiteralAttribute: verifyName,
    }
  },
})
