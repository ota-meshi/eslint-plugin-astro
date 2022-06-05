import type { AST } from "astro-eslint-parser"
import { AST_NODE_TYPES } from "@typescript-eslint/types"
import type { TSESTree } from "@typescript-eslint/types"
import { createRule } from "../utils"
import type { TrackedReferences } from "eslint-utils"
import { isOpeningParenToken, ReferenceTracker } from "eslint-utils"
import {
  extractConcatExpressions,
  getAttributeName,
  isStringCallExpression,
  isStringLiteral,
} from "../utils/ast-utils"
import type { Token } from "../utils/string-literal-parser"
import { parseStringTokens } from "../utils/string-literal-parser"
import type { Rule } from "eslint"
import { getPropertyName } from "eslint-utils"

export default createRule("prefer-split-class-list", {
  meta: {
    docs: {
      description: "require use split array elements in `class:list`",
      category: "Stylistic Issues",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          splitLiteral: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      uselessClsx: "Using `clsx()` for the `class:list` has no effect.",
      split: "Can split elements with spaces.",
    },
    fixable: "code",
    type: "suggestion",
  },
  create(context) {
    if (!context.parserServices.isAstro) {
      return {}
    }

    const splitLiteral = Boolean(context.options[0]?.splitLiteral)

    const sourceCode = context.getSourceCode()

    type TransformArray = (fixer: Rule.RuleFixer) => Iterable<Rule.Fix>

    /** Check if it should be reported. */
    function shouldReport(state: {
      isFirstElement: boolean
      isLastElement: boolean
      isLeading: boolean
      isTrailing: boolean
    }) {
      if (state.isFirstElement) {
        if (state.isLeading) {
          return false
        }
      }
      if (state.isLastElement) {
        if (state.isTrailing) {
          return false
        }
      }
      if (splitLiteral) {
        return true
      }

      return state.isLeading || state.isTrailing
    }

    /** Verify attr */
    function verifyAttr(
      attr:
        | AST.JSXAttribute
        | AST.AstroTemplateLiteralAttribute
        | AST.AstroShorthandAttribute,
    ) {
      if (getAttributeName(attr) !== "class:list") {
        return
      }
      if (
        !attr.value ||
        attr.value.type !== AST_NODE_TYPES.JSXExpressionContainer ||
        attr.value.expression.type === AST_NODE_TYPES.JSXEmptyExpression
      ) {
        return
      }

      const expression = attr.value.expression
      verifyExpression(expression, function* (fixer) {
        if (expression.type === AST_NODE_TYPES.ArrayExpression) {
          return
        }
        yield fixer.insertTextBeforeRange(expression.range, "[")
        yield fixer.insertTextAfterRange(expression.range, "]")
      })
    }

    /** Verify expression */
    function verifyExpression(
      node: TSESTree.Expression | TSESTree.SpreadElement,
      transformArray: TransformArray,
      call?: string,
    ) {
      if (node.type === AST_NODE_TYPES.TemplateLiteral) {
        const first = node.quasis[0]
        const last = node.quasis[node.quasis.length - 1]
        for (const quasi of node.quasis) {
          verifyTemplateElement(quasi, {
            isFirstElement: first === quasi,
            isLastElement: last === quasi,
            transformArray,
            call,
          })
        }
      } else if (node.type === AST_NODE_TYPES.BinaryExpression) {
        verifyBinaryExpression(node, transformArray)
      } else if (node.type === AST_NODE_TYPES.ArrayExpression) {
        for (const element of node.elements) {
          if (element) {
            verifyExpression(element, transformArray)
          }
        }
      } else if (node.type === AST_NODE_TYPES.Literal) {
        if (splitLiteral && isStringLiteral(node)) {
          verifyStringLiteral(node, {
            isFirstElement: true,
            isLastElement: true,
            transformArray,
            call,
          })
        }
      } else if (node.type === AST_NODE_TYPES.CallExpression) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          getPropertyName(node.callee) === "trim"
        ) {
          verifyExpression(node.callee.object, transformArray, ".trim()")
        }
      }
    }

    /** Verify TemplateElement */
    function verifyTemplateElement(
      node: TSESTree.TemplateElement,
      state: {
        isFirstElement: boolean
        isLastElement: boolean
        transformArray: TransformArray
        call?: string
      },
    ) {
      const stringEndOffset = node.tail ? node.range[1] - 1 : node.range[1] - 2

      let isLeading = true
      const spaces: Token[] = []
      for (const ch of parseStringTokens(sourceCode.text, {
        start: node.range[0] + 1,
        end: stringEndOffset,
      })) {
        if (ch.value.trim()) {
          if (spaces.length) {
            if (shouldReport({ ...state, isLeading, isTrailing: false })) {
              reportRange([
                spaces[0].range[0],
                spaces[spaces.length - 1].range[1],
              ])
            }
            spaces.length = 0
          }
          isLeading = false
        } else {
          spaces.push(ch)
        }
      }
      if (spaces.length) {
        if (shouldReport({ ...state, isLeading, isTrailing: true })) {
          reportRange([spaces[0].range[0], spaces[spaces.length - 1].range[1]])
        }
        spaces.length = 0
      }

      /** Report */
      function reportRange(range: AST.Range) {
        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(range[0]),
            end: sourceCode.getLocFromIndex(range[1]),
          },
          messageId: "split",
          *fix(fixer) {
            yield* state.transformArray(fixer)
            yield fixer.replaceTextRange(range, `\`${state.call || ""},\``)
          },
        })
      }
    }

    /** Verify BinaryExpression */
    function verifyBinaryExpression(
      node: TSESTree.BinaryExpression,
      transformArray: TransformArray,
    ) {
      const elements = extractConcatExpressions(node, sourceCode)
      if (elements == null) {
        return
      }
      const first = elements[0]
      const last = elements[elements.length - 1]
      for (const element of elements) {
        if (isStringLiteral(element)) {
          verifyStringLiteral(element, {
            isFirstElement: first === element,
            isLastElement: last === element,
            transformArray,
          })
        }
      }
    }

    /** Verify StringLiteral */
    function verifyStringLiteral(
      node: TSESTree.StringLiteral,
      state: {
        isFirstElement: boolean
        isLastElement: boolean
        transformArray: TransformArray
        call?: string
      },
    ) {
      const quote = sourceCode.text[node.range[0]]
      let isLeading = true
      const spaces: Token[] = []
      for (const ch of parseStringTokens(sourceCode.text, {
        start: node.range[0] + 1,
        end: node.range[1] - 1,
      })) {
        if (ch.value.trim()) {
          if (spaces.length) {
            if (shouldReport({ ...state, isLeading, isTrailing: false })) {
              reportRange(
                [spaces[0].range[0], spaces[spaces.length - 1].range[1]],
                { isLeading, isTrailing: false },
              )
            }
            spaces.length = 0
          }
          isLeading = false
        } else {
          spaces.push(ch)
        }
      }
      if (spaces.length) {
        if (shouldReport({ ...state, isLeading, isTrailing: true })) {
          reportRange(
            [spaces[0].range[0], spaces[spaces.length - 1].range[1]],
            { isLeading, isTrailing: true },
          )
        }
        spaces.length = 0
      }

      /** Report */
      function reportRange(
        range: AST.Range,
        spaceState: {
          isLeading: boolean
          isTrailing: boolean
        },
      ) {
        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(range[0]),
            end: sourceCode.getLocFromIndex(range[1]),
          },
          messageId: "split",
          *fix(fixer) {
            yield* state.transformArray(fixer)

            let leftQuote = quote
            let rightQuote = quote

            const bin = node.parent as TSESTree.BinaryExpression

            if (
              spaceState.isLeading &&
              bin.right === node &&
              isStringType(bin.left)
            ) {
              leftQuote = ""
            }
            if (
              spaceState.isTrailing &&
              bin.left === node &&
              isStringType(bin.right)
            ) {
              rightQuote = ""
            }

            const replaceRange: AST.Range = [...range]

            if (!leftQuote || !rightQuote) {
              if (!leftQuote) {
                replaceRange[0]--
              }
              if (!rightQuote) {
                replaceRange[1]++
              }
              yield fixer.remove(
                sourceCode.getTokensBetween(bin.left, bin.right, {
                  includeComments: false,
                  filter: (t) => t.value === bin.operator,
                })[0],
              )
            }

            yield fixer.replaceTextRange(
              replaceRange,
              `${leftQuote}${state.call || ""},${rightQuote}`,
            )
          },
        })
      }
    }

    /** Verify clsx */
    function verifyClsx(clsxCall: TrackedReferences<unknown>) {
      if (clsxCall.node.type !== AST_NODE_TYPES.CallExpression) {
        return
      }
      const callNode = clsxCall.node as TSESTree.CallExpression
      const parent = callNode.parent
      if (
        !parent ||
        parent.type !== AST_NODE_TYPES.JSXExpressionContainer ||
        parent.expression !== callNode
      ) {
        return
      }
      const parentParent = parent.parent
      if (
        !parentParent ||
        parentParent.type !== AST_NODE_TYPES.JSXAttribute ||
        parentParent.value !== parent ||
        getAttributeName(parentParent) !== "class:list"
      ) {
        return
      }
      context.report({
        node: clsxCall.node.callee,
        messageId: "uselessClsx",
        *fix(fixer) {
          const openToken = sourceCode.getTokenAfter(callNode.callee, {
            includeComments: false,
            filter: isOpeningParenToken,
          })!
          const closeToken = sourceCode.getLastToken(callNode)!
          yield fixer.removeRange([callNode.range[0], openToken.range[1]])
          yield fixer.remove(closeToken)
        },
      })
    }

    return {
      Program() {
        const referenceTracker = new ReferenceTracker(context.getScope())
        for (const call of referenceTracker.iterateEsmReferences({
          // https://github.com/lukeed/clsx
          clsx: {
            [ReferenceTracker.CALL]: true,
          },
        })) {
          verifyClsx(call)
        }
      },
      JSXAttribute: verifyAttr,
      AstroTemplateLiteralAttribute: verifyAttr,
    }
  },
})

/** Checks whether given node evaluate type is string */
function isStringType(
  node: TSESTree.Expression | TSESTree.PrivateIdentifier,
): boolean {
  if (node.type === AST_NODE_TYPES.Literal) {
    return typeof node.value === "string"
  } else if (node.type === AST_NODE_TYPES.TemplateLiteral) {
    return true
  } else if (node.type === AST_NODE_TYPES.BinaryExpression) {
    return isStringType(node.left) || isStringType(node.right)
  }
  return isStringCallExpression(node)
}
