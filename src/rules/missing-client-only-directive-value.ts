import type { AST } from "astro-eslint-parser"
import { createRule } from "../utils"
import { getAttributeName, getStaticAttributeValue } from "../utils/ast-utils"
import { getSourceCode } from "../utils/compat"

export default createRule("missing-client-only-directive-value", {
  meta: {
    docs: {
      description:
        "the client:only directive is missing the correct component's framework value",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      missingValue: "`client:only` directive is missing a value",
    },
    type: "problem",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    /** VerifyDirectiveValue */
    function verifyDirectiveValue(
      attr: AST.JSXAttribute | AST.AstroTemplateLiteralAttribute,
    ) {
      const directiveName = getAttributeName(attr)
      if (directiveName !== "client:only") return

      const directiveValue = getStaticAttributeValue(attr, context)
      if (directiveValue !== null) return

      context.report({
        node: attr.name,
        messageId: "missingValue",
      })
    }

    return {
      JSXAttribute: verifyDirectiveValue,
      AstroTemplateLiteralAttribute: verifyDirectiveValue,
    }
  },
})
