import type { AST } from "astro-eslint-parser"
import type { TSESTree } from "@typescript-eslint/types"
import { AST_NODE_TYPES } from "@typescript-eslint/types"
import type { SourceCode } from "../types"
import {
  isParenthesized,
  isOpeningParenToken,
  isClosingParenToken,
} from "eslint-utils"
/**
 * Get the directive name from given attribute node
 */
export function getDirectiveName(
  node:
    | AST.JSXAttribute
    | AST.AstroTemplateLiteralAttribute
    | AST.AstroShorthandAttribute
    | AST.JSXSpreadAttribute
    | TSESTree.JSXAttribute
    | TSESTree.JSXSpreadAttribute,
): string | null {
  if (node.type === "JSXSpreadAttribute") {
    return null
  }
  const { name } = node
  if (name.type === "JSXNamespacedName") {
    return `${name.namespace.name}:${name.name.name}`
  }
  if (name.type === "JSXIdentifier" && name.name.includes(":")) {
    return name.name
  }
  return null
}
/**
 * Get the attribute key name from given attribute node
 */
export function getAttributeName(
  node:
    | AST.JSXAttribute
    | AST.AstroTemplateLiteralAttribute
    | AST.AstroShorthandAttribute
    | AST.JSXSpreadAttribute
    | TSESTree.JSXAttribute
    | TSESTree.JSXSpreadAttribute,
): string | null {
  if (node.type === "JSXSpreadAttribute") {
    return null
  }
  const { name } = node
  if (name.type === "JSXIdentifier") {
    return name.name
  }
  return null
}

/** Checks whether given node evaluate type is string */
export function isStringCallExpression(
  node: TSESTree.Expression | TSESTree.PrivateIdentifier,
): node is TSESTree.CallExpression & { callee: TSESTree.Identifier } {
  if (node.type === AST_NODE_TYPES.CallExpression) {
    return (
      node.callee.type === AST_NODE_TYPES.Identifier &&
      node.callee.name === "String"
    )
  }
  return false
}

/** Checks whether given node is StringLiteral */
export function isStringLiteral(
  node: TSESTree.Expression | TSESTree.PrivateIdentifier,
): node is TSESTree.StringLiteral {
  return node.type === AST_NODE_TYPES.Literal && typeof node.value === "string"
}

/** If it is concatenated with a plus, it gets its elements as an array. */
export function extractConcatExpressions(
  node: TSESTree.BinaryExpression,
  sourceCode: SourceCode,
): null | (TSESTree.Expression | TSESTree.PrivateIdentifier)[] {
  if (node.operator !== "+") {
    return null
  }
  const leftResult = processLeft(node.left)
  if (leftResult == null) {
    return null
  }

  return [...leftResult, node.right]

  /** Process for left expression */
  function processLeft(expr: TSESTree.Expression | TSESTree.PrivateIdentifier) {
    if (expr.type === AST_NODE_TYPES.BinaryExpression) {
      if (
        !isParenthesized(expr, sourceCode) &&
        expr.operator !== "*" &&
        expr.operator !== "/"
      ) {
        return extractConcatExpressions(expr, sourceCode)
      }
    }
    return [expr]
  }
}

/**
 * Get the value of a given node if it's a literal or a template literal.
 */
export function getStringIfConstant(
  node: TSESTree.Expression | TSESTree.PrivateIdentifier,
): string | null {
  if (node.type === "Literal") {
    if (typeof node.value === "string") return node.value
  } else if (node.type === "TemplateLiteral") {
    let str = ""
    const quasis = [...node.quasis]
    const expressions = [...node.expressions]
    let quasi: TSESTree.TemplateElement | undefined,
      expr: TSESTree.Expression | undefined
    while ((quasi = quasis.shift())) {
      str += quasi.value.cooked
      expr = expressions.shift()
      if (expr) {
        const exprStr = getStringIfConstant(expr)
        if (exprStr == null) {
          return null
        }
        str += exprStr
      }
    }
    return str
  } else if (node.type === "BinaryExpression") {
    if (node.operator === "+") {
      const left = getStringIfConstant(node.left)
      if (left == null) {
        return null
      }
      const right = getStringIfConstant(node.right)
      if (right == null) {
        return null
      }
      return left + right
    }
  }
  return null
}

/**
 * Check if it need parentheses.
 */
export function needParentheses(
  node: TSESTree.Expression,
  kind: "not" | "logical",
): boolean {
  if (
    node.type === "ArrowFunctionExpression" ||
    node.type === "AssignmentExpression" ||
    node.type === "BinaryExpression" ||
    node.type === "ConditionalExpression" ||
    node.type === "LogicalExpression" ||
    node.type === "SequenceExpression" ||
    node.type === "UnaryExpression" ||
    node.type === "UpdateExpression"
  )
    return true
  if (kind === "logical") {
    return node.type === "FunctionExpression"
  }
  return false
}

/**
 * Get parenthesized range from the given node
 */
export function getParenthesizedTokens(
  node:
    | TSESTree.Expression
    | TSESTree.SpreadElement
    | TSESTree.PrivateIdentifier,
  sourceCode: SourceCode,
): { left: TSESTree.Token; right: TSESTree.Token } {
  let lastLeft = sourceCode.getFirstToken(node)
  let lastRight = sourceCode.getLastToken(node)
  let maybeLeftParen, maybeRightParen
  while (
    (maybeLeftParen = sourceCode.getTokenBefore(lastLeft)) &&
    (maybeRightParen = sourceCode.getTokenAfter(lastRight)) &&
    isOpeningParenToken(maybeLeftParen) &&
    isClosingParenToken(maybeRightParen) &&
    // Avoid false positive such as `if (a) {}`
    maybeLeftParen !== getParentSyntaxParen(node, sourceCode)
  ) {
    lastLeft = maybeLeftParen
    lastRight = maybeRightParen
    maybeLeftParen = sourceCode.getTokenBefore(lastLeft)
    maybeRightParen = sourceCode.getTokenAfter(lastRight)
  }
  return { left: lastLeft, right: lastRight }
}

/**
 * Get parenthesized range from the given node
 */
export function getParenthesizedRange(
  node: TSESTree.Expression,
  sourceCode: SourceCode,
): TSESTree.Range {
  const { left, right } = getParenthesizedTokens(node, sourceCode)
  return [left.range[0], right.range[1]]
}

/**
 * Get the left parenthesis of the parent node syntax if it exists.
 * E.g., `if (a) {}` then the `(`.
 * @param {Node} node The AST node to check.
 * @param {SourceCode} sourceCode The source code object to get tokens.
 * @returns {Token|null} The left parenthesis of the parent node syntax
 */
function getParentSyntaxParen(
  node:
    | TSESTree.Expression
    | TSESTree.SpreadElement
    | TSESTree.PrivateIdentifier,
  sourceCode: SourceCode,
) {
  const parent = node.parent!

  switch (parent.type) {
    case "CallExpression":
    case "NewExpression":
      if (parent.arguments.length === 1 && parent.arguments[0] === node) {
        return sourceCode.getTokenAfter(parent.callee, {
          includeComments: false,
          filter: isOpeningParenToken,
        })
      }
      return null

    case "DoWhileStatement":
      if (parent.test === node) {
        return sourceCode.getTokenAfter(parent.body, {
          includeComments: false,
          filter: isOpeningParenToken,
        })
      }
      return null

    case "IfStatement":
    case "WhileStatement":
      if (parent.test === node) {
        return sourceCode.getFirstToken(parent, {
          includeComments: false,
          skip: 1,
        })
      }
      return null

    case "ImportExpression":
      if (parent.source === node) {
        return sourceCode.getFirstToken(parent, {
          includeComments: false,
          skip: 1,
        })
      }
      return null

    case "SwitchStatement":
      if (parent.discriminant === node) {
        return sourceCode.getFirstToken(parent, {
          includeComments: false,
          skip: 1,
        })
      }
      return null

    case "WithStatement":
      if (parent.object === node) {
        return sourceCode.getFirstToken(parent, {
          includeComments: false,
          skip: 1,
        })
      }
      return null

    default:
      return null
  }
}
