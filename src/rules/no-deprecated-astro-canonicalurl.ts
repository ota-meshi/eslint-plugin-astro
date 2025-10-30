import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import { createRule } from "../utils"
import { getSourceCode } from "../utils/compat"
import type { RuleModule } from "../types"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-deprecated-astro-canonicalurl", {
  meta: {
    docs: {
      description: "disallow using deprecated `Astro.canonicalURL`",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      deprecated:
        "'Astro.canonicalURL' is deprecated. Use 'Astro.url' helper instead.",
    },
    type: "problem",
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
            canonicalURL: { [READ]: true },
          },
        })) {
          context.report({
            node,
            messageId: "deprecated",
            data: { name: path.join(".") },
          })
        }
      },
    }
  },
}) as RuleModule
