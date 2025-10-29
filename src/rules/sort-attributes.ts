import type { AST } from "astro-eslint-parser"

import { createRule } from "../utils"
import { getSourceCode } from "../utils/compat"
import type { RuleModule } from "../types"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
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
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    return {
      JSXElement(node) {
        const { openingElement } = node
        const { attributes } = openingElement

        if (attributes.length <= 1) {
          return
        }

        /**
         *
         */
        function pairwise<T>(
          nodes: T[],
          callback: (left: T, right: T, iteration: number) => void,
        ) {
          if (nodes.length > 1) {
            for (let i = 1; i < nodes.length; i++) {
              const left = nodes.at(i - 1)
              const right = nodes.at(i)

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

        const compareFunc =
          context.options[0]?.type === "line-length"
            ? (a: SortingNode, b: SortingNode) => a.size - b.size
            : (a: SortingNode, b: SortingNode) =>
                formatName(a.name).localeCompare(formatName(b.name))

        const compare =
          context.options[0]?.order === "desc"
            ? (left: SortingNode, right: SortingNode) =>
                compareFunc(right, left)
            : (left: SortingNode, right: SortingNode) =>
                compareFunc(left, right)

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

        for (const nodes of parts) {
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
                      " ".repeat(right.node.range[0] - left.node.range[1]) +
                      sourceCode.text.slice(...left.node.range),
                  )
                },
              })
            }
          })
        }

        /**
         * Format the name based on the ignoreCase option.
         */
        function formatName(name: string) {
          return context.options[0]?.ignoreCase === false
            ? name
            : name.toLowerCase()
        }
      },
    }
  },
}) as RuleModule
