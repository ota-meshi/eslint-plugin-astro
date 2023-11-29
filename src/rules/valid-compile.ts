import { createRule } from "../utils"
import { getSourceCode } from "../utils/compat"

export default createRule("valid-compile", {
  meta: {
    docs: {
      description: "disallow warnings when compiling.",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    messages: {},
    type: "problem",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }
    const diagnostics = sourceCode.parserServices.getAstroResult().diagnostics

    return {
      Program() {
        for (const { text, code, location, severity } of diagnostics) {
          if (severity === 2 /* Warning */) {
            context.report({
              loc: {
                start: location,
                end: location,
              },
              message: `${text} [${code}]`,
            })
          }
        }
      },
    }
  },
})
