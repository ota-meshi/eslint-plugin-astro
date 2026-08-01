import type { AST } from "astro-eslint-parser"
import type { TSESTree } from "@typescript-eslint/types"
import { createRule } from "../utils/index.ts"
import { getAttributeName, getElementName } from "../utils/ast-utils.ts"
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
      unexpected:
        "Cannot use `{{directive}}` on an Astro component. Astro components are server-only and cannot be hydrated on the client.",
    },
    type: "problem",
  },
  create(context) {
    const sourceCode = context.sourceCode
    if (!sourceCode.parserServices?.isAstro) {
      return {}
    }

    const astroComponentNames = new Set<string>()

    /** Verify a client directive on an Astro component. */
    function verify(
      attr: AST.JSXAttribute | AST.AstroTemplateLiteralAttribute,
    ) {
      const directive = getAttributeName(attr)
      if (!directive?.startsWith("client:")) {
        return
      }

      const element = attr.parent?.parent
      if (!element || element.type !== "JSXElement") {
        return
      }

      const elementName = getElementName(element)
      if (!elementName || !astroComponentNames.has(elementName)) {
        return
      }

      context.report({
        node: attr.name,
        messageId: "unexpected",
        data: { directive },
      })
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        if (
          typeof node.source.value !== "string" ||
          !node.source.value.endsWith(".astro")
        ) {
          return
        }

        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportDefaultSpecifier") {
            astroComponentNames.add(specifier.local.name)
          }
        }
      },
      JSXAttribute: verify,
      AstroTemplateLiteralAttribute: verify,
    }
  },
}) as RuleModule
