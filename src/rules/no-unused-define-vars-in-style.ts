import type { TSESTree } from "@typescript-eslint/types"
import { AST_NODE_TYPES } from "@typescript-eslint/types"
import type { AST } from "astro-eslint-parser"
import { getPropertyName } from "@eslint-community/eslint-utils"
import { createRule } from "../utils"
import { getAttributeName } from "../utils/ast-utils"
import { iterateCSSVars } from "../utils/style"
import { getSourceCode } from "../utils/compat"
import type { RuleModule } from "../types"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-unused-define-vars-in-style", {
  meta: {
    docs: {
      description: "disallow unused `define:vars={...}` in `style` tag",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      unused: "'{{varName}}' is defined but never used.",
    },
    type: "problem",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    return {
      "JSXElement > JSXOpeningElement[name.type='JSXIdentifier'][name.name='style']"(
        node: AST.JSXOpeningElement & { parent: AST.JSXElement },
      ) {
        const defineVars = node.attributes.find(
          (
            attr,
          ): attr is
            | AST.JSXAttribute
            | AST.AstroTemplateLiteralAttribute
            | AST.AstroShorthandAttribute =>
            getAttributeName(attr) === "define:vars",
        )

        if (!defineVars) {
          return
        }
        if (
          !defineVars.value ||
          defineVars.value.type !== AST_NODE_TYPES.JSXExpressionContainer ||
          defineVars.value.expression.type !== AST_NODE_TYPES.ObjectExpression
        ) {
          return
        }
        if (node.parent.children.length !== 1) {
          return
        }
        const textNode = node.parent.children[0]
        if (!textNode || textNode.type !== "AstroRawText") {
          return
        }

        const definedVars = defineVars.value.expression.properties
          .filter(
            (prop): prop is TSESTree.Property =>
              prop.type === AST_NODE_TYPES.Property,
          )
          .map((prop) => ({
            prop,
            name: getPropertyName(prop, sourceCode.getScope(node)),
          }))
          .filter((data): data is typeof data & { name: string } =>
            Boolean(data.name),
          )
        if (!definedVars.length) {
          return
        }

        const lang = node.attributes.find(
          (
            attr,
          ): attr is
            | AST.JSXAttribute
            | AST.AstroTemplateLiteralAttribute
            | AST.AstroShorthandAttribute => getAttributeName(attr) === "lang",
        )
        const langValue =
          lang &&
          lang.value &&
          lang.value.type === AST_NODE_TYPES.Literal &&
          lang.value.value

        let unusedDefinedVars = [...definedVars]
        for (const cssVar of iterateCSSVars(textNode.value, {
          inlineComment: Boolean(langValue) && langValue !== "css",
        })) {
          const variable = cssVar.slice(2) // remove --
          unusedDefinedVars = unusedDefinedVars.filter(
            (v) => v.name !== variable,
          )
        }

        for (const unused of unusedDefinedVars) {
          context.report({
            node: unused.prop.key,
            messageId: "unused",
            data: {
              varName: unused.name,
            },
          })
        }
      },
    }
  },
}) as RuleModule
