import type { AST } from "astro-eslint-parser"

import { createRule } from "../utils"

export default createRule("sort-attributes", {
  meta: {
    docs: {
      description: "enforce sorting of attributes",
      category: "Stylistic Issues",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          type: { type: "string", enum: ["alphabetical", "line-length"] },
          ignoreCase: { type: "boolean" },
          order: { type: "string", enum: ["asc", "desc"] },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpectedAstroAttributesOrder:
        'Expected "{{right}}" to come before "{{left}}".',
    },
    fixable: "code",
    type: "suggestion",
  },
  create(context) {
    if (!context.parserServices.isAstro) {
      return {}
    }

    return {
      JSXElement(node) {
        const { openingElement } = node
        const { attributes } = openingElement

        if (attributes.length <= 1) {
          return
        }

        const sourceCode = context.getSourceCode()

        const pairwise = <T>(
          nodes: T[],
          callback: (left: T, right: T, iteration: number) => void,
        ) => {
          if (nodes.length > 1) {
            for (let i = 1; i < nodes.length; i++) {
              let left = nodes.at(i - 1)
              let right = nodes.at(i)

              if (left && right) {
                callback(left, right, i - 1)
              }
            }
          }
        }

        type Node =
          | AST.AstroShorthandAttribute
          | AST.AstroTemplateLiteralAttribute
          | AST.JSXAttribute

        type SortingNode = {
          name: string
          node: Node
          size: number
        }

        const compare = (left: SortingNode, right: SortingNode) => {
          const compareFunc = (a: SortingNode, b: SortingNode) => {
            if (context.options[0]?.type === "line-length") {
              return a.size - b.size
            }
            const formatName = (name: string) =>
              context.options[0]?.ignoreCase === false
                ? name
                : name.toLowerCase()
            return formatName(a.name).localeCompare(formatName(b.name))
          }

          const orderCoefficient = context.options[0]?.order === "desc" ? -1 : 1

          return compareFunc(left, right) * orderCoefficient
        }

        const parts = attributes.reduce(
          (accumulator: SortingNode[][], attribute) => {
            if (attribute.type === "JSXSpreadAttribute") {
              accumulator.push([])
              return accumulator
            }

            const name =
              typeof attribute.name.name === "string"
                ? attribute.name.name
                : sourceCode.text.slice(...attribute.name.range)

            accumulator[accumulator.length - 1].push({
              name,
              node: attribute,
              size: attribute.range[1] - attribute.range[0],
            })

            return accumulator
          },
          [[]],
        )

        for (let nodes of parts) {
          pairwise(nodes, (left, right) => {
            if (compare(left, right) > 0) {
              context.report({
                node: left.node,
                messageId: "unexpectedAstroAttributesOrder",
                data: {
                  left: left.name,
                  right: right.name,
                },
                fix(fixer) {
                  return fixer.replaceTextRange(
                    [left.node.range[0], right.node.range[1]],
                    sourceCode.text.slice(...right.node.range) +
                      sourceCode.text.slice(...left.node.range),
                  )
                },
              })
            }
          })
        }
      },
    }
  },
})
