import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import { createRule } from "../utils"

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
    if (!context.parserServices.isAstro) {
      return {}
    }

    return {
      "Program:exit"() {
        const tracker = new ReferenceTracker(context.getScope())
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
})
