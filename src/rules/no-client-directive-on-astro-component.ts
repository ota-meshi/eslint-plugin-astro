import type { AST } from "astro-eslint-parser"
import type { TSESTree } from "@typescript-eslint/types"
import { createRule } from "../utils/index.ts"
import { getAttributeName, getElementName } from "../utils/ast-utils.ts"
import { getSourceCode } from "../utils/compat.ts"
import type { RuleModule } from "../types.ts"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-client-directive-on-astro-component", {
  meta: {
    docs: {
      description:
        "disallow using `client:` directives on Astro components since they are server-only",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      noClientDirective:
        "Cannot use `{{directive}}` on an Astro component. Astro components are server-only and cannot be hydrated on the client.",
    },
    type: "problem",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices?.isAstro) {
      return {}
    }

    const astroImports = new Map<string, true>()

    /**
     * Check if the attribute is a client directive on an astro component
     */
    function verify(
      attr: AST.JSXAttribute | AST.AstroTemplateLiteralAttribute,
    ) {
      const directiveName = getAttributeName(attr)

      if (!directiveName?.startsWith("client:")) return

      const element = attr.parent?.parent

      if (!element || element.type !== "JSXElement") return

      const elementName = getElementName(element)

      if (!elementName || !astroImports.has(elementName)) return

      context.report({
        node: attr.name,
        messageId: "noClientDirective",
        data: {
          directive: directiveName,
        },
      })
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const source = node.source.value

        if (typeof source !== "string" || !source.endsWith(".astro")) return

        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportDefaultSpecifier") {
            astroImports.set(specifier.local.name, true)
          }
        }
      },
      JSXAttribute: verify,
      AstroTemplateLiteralAttribute: verify,
    }
  },
}) as RuleModule
