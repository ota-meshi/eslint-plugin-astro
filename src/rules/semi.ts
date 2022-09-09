import type { AST } from "astro-eslint-parser"
import type { SourceCode } from "../types"
import { createRule } from "../utils"
import { getCoreRule, newProxy } from "../utils/eslint-core"

const coreRule = getCoreRule("semi")
export default createRule("semi", {
  meta: {
    docs: {
      description: coreRule.meta.docs.description,
      category: "Extension Rules",
      recommended: false,
      extensionRule: "semi",
    },
    schema: coreRule.meta.schema,
    messages: coreRule.meta.messages,
    type: coreRule.meta.type,
    fixable: coreRule.meta.fixable,
    hasSuggestions: coreRule.meta.hasSuggestions,
  },
  create(context) {
    if (!context.parserServices.isAstro) {
      return coreRule.create(context)
    }

    let sourceCodeWrapper: SourceCode | undefined

    return coreRule.create(
      newProxy(context, {
        getSourceCode() {
          if (sourceCodeWrapper) {
            return sourceCodeWrapper
          }
          const sourceCode = context.getSourceCode()

          /** Transforms token */
          function transformToken(
            token: AST.Token | AST.Comment,
          ): AST.Token | AST.Comment {
            return token.value === "---"
              ? newProxy(token, { value: "___" })
              : token
          }

          return (sourceCodeWrapper = newProxy(sourceCode, {
            /* eslint-disable @typescript-eslint/unbound-method -- ignore */
            getFirstToken: wrapGetTokenFunction(sourceCode.getFirstToken),
            getFirstTokens: wrapGetTokensFunction(sourceCode.getFirstTokens),
            getFirstTokenBetween: wrapGetTokenFunction(
              sourceCode.getFirstTokenBetween,
            ),
            getFirstTokensBetween: wrapGetTokensFunction(
              sourceCode.getFirstTokensBetween,
            ),
            getLastToken: wrapGetTokenFunction(sourceCode.getLastToken),
            getLastTokens: wrapGetTokensFunction(sourceCode.getLastTokens),
            getLastTokenBetween: wrapGetTokenFunction(
              sourceCode.getLastTokenBetween,
            ),
            getLastTokensBetween: wrapGetTokensFunction(
              sourceCode.getLastTokensBetween,
            ),
            getTokenBefore: wrapGetTokenFunction(sourceCode.getTokenBefore),
            getTokensBefore: wrapGetTokensFunction(sourceCode.getTokensBefore),
            getTokenAfter: wrapGetTokenFunction(sourceCode.getTokenAfter),
            getTokensAfter: wrapGetTokensFunction(sourceCode.getTokensAfter),
            getTokenByRangeStart: wrapGetTokenFunction(
              sourceCode.getTokenByRangeStart,
            ),
            getTokens: wrapGetTokensFunction(sourceCode.getTokens),
            getTokensBetween: wrapGetTokensFunction(
              sourceCode.getTokensBetween,
            ),
            /* eslint-enable @typescript-eslint/unbound-method -- ignore */
          }))

          /** Wrap token getter function */
          function wrapGetTokenFunction<
            T extends (
              this: SourceCode,
              ...args: never[]
            ) => AST.Token | AST.Comment | null,
          >(base: T): T {
            return function (this: SourceCode, ...args) {
              // eslint-disable-next-line no-invalid-this -- is valid
              const token = base.apply(this, args)
              if (!token) {
                return token
              }
              return transformToken(token)
            } as T
          }

          /** Wrap tokens getter function */
          function wrapGetTokensFunction<
            T extends (
              this: SourceCode,
              ...args: never[]
            ) => (AST.Token | AST.Comment)[],
          >(base: T): T {
            return function (this: SourceCode, ...args) {
              // eslint-disable-next-line no-invalid-this -- is valid
              const tokens = base.apply(this, args)
              return tokens.map(transformToken)
            } as T
          }
        },
      }),
    )
  },
})
