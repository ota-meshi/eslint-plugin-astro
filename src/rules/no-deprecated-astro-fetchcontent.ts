import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import { createRule } from "../utils"
import { getSourceCode } from "../utils/compat"
import type { RuleModule } from "../types"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-deprecated-astro-fetchcontent", {
  meta: {
    docs: {
      description: "disallow using deprecated `Astro.fetchContent()`",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      deprecated:
        "'Astro.fetchContent()' is deprecated. Use 'Astro.glob()' instead.",
    },
    type: "problem",
    fixable: "code",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    return {
      "Program:exit"(node) {
        const tracker = new ReferenceTracker(sourceCode.getScope(node))
        for (const { node, path } of tracker.iterateGlobalReferences({
          Astro: {
            fetchContent: { [READ]: true },
          },
        })) {
          context.report({
            node,
            messageId: "deprecated",
            data: { name: path.join(".") },
            fix(fixer) {
              if (node.type !== "MemberExpression" || node.computed) {
                return null
              }
              return fixer.replaceText(node.property, "glob")
            },
          })
        }
      },
    }
  },
}) as RuleModule
