import { traverseNodes } from "astro-eslint-parser"
import type { TSESTree } from "@typescript-eslint/types"
import { resolveParser } from "../../utils/resolve-parser"

/**
 * Parse expression
 */
export function parseExpression(code: string): TSESTree.Expression {
  const result = resolveParser().parseForESLint(
    `(
${code}
)`,
    { range: true, loc: true },
  )
  const statement = result.ast.body[0] as TSESTree.ExpressionStatement
  const expression = statement.expression
  traverseNodes(expression, {
    visitorKeys: result.visitorKeys as never,
    enterNode(node) {
      node.loc.start = {
        ...node.loc.start,
        line: node.loc.start.line - 1,
      }
      node.loc.end = {
        ...node.loc.end,
        line: node.loc.end.line - 1,
      }
      node.range = [node.range[0] - 2, node.range[1] - 2]
    },
    leaveNode() {
      /* noop */
    },
  })

  return expression
}
