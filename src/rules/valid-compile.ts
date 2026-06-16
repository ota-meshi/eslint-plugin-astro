import type { RuleModule } from "../types.ts"
import { createRule } from "../utils/index.ts"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
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
    const sourceCode = context.sourceCode
    if (!sourceCode.parserServices?.isAstro) {
      return {}
    }
    const diagnostics =
      sourceCode.parserServices?.getAstroResult?.().diagnostics
    if (!diagnostics) {
      return {}
    }

    return {
      Program() {
        for (const { text, labels, severity } of diagnostics) {
          if (severity === "warning") {
            const label = labels?.[0]
            context.report({
              loc: label
                ? {
                    start: sourceCode.getLocFromIndex(label.start),
                    end: sourceCode.getLocFromIndex(label.end),
                  }
                : {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 0 },
                  },
              message: `${text}`,
            })
          }
        }
      },
    }
  },
}) as RuleModule
