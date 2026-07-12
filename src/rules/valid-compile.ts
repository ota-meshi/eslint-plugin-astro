import type { RuleModule } from "../types.ts"
import { createRule } from "../utils/index.ts"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("valid-compile", {
  meta: {
    docs: {
      description: "disallow warnings when compiling.",
      category: "Possible Errors",
      recommended: false,
    },
    deprecated: {
      message:
        "This rule is deprecated. Use `astro check` to check your project for errors instead.",
      url: "https://ota-meshi.github.io/eslint-plugin-astro/rules/valid-compile/",
      replacedBy: [],
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
}) as RuleModule
