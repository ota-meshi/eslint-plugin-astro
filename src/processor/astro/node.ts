import type {
  AstroFrontmatterNode,
  JSXClosingElementNode,
  JSXElementNode,
  JSXOpeningElementNode,
  UnknownNode,
} from "./types.ts"

/** Check whether the given node is a JSX element */
export function isJSXElement(node: UnknownNode): node is JSXElementNode {
  return node.type === "JSXElement"
}

/** Check whether the given node is a JSX opening element. */
export function isJSXOpeningElement(
  node: UnknownNode,
): node is JSXOpeningElementNode {
  return node.type === "JSXOpeningElement"
}

/** Check whether the given node is a JSX closing element. */
export function isJSXClosingElement(
  node: UnknownNode,
): node is JSXClosingElementNode {
  return node.type === "JSXClosingElement"
}

/** Check whether the given node is a walkable template node. */
export function isAstroFrontmatter(
  node: UnknownNode,
): node is AstroFrontmatterNode {
  return node.type === "AstroFrontmatter"
}
