import type { TSESTree } from "@typescript-eslint/types"
import { AST_NODE_TYPES } from "@typescript-eslint/types"
import type { AST } from "astro-eslint-parser"
import type { Rule } from "eslint"
import { getPropertyName } from "@eslint-community/eslint-utils"
import { isCommaToken } from "@eslint-community/eslint-utils"
import { createRule } from "../utils"
import {
  extractConcatExpressions,
  getAttributeName,
  getParenthesizedRange,
  getParenthesizedTokens,
  getStringIfConstant,
  isStringCallExpression,
  isStringLiteral,
  needParentheses,
} from "../utils/ast-utils"
import { getSourceCode } from "../utils/compat"

export default createRule("prefer-object-class-list", {
  meta: {
    docs: {
      description:
        "require use object instead of ternary expression in `class:list`",
      category: "Stylistic Issues",
      recommended: false,
    },
    schema: [],
    messages: {
      unexpected: "Unexpected class using the ternary operator.",
    },
    fixable: "code",
    type: "suggestion",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    type Expr = {
      not?: true
      node: TSESTree.Expression
      chains?: Expr
    }
    type TransformExpression = (data: {
      newProps: NewObjectProps
      node: TSESTree.ConditionalExpression
      beforeSpaces: string
      afterSpaces: string
      fixer: Rule.RuleFixer
    }) => Iterable<Rule.Fix>

    type TransformArray = (data: {
      newProps: NewObjectProps
      node: TSESTree.ConditionalExpression
      fixer: Rule.RuleFixer
    }) => Iterable<Rule.Fix>

    class NewObjectProps {
      public props: { key: string; value: string }[] = []

      public toObjectString() {
        return `{${this.toPropsString()}}`
      }

      public fixObject({
        fixer,
        object,
      }: {
        fixer: Rule.RuleFixer
        object: TSESTree.ObjectExpression
      }): Rule.Fix {
        const closeBrace = sourceCode.getLastToken(object)
        const maybeComma = sourceCode.getTokenBefore(closeBrace)!
        let text
        if (isCommaToken(maybeComma)) {
          text = this.toPropsString()
        } else {
          text = `,${this.toPropsString()}`
        }

        return fixer.insertTextAfterRange(maybeComma.range, text)
      }

      private toPropsString() {
        return `${this.props
          .map(({ key, value }) => `${key}: ${value}`)
          .join(", ")}`
      }
    }

    /**
     * Returns a map of expressions and strings from ConditionalExpression.
     * Returns null if it has an unknown string.
     */
    function parseConditionalExpression(
      node: TSESTree.ConditionalExpression,
    ): Map<Expr, string> | null {
      const result = new Map<Expr, string>()

      if (
        !processItems(
          {
            node: node.test,
          },
          node.consequent,
        )
      ) {
        return null
      }
      if (
        !processItems(
          {
            not: true,
            node: node.test,
          },
          node.alternate,
        )
      ) {
        return null
      }

      return result

      /** Process items */
      function processItems(key: Expr, e: TSESTree.Expression) {
        if (e.type === "ConditionalExpression") {
          const sub = parseConditionalExpression(e)
          if (sub == null) {
            return false
          }
          for (const [expr, str] of sub) {
            result.set(
              {
                ...key,
                chains: expr,
              },
              str,
            )
          }
        } else {
          const str = getStringIfConstant(e)
          if (str == null) {
            return false
          }
          result.set(key, str)
        }
        return true
      }
    }

    /**
     * Expr to string
     */
    function exprToString({ node, not }: Expr): string {
      let text = sourceCode.text.slice(...node.range)

      // *Currently not supported.
      // if (chains) {
      //   if (needParentheses(node, "logical")) {
      //     text = `(${text})`
      //   }
      //   let chainsText = exprToString(chains)
      //   const needParenForChains =
      //     !/^[!(]/u.test(chainsText) && needParentheses(chains.node, "logical")
      //   if (needParenForChains) {
      //     chainsText = `(${chainsText})`
      //   }
      //   text = `${text} && ${chainsText}`
      //   if (not) {
      //     text = `!(${text})`
      //   }
      //   return text
      // }
      if (not) {
        if (node.type === "BinaryExpression") {
          if (
            node.operator === "===" ||
            node.operator === "==" ||
            node.operator === "!==" ||
            node.operator === "!="
          ) {
            const left = sourceCode.text.slice(...node.left.range)
            const op = sourceCode.text.slice(
              node.left.range[1],
              node.right.range[0],
            )
            const right = sourceCode.text.slice(...node.right.range)

            return `${left}${
              node.operator === "===" || node.operator === "=="
                ? op.replace(/[=](={1,2})/g, "!$1")
                : op.replace(/!(={1,2})/g, "=$1")
            }${right}`
          }
        } else if (node.type === "UnaryExpression") {
          if (node.operator === "!" && node.prefix) {
            return sourceCode.text.slice(...node.argument.range)
          }
        }

        if (needParentheses(node, "not")) {
          text = `(${text})`
        }
        text = `!${text}`
      }
      return text
    }

    /**
     * Returns all possible strings.
     */
    function getStrings(
      node:
        | TSESTree.Expression
        | TSESTree.TemplateElement
        | TSESTree.PrivateIdentifier,
    ): string[] | null {
      if (node.type === "TemplateElement") {
        return [node.value.cooked]
      }
      if (node.type === "ConditionalExpression") {
        const values = parseConditionalExpression(node)
        if (values == null) {
          // unknown
          return null
        }
        return [...values.values()]
      }
      const str = getStringIfConstant(node)
      if (str == null) {
        // unknown
        return null
      }
      return [str]
    }

    /**
     * Checks if the last character is a non word.
     */
    function endsWithSpace(
      elements: (
        | TSESTree.Expression
        | TSESTree.TemplateElement
        | TSESTree.PrivateIdentifier
      )[],
    ): boolean | null {
      for (let i = elements.length - 1; i >= 0; i--) {
        const valueNode = elements[i]
        const strings = getStrings(valueNode)
        if (strings == null) {
          if (valueNode.type === AST_NODE_TYPES.TemplateLiteral) {
            const quasiValue =
              valueNode.quasis[valueNode.quasis.length - 1].value.cooked
            if (quasiValue && !quasiValue[quasiValue.length - 1].trim()) {
              return true
            }
          }
          // unknown
          return false
        }
        let hasEmpty = false
        for (const str of strings) {
          if (str) {
            if (str[str.length - 1].trim()) {
              return false
            }
          } else {
            hasEmpty = true
          }
        }
        if (!hasEmpty) {
          return true
        }
        // If the string is empty, check the previous string.
      }
      return null // has empty or all empty
    }

    /**
     * Checks if the first character is a non word.
     */
    function startsWithSpace(
      elements: (
        | TSESTree.Expression
        | TSESTree.TemplateElement
        | TSESTree.PrivateIdentifier
      )[],
    ): boolean | null {
      for (let i = 0; i < elements.length; i++) {
        const valueNode = elements[i]
        const strings = getStrings(valueNode)
        if (strings == null) {
          if (valueNode.type === AST_NODE_TYPES.TemplateLiteral) {
            const quasiValue = valueNode.quasis[0].value.cooked
            if (quasiValue && !quasiValue[0].trim()) {
              return true
            }
          }
          // unknown
          return false
        }
        let hasEmpty = false
        for (const str of strings) {
          if (str) {
            if (str[0].trim()) {
              return false
            }
          } else {
            hasEmpty = true
          }
        }
        if (!hasEmpty) {
          return true
        }
        // If the string is empty, check the previous string.
      }
      return null // has empty or all empty
    }

    /** Report */
    function report(
      node: TSESTree.ConditionalExpression,
      map: Map<Expr, string>,
      state: {
        fixExpression: TransformExpression
      },
    ) {
      context.report({
        node,
        messageId: "unexpected",
        *fix(fixer) {
          const classProps = new NewObjectProps()
          let beforeSpaces = ""
          let afterSpaces = ""
          for (const [expr, className] of map) {
            const trimmedClassName = className.trim()
            if (trimmedClassName) {
              classProps.props.push({
                key: JSON.stringify(trimmedClassName),
                value: exprToString(expr),
              })
            } else {
              if (!classProps.props.length) {
                beforeSpaces += className
              } else {
                afterSpaces += className
              }
            }
          }

          yield* state.fixExpression({
            newProps: classProps,
            beforeSpaces,
            afterSpaces,
            node,
            fixer,
          })
        },
      })
    }

    /** Verify for ConditionalExpression */
    function verifyConditionalExpression(
      node: TSESTree.ConditionalExpression,
      state: {
        beforeIsWord: () => boolean
        afterIsWord: () => boolean
        fixExpression: TransformExpression
      },
    ) {
      const map = parseConditionalExpression(node)
      if (map == null) {
        // has unknown
        return
      }
      let canTransform = true
      for (const className of map.values()) {
        if (className) {
          if (
            (className[0].trim() && state.beforeIsWord()) ||
            (className[className.length - 1].trim() && state.afterIsWord())
          ) {
            // The previous or next may be connected to this element.
            canTransform = false
            break
          }
        } else {
          if (state.beforeIsWord() && state.afterIsWord()) {
            // The previous and next may be connected.
            canTransform = false
            break
          }
        }
      }
      if (!canTransform) {
        return
      }
      report(node, map, state)
    }

    /** Verify attr */
    function verifyAttr(
      attr: AST.JSXAttribute | AST.AstroTemplateLiteralAttribute,
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

      for (const element of extractElements(expression)) {
        visitElementExpression(element.node, {
          beforeIsWord: () => false,
          afterIsWord: () => false,
          *fixArrayElement(data) {
            yield data.fixer.removeRange(
              getParenthesizedRange(data.node, sourceCode),
            )
            if (!element.array) {
              // transform array
              let open, close
              if (attr.type === "AstroTemplateLiteralAttribute") {
                open = "{["
                close = "]}"
              } else {
                open = "["
                close = "]"
              }

              yield data.fixer.insertTextBeforeRange(expression.range, open)
              yield data.fixer.insertTextAfterRange(
                expression.range,
                `,${data.newProps.toObjectString()}${close}`,
              )
              return
            }
            const object = findClosestObject(element.array, element.node)
            if (object) {
              // merge object
              yield data.newProps.fixObject({ fixer: data.fixer, object })
              return
            }
            // new element
            const tokens = getParenthesizedTokens(element.node, sourceCode)
            const maybeComma = sourceCode.getTokenAfter(tokens.right)!
            let insertOffset, text
            if (isCommaToken(maybeComma)) {
              insertOffset = maybeComma.range[1]
              text = data.newProps.toObjectString()
            } else {
              insertOffset = tokens.right.range[1]
              text = `,${data.newProps.toObjectString()}`
            }
            if (
              element.array.elements[element.array.elements.length - 1] !==
              element.node
            ) {
              // not last
              text += ","
            }
            yield data.fixer.insertTextAfterRange(
              [insertOffset, insertOffset],
              text,
            )
          },
          *fixExpression(data) {
            if (element.array) {
              const object = findClosestObject(element.array, element.node)
              if (object) {
                // merge object
                yield data.fixer.removeRange(
                  getParenthesizedRange(data.node, sourceCode),
                )

                const tokens = getParenthesizedTokens(element.node, sourceCode)
                const maybeComma = sourceCode.getTokenAfter(tokens.right)!
                if (isCommaToken(maybeComma)) {
                  yield data.fixer.removeRange(maybeComma.range)
                } else {
                  const maybeBeforeComma = sourceCode.getTokenBefore(
                    tokens.left,
                  )!
                  if (isCommaToken(maybeBeforeComma)) {
                    yield data.fixer.removeRange(maybeBeforeComma.range)
                  }
                }

                yield data.newProps.fixObject({ fixer: data.fixer, object })
                return
              }
            }

            yield data.fixer.replaceTextRange(
              getParenthesizedRange(data.node, sourceCode),
              data.newProps.toObjectString(),
            )
          },
        })
      }

      /**
       * Finds the object expression that is closest to the given array element.
       */
      function findClosestObject(
        array: TSESTree.ArrayExpression,
        target: TSESTree.Expression,
      ) {
        const index = array.elements.indexOf(target)
        const afterElements = array.elements.slice(index + 1)
        const beforeElements = array.elements.slice(0, index).reverse()
        const length = Math.max(afterElements.length, beforeElements.length)

        for (let index = 0; index < length; index++) {
          const after = afterElements[index]
          if (after?.type === AST_NODE_TYPES.ObjectExpression) {
            return after
          }
          const before = beforeElements[index]
          if (before?.type === AST_NODE_TYPES.ObjectExpression) {
            return before
          }
        }
        return null
      }

      /** Visit expression */
      function visitElementExpression(
        node: TSESTree.Expression | TSESTree.PrivateIdentifier,
        state: {
          beforeIsWord: () => boolean
          afterIsWord: () => boolean
          fixArrayElement: TransformArray
          fixExpression: TransformExpression
        },
      ) {
        if (node.type === AST_NODE_TYPES.ConditionalExpression) {
          verifyConditionalExpression(node, state)
        } else if (node.type === AST_NODE_TYPES.TemplateLiteral) {
          const quasis = [...node.quasis]
          let beforeQuasiWk = quasis.shift()!
          for (const expression of node.expressions) {
            const beforeQuasi = beforeQuasiWk
            const afterQuasi = quasis.shift()!
            visitElementExpression(expression, {
              beforeIsWord() {
                const beforeElements = []
                const targetIndex = node.expressions.indexOf(expression)
                for (let index = 0; index < targetIndex; index++) {
                  beforeElements.push(
                    node.quasis[index],
                    node.expressions[index],
                  )
                }
                beforeElements.push(node.quasis[targetIndex])
                const isSpace = endsWithSpace(beforeElements)
                return isSpace == null ? state.beforeIsWord() : !isSpace
              },
              afterIsWord() {
                const targetIndex = node.expressions.indexOf(expression)
                const afterElements: (
                  | TSESTree.Expression
                  | TSESTree.TemplateElement
                )[] = [node.quasis[targetIndex + 1]]
                for (
                  let index = targetIndex + 1;
                  index < node.expressions.length;
                  index++
                ) {
                  afterElements.push(
                    node.expressions[index],
                    node.quasis[index + 1],
                  )
                }
                const isSpace = startsWithSpace(afterElements)
                return isSpace == null ? state.afterIsWord() : !isSpace
              },
              fixArrayElement: state.fixArrayElement,
              *fixExpression(data) {
                const fixer = data.fixer
                if (
                  beforeQuasi.value.cooked.trim() ||
                  afterQuasi.value.cooked.trim() ||
                  // has other expression
                  node.expressions.length > 1
                ) {
                  // remove quotes
                  yield fixer.replaceTextRange(
                    [beforeQuasi.range[1] - 2, beforeQuasi.range[1]],
                    data.beforeSpaces,
                  )
                  yield fixer.replaceTextRange(
                    [afterQuasi.range[0], afterQuasi.range[0] + 1],
                    data.afterSpaces,
                  )
                  yield* state.fixArrayElement(data)
                  return
                }
                // remove all expression
                const tokens = getParenthesizedTokens(node, sourceCode)
                yield fixer.removeRange([
                  tokens.left.range[0],
                  beforeQuasi.range[1],
                ])
                yield fixer.removeRange([
                  afterQuasi.range[0],
                  tokens.right.range[1],
                ])
                yield* state.fixExpression({
                  ...data,
                  beforeSpaces: beforeQuasi.value.cooked + data.beforeSpaces,
                  afterSpaces: data.afterSpaces + afterQuasi.value.cooked,
                })
              },
            })
            beforeQuasiWk = afterQuasi
          }
        } else if (node.type === AST_NODE_TYPES.CallExpression) {
          if (
            isStringCallExpression(node) &&
            node.arguments[0] &&
            node.arguments[0].type !== AST_NODE_TYPES.SpreadElement
          ) {
            visitElementExpression(node.arguments[0], {
              beforeIsWord: state.beforeIsWord,
              afterIsWord: state.afterIsWord,
              fixArrayElement: state.fixArrayElement,
              *fixExpression(data) {
                const openParen = sourceCode.getTokenAfter(
                  getParenthesizedTokens(node.callee, sourceCode).right,
                )!
                const stripStart = sourceCode.getTokenAfter(
                  getParenthesizedTokens(node.arguments[0], sourceCode).right,
                )!
                const tokens = getParenthesizedTokens(node, sourceCode)
                yield data.fixer.removeRange([
                  tokens.left.range[0],
                  openParen.range[1],
                ])
                yield data.fixer.removeRange([
                  stripStart.range[0],
                  tokens.right.range[1],
                ])
                yield* state.fixExpression(data)
              },
            })
          } else if (
            node.callee.type === AST_NODE_TYPES.MemberExpression &&
            getPropertyName(node.callee) === "trim"
          ) {
            const men = node.callee
            visitElementExpression(men.object, {
              beforeIsWord: state.beforeIsWord,
              afterIsWord: state.afterIsWord,
              fixArrayElement: state.fixArrayElement,
              *fixExpression(data) {
                const tokens = getParenthesizedTokens(men.object, sourceCode)
                yield data.fixer.removeRange([
                  tokens.right.range[1],
                  node.range[1],
                ])
                yield* state.fixExpression(data)
              },
            })
          }
        } else if (node.type === AST_NODE_TYPES.BinaryExpression) {
          const elements = extractConcatExpressions(node, sourceCode)
          if (!elements) {
            return
          }

          for (const expression of elements) {
            visitElementExpression(expression, {
              beforeIsWord() {
                const index = elements.indexOf(expression)
                const beforeElements = elements.slice(0, index)
                const isSpace = endsWithSpace(beforeElements)
                return isSpace == null ? state.beforeIsWord() : !isSpace
              },
              afterIsWord() {
                const index = elements.indexOf(expression)
                const afterElements = elements.slice(index + 1)
                const isSpace = startsWithSpace(afterElements)
                return isSpace == null ? state.afterIsWord() : !isSpace
              },
              fixArrayElement: state.fixArrayElement,
              *fixExpression(data) {
                const fixer = data.fixer
                const index = elements.indexOf(expression)
                const beforeElements = elements.slice(0, index)
                const afterElements = elements.slice(index + 1)
                const tokens = getParenthesizedTokens(expression, sourceCode)
                if (
                  beforeElements.some((element) => {
                    const str = getStringIfConstant(element)
                    return str == null || Boolean(str.trim())
                  }) ||
                  afterElements.some((element) => {
                    const str = getStringIfConstant(element)
                    return str == null || Boolean(str.trim())
                  })
                ) {
                  // remove operand
                  const beforeElement =
                    beforeElements[beforeElements.length - 1]
                  const afterElement = afterElements[0]
                  if (
                    beforeElement &&
                    isStringLiteral(beforeElement) &&
                    afterElement &&
                    isStringLiteral(afterElement)
                  ) {
                    // concat string
                    if (
                      sourceCode.text[beforeElement.range[0]] !==
                      sourceCode.text[afterElement.range[0]]
                    ) {
                      // quote mismatch...
                      const targetIsBefore =
                        sourceCode.text[beforeElement.range[0]] === "'"
                      const replaceLiteral = targetIsBefore
                        ? beforeElement
                        : afterElement
                      yield fixer.replaceTextRange(
                        [
                          replaceLiteral.range[0] + 1,
                          replaceLiteral.range[1] - 1,
                        ],
                        JSON.stringify(replaceLiteral.value).slice(1, -1),
                      )
                      // replace quote
                      yield fixer.replaceTextRange(
                        targetIsBefore
                          ? [
                              replaceLiteral.range[0],
                              replaceLiteral.range[0] + 1,
                            ]
                          : [
                              replaceLiteral.range[1] - 1,
                              replaceLiteral.range[1],
                            ],
                        '"',
                      )
                    }
                    yield fixer.replaceTextRange(
                      [beforeElement.range[1] - 1, tokens.left.range[0]],
                      data.beforeSpaces,
                    )
                    yield fixer.replaceTextRange(
                      [tokens.right.range[1], afterElement.range[0] + 1],
                      data.afterSpaces,
                    )
                  } else {
                    // remove plus op
                    const beforeToken = sourceCode.getTokenBefore(tokens.left)!
                    if (beforeToken?.value === "+") {
                      yield fixer.removeRange(beforeToken.range)
                    } else {
                      const afterToken = sourceCode.getTokenAfter(tokens.right)!
                      yield fixer.removeRange(afterToken.range)
                    }
                  }

                  yield* state.fixArrayElement(data)
                  return
                }
                // remove all expression
                if (beforeElements.length) {
                  const beforeToken = sourceCode.getTokenBefore(tokens.left)!
                  yield fixer.removeRange([
                    beforeElements[0].range[0],
                    beforeToken.range[1],
                  ])
                }
                if (afterElements.length) {
                  const afterToken = sourceCode.getTokenAfter(tokens.right)!
                  yield fixer.removeRange([
                    afterToken.range[0],
                    afterElements[afterElements.length - 1].range[1],
                  ])
                }
                yield* state.fixExpression({
                  ...data,
                  beforeSpaces:
                    beforeElements
                      .map((e) => getStringIfConstant(e)!)
                      .join("") + data.beforeSpaces,
                  afterSpaces:
                    data.afterSpaces +
                    afterElements.map((e) => getStringIfConstant(e)!).join(""),
                })
              },
            })
          }
        }
      }
    }

    /** Extract array element expressions */
    function extractElements(node: TSESTree.Expression): {
      array: TSESTree.ArrayExpression | null
      node: TSESTree.Expression
    }[] {
      if (node.type === AST_NODE_TYPES.ArrayExpression) {
        const result: {
          array: TSESTree.ArrayExpression | null
          node: TSESTree.Expression
        }[] = []
        for (const element of node.elements) {
          if (!element || element.type === AST_NODE_TYPES.SpreadElement) {
            continue
          }
          result.push(
            ...extractElements(element).map((e) => {
              if (e.array == null) {
                return {
                  array: node,
                  node: e.node,
                }
              }
              return e
            }),
          )
        }
        return result
      }
      return [{ node, array: null }]
    }

    return {
      JSXAttribute: verifyAttr,
      AstroTemplateLiteralAttribute: verifyAttr,
    }
  },
})
