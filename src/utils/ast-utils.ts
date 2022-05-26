import type { AST } from "astro-eslint-parser"
import type { TSESTree } from "@typescript-eslint/types"
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
