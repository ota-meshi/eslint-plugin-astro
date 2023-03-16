import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import { createRule } from "../utils"

export default createRule("no-deprecated-astro-resolve", {
  meta: {
    docs: {
      description: "disallow using deprecated `Astro.resolve()`",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {
      deprecated: "'Astro.resolve()' is deprecated.",
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
            resolve: { [READ]: true },
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
