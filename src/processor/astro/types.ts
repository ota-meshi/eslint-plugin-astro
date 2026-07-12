export type DiagnosticSeverity = "error" | "warning" | "information" | "hint"

export type DiagnosticLabel = {
  text: string | null
  start: number
  end: number
  line: number
  column: number
}

export type DiagnosticMessage = {
  severity: DiagnosticSeverity
  text: string
  hint?: string
  labels?: DiagnosticLabel[]
}

export type ParseResult = {
  ast: AstroRootNode
  diagnostics: DiagnosticMessage[]
}

export type LocatedNode = {
  start: number
  end: number
}

export type UnknownNode = LocatedNode & {
  type: unknown
}

export type ProgramNode = LocatedNode & {
  type: "Program"
  body: UnknownNode[]
}

export type AstroRootNode = LocatedNode & {
  type: "AstroRoot"
  frontmatter?: AstroFrontmatterNode
  body: UnknownNode[]
}

export type AstroFrontmatterNode = LocatedNode & {
  type: "AstroFrontmatter"
  program: ProgramNode
}

export type AstroScriptNode = LocatedNode & {
  type: "AstroScript"
  program: ProgramNode
}

export type JSXElementNode = LocatedNode & {
  type: "JSXElement"
  openingElement: JSXOpeningElementNode
  closingElement: JSXClosingElementNode | null
  children: UnknownNode[]
}

export type JSXOpeningElementNode = LocatedNode & {
  type: "JSXOpeningElement"
  name: JSXNameNode
  attributes: AttributeNode[]
  selfClosing: boolean
}

export type JSXClosingElementNode = LocatedNode & {
  type: "JSXClosingElement"
  name: JSXNameNode
}

export type JSXExpressionContainerNode = LocatedNode & {
  type: "JSXExpressionContainer"
  expression: UnknownNode
}

export type AttributeNode = JSXAttributeNode | JSXSpreadAttributeNode

export type JSXAttributeNode = LocatedNode & {
  type: "JSXAttribute"
  name: JSXNameNode
  value: JSXExpressionContainerNode | LiteralNode | null
}

export type JSXSpreadAttributeNode = LocatedNode & {
  type: "JSXSpreadAttribute"
  argument: LocatedNode
}

export type LiteralNode = LocatedNode & {
  type: "Literal"
  value: unknown
  raw?: string
}

export type JSXNameNode =
  JSXIdentifierNode | JSXMemberExpressionNode | JSXNamespacedNameNode

export type JSXIdentifierNode = LocatedNode & {
  type: "JSXIdentifier"
  name: string
}

export type JSXMemberExpressionNode = LocatedNode & {
  type: "JSXMemberExpression"
  object: JSXIdentifierNode | JSXMemberExpressionNode
  property: JSXIdentifierNode
}

export type JSXNamespacedNameNode = LocatedNode & {
  type: "JSXNamespacedName"
  namespace: JSXIdentifierNode
  name: JSXIdentifierNode
}
