import type { TSESTree } from "@typescript-eslint/types"
import { AST_NODE_TYPES } from "@typescript-eslint/types"
import type { AST } from "astro-eslint-parser"
import { getStaticValue } from "eslint-utils"
import postcss from "postcss"
import parser from "postcss-selector-parser"
import type { RuleContext } from "../types"
import { createRule } from "../utils"
import {
  findAttribute,
  getElementName,
  getSpreadAttributes,
  getStaticAttributeStringValue,
} from "../utils/ast-utils"
import type { StyleContentCSS } from "../utils/transform"
import { getStyleContentCSS } from "../utils/transform"

type JSXElementTreeNode = {
  parent: JSXElementTreeNode | RootJSXElementTreeNode
  node: AST.JSXElement
  childElements: JSXElementTreeNode[]
}
type RootJSXElementTreeNode = {
  parent?: null
  node: null
  childElements: JSXElementTreeNode[]
}

export default createRule("no-unused-css-selector", {
  meta: {
    docs: {
      description:
        "disallow selectors defined in `style` tag that don't use in HTML",
      category: "Possible Errors",
      recommended: true,
      default: "warn",
    },
    schema: [],
    messages: {
      unused: "Unused CSS selector `{{selector}}`",
    },
    type: "problem",
  },
  create(context) {
    if (!context.parserServices.isAstro) {
      return {}
    }
    const styles: AST.JSXElement[] = []
    const rootTree: RootJSXElementTreeNode = {
      parent: null,
      node: null,
      childElements: [],
    }
    const allTreeElements: JSXElementTreeNode[] = []
    let currTree: JSXElementTreeNode | RootJSXElementTreeNode = rootTree

    /** Verify for CSS */
    function verifyCSS(css: StyleContentCSS) {
      let root
      try {
        root = postcss.parse(css.css)
      } catch (e) {
        return
      }
      root.walkRules((rule) => {
        const raws = rule.raws
        const rawSelectorText = raws.selector
          ? raws.selector.raw
          : rule.selector
        for (const selector of parseSelector(rawSelectorText, context)) {
          if (selector.error) {
            continue
          }
          if (allTreeElements.some((tree) => selector.test(tree))) {
            continue
          }
          reportSelector(
            rule.source!.start!.offset + selector.offset,
            selector.selector,
          )
        }
      })

      /** Report selector */
      function reportSelector(start: number, selector: string) {
        const remapStart = css.remap(start)
        const remapEnd = css.remap(start + selector.length)
        const sourceCode = context.getSourceCode()
        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(remapStart),
            end: sourceCode.getLocFromIndex(remapEnd),
          },
          messageId: "unused",
          data: {
            selector,
          },
        })
      }
    }

    return {
      JSXElement(node) {
        const name = getElementName(node)
        if (name === "Fragment") {
          return
        }
        if (name === "style" && !findAttribute(node, "is:global")) {
          styles.push(node)
        }
        const tree: JSXElementTreeNode = {
          parent: currTree,
          node,
          childElements: [],
        }
        allTreeElements.unshift(tree)
        currTree.childElements.push(tree)
        currTree = tree
      },
      "JSXElement:exit"(node) {
        if (currTree.node === node) {
          const parent = currTree.parent
          const name = getElementName(node)
          if (name === "slot") {
            const slotChildElements = currTree.childElements.map(
              (e): JSXElementTreeNode => {
                return {
                  ...e,
                  parent,
                }
              },
            )
            ;(parent?.childElements ?? allTreeElements).push(
              ...slotChildElements,
            )
          }
          currTree = currTree.parent
        }
      },
      "Program:exit"() {
        for (const style of styles) {
          const css = getStyleContentCSS(style, context)
          if (css) {
            verifyCSS(css)
          }
        }
      },
    }
  },
})

type JSXElementSelector = {
  error?: unknown
  selector: string
  offset: number
  test: (element: JSXElementTreeNode) => boolean
}
class SelectorError extends Error {}

type JSXElementMatcher = (
  element: JSXElementTreeNode,
  subject: JSXElementTreeNode | null,
) => boolean
type ChildNode = Exclude<
  parser.Selector["nodes"][number],
  { type: "comment" | "root" }
>

/**
 * Parses CSS selectors and returns an object with a function that tests JSXElement.
 */
function parseSelector(
  selector: string,
  context: RuleContext,
): JSXElementSelector[] {
  let astSelector
  try {
    astSelector = parser().astSync(selector)
  } catch (error) {
    return [
      {
        error,
        selector,
        offset: 0,
        test: () => false,
      },
    ]
  }

  return astSelector.nodes.map((sel) => {
    const nodes = cleanSelectorChildren(sel)
    if (nodes.some(isGlobalPseudo)) {
      // Remove :global selector
      // e.g.
      // `.foo > :global(.bar)` -> `.foo`
      // `:global(.foo) > .bar` -> `.bar`
      // `.foo > .bar :global(.baz)` -> `.foo > .bar`
      while (
        nodes[nodes.length - 1] &&
        isGlobalPseudo(nodes[nodes.length - 1])
      ) {
        nodes.pop()
        if (nodes[nodes.length - 1]?.type === "combinator") {
          nodes.pop()
        }
      }

      while (nodes[0] && isGlobalPseudo(nodes[0])) {
        nodes.shift()
        if (nodes[0]?.type === "combinator") {
          nodes.shift()
        }
      }
    }
    if (nodes.some(isRootPseudo)) {
      // Remove :root selector
      // e.g.
      // `:root.foo > .bar` -> `.bar`
      let node = nodes.shift()
      while (node && !isRootPseudo(node)) {
        node = nodes.shift()
      }
      while (nodes[0]?.type !== "combinator") {
        nodes.shift()
      }
      nodes.shift()
    }
    try {
      const test = selectorToJSXElementMatcher(nodes, context)

      return {
        selector: sel.toString().trim(),
        offset: sel.sourceIndex ?? sel.nodes[0].sourceIndex,
        test(element) {
          return test(element, null)
        },
      }
    } catch (error) {
      if (error instanceof SelectorError) {
        return {
          error,
          selector: sel.toString().trim(),
          offset: sel.sourceIndex ?? sel.nodes[0].sourceIndex,
          test: () => false,
        }
      }
      throw error
    }
  })
}

/**
 * Convert nodes to JSXElementMatcher
 * @param {parser.Selector[]} selectorNodes
 * @returns {JSXElementMatcher}
 */
function selectorsToJSXElementMatcher(
  selectorNodes: parser.Selector[],
  context: RuleContext,
): JSXElementMatcher {
  const selectors = selectorNodes.map((n) =>
    selectorToJSXElementMatcher(cleanSelectorChildren(n), context),
  )
  return (element, subject) => selectors.some((sel) => sel(element, subject))
}

/**
 * @param {parser.Node|null} node
 * @returns {node is parser.Combinator}
 */
function isDescendantCombinator(
  node: parser.Node | null,
): node is parser.Combinator {
  return Boolean(node && node.type === "combinator" && !node.value.trim())
}

/**
 * Clean and get the selector child nodes.
 * @param {parser.Selector} selector
 * @returns {ChildNode[]}
 */
function cleanSelectorChildren(selector: parser.Selector): ChildNode[] {
  const nodes: ChildNode[] = []
  let last: ChildNode | null = null
  for (const node of selector.nodes) {
    if (node.type === "root") {
      throw new SelectorError("Unexpected state type=root")
    }
    if (node.type === "comment") {
      continue
    }
    if (
      (last == null || last.type === "combinator") &&
      isDescendantCombinator(node)
    ) {
      // Ignore descendant combinator
      continue
    }
    if (isDescendantCombinator(last) && node.type === "combinator") {
      // Replace combinator
      nodes.pop()
    }
    nodes.push(node)
    last = node
  }
  if (isDescendantCombinator(last)) {
    nodes.pop()
  }
  return nodes
}

/**
 * Convert Selector child nodes to JSXElementMatcher
 * @param {ChildNode[]} selectorChildren
 * @returns {JSXElementMatcher}
 */
function selectorToJSXElementMatcher(
  selectorChildren: ChildNode[],
  context: RuleContext,
): JSXElementMatcher {
  const nodes = [...selectorChildren]
  let node = nodes.shift()
  let result: JSXElementMatcher | null = null
  while (node) {
    if (node.type === "combinator") {
      const combinator = node.value
      node = nodes.shift()
      if (!node) {
        throw new SelectorError(`Expected selector after '${combinator}'.`)
      }
      if (node.type === "combinator") {
        throw new SelectorError(`Unexpected combinator '${node.value}'.`)
      }
      const right = nodeToJSXElementMatcher(node, context)
      result = combination(
        result ||
          // for :has()
          ((element, subject) => element === subject),
        combinator,
        right,
      )
    } else {
      const sel = nodeToJSXElementMatcher(node, context)
      result = result ? compound(result, sel) : sel
    }
    node = nodes.shift()
  }
  if (!result) {
    return () => true
  }
  return result
}

/**
 * @param {JSXElementMatcher} left
 * @param {string} combinator
 * @param {JSXElementMatcher} right
 * @returns {JSXElementMatcher}
 */
function combination(
  left: JSXElementMatcher,
  combinator: string,
  right: JSXElementMatcher,
): JSXElementMatcher {
  switch (combinator.trim()) {
    case "":
      // descendant
      return (element, subject) => {
        if (right(element, null)) {
          let parent = element.parent
          while (parent.node) {
            if (left(parent, subject)) {
              return true
            }
            parent = parent.parent
          }
        }
        return false
      }
    case ">":
      // child
      return (element, subject) => {
        if (right(element, null)) {
          const parent = element.parent
          if (parent.node) {
            return left(parent, subject)
          }
        }
        return false
      }
    case "+":
      // adjacent
      return (element, subject) => {
        if (right(element, null)) {
          const before = getBeforeElement(element)
          if (before) {
            return left(before, subject)
          }
        }
        return false
      }
    case "~":
      // sibling
      return (element, subject) => {
        if (right(element, null)) {
          for (const before of getBeforeElements(element)) {
            if (left(before, subject)) {
              return true
            }
          }
        }
        return false
      }
    default:
      throw new SelectorError(`Unknown combinator: ${combinator}.`)
  }
}

/**
 * Convert node to JSXElementMatcher
 * @param {Exclude<parser.Node, {type:'combinator'|'comment'|'root'|'selector'}>} selector
 * @returns {JSXElementMatcher}
 */
function nodeToJSXElementMatcher(
  selector: Exclude<
    parser.Node,
    { type: "combinator" | "comment" | "root" | "selector" }
  >,
  context: RuleContext,
): JSXElementMatcher {
  switch (selector.type) {
    case "attribute":
      return attributeNodeToJSXElementMatcher(selector, context)
    case "class":
      return classNameNodeToJSXElementMatcher(selector, context)
    case "id":
      return identifierNodeToJSXElementMatcher(selector, context)
    case "tag":
      return tagNodeToJSXElementMatcher(selector)
    case "universal":
      return universalNodeToJSXElementMatcher(selector)
    case "pseudo":
      return pseudoNodeToJSXElementMatcher(selector, context)
    case "nesting":
      throw new SelectorError("Unsupported nesting selector.")
    case "string":
      throw new SelectorError(`Unknown selector: ${selector.value}.`)
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
      throw new SelectorError(`Unknown selector: ${(selector as any).value}.`)
  }
}

/**
 * Convert Attribute node to JSXElementMatcher
 * @param {parser.Attribute} selector
 * @returns {JSXElementMatcher}
 */
function attributeNodeToJSXElementMatcher(
  selector: parser.Attribute,
  context: RuleContext,
): JSXElementMatcher {
  const key = selector.attribute
  if (!selector.operator) {
    return (element, _) => {
      if (isComponent(element)) {
        // It is unknown if the component has attributes, so it is considered a match.
        return true
      }
      return hasAttribute(element, key, context)
    }
  }
  const value = selector.value || ""

  switch (selector.operator) {
    case "=":
      return buildJSXElementMatcher(value, (attr, val) => attr === val)
    case "~=":
      // words
      return buildJSXElementMatcher(value, (attr, val) =>
        attr.split(/\s+/u).includes(val),
      )
    case "|=":
      // immediately followed by hyphen
      return buildJSXElementMatcher(
        value,
        (attr, val) => attr === val || attr.startsWith(`${val}-`),
      )
    case "^=":
      // prefixed
      return buildJSXElementMatcher(value, (attr, val) => attr.startsWith(val))
    case "$=":
      // suffixed
      return buildJSXElementMatcher(value, (attr, val) => attr.endsWith(val))
    case "*=":
      // contains
      return buildJSXElementMatcher(value, (attr, val) => attr.includes(val))
    default:
      throw new SelectorError(`Unsupported operator: ${selector.operator}.`)
  }

  /**
   * @param {string} selectorValue
   * @param {(attrValue:string, selectorValue: string)=>boolean} test
   * @returns {JSXElementMatcher}
   */
  function buildJSXElementMatcher(
    selectorValue: string,
    test: (attrValue: string, selectorValue: string) => boolean,
  ): JSXElementMatcher {
    const val = selector.insensitive
      ? selectorValue.toLowerCase()
      : selectorValue
    return (element) => {
      if (isComponent(element)) {
        // It is unknown if the component has attributes, so it is considered a match.
        return true
      }
      const attr = getAttribute(element, key, context)
      if (attr == null) {
        return false
      }
      if (attr.unknown || !attr.staticValue) {
        // It is unknown attribute value, so it is considered a match.
        return true
      }
      const attrValue = attr.staticValue.value
      return test(
        selector.insensitive ? attrValue.toLowerCase() : attrValue,
        val,
      )
    }
  }
}

/**
 * Convert ClassName node to JSXElementMatcher
 * @param {parser.ClassName} selector
 * @returns {JSXElementMatcher}
 */
function classNameNodeToJSXElementMatcher(
  selector: parser.ClassName,
  context: RuleContext,
): JSXElementMatcher {
  const className = selector.value
  return (element) => {
    if (isComponent(element)) {
      // It is unknown if the component has attributes, so it is considered a match.
      return true
    }
    const attr = getAttribute(element, "class", context)
    if (attr == null) {
      return false
    }
    if (attr.unknown || !attr.staticValue) {
      // It is unknown attribute value, so it is considered a match.
      return true
    }
    const attrValue = attr.staticValue.value
    return attrValue.split(/\s+/u).includes(className)
  }
}

/**
 * Convert Identifier node to JSXElementMatcher
 * @param {parser.Identifier} selector
 * @returns {JSXElementMatcher}
 */
function identifierNodeToJSXElementMatcher(
  selector: parser.Identifier,
  context: RuleContext,
): JSXElementMatcher {
  const id = selector.value
  return (element) => {
    if (isComponent(element)) {
      // It is unknown if the component has attributes, so it is considered a match.
      return true
    }
    const attr = getAttribute(element, "id", context)
    if (attr == null) {
      return false
    }
    if (attr.unknown || !attr.staticValue) {
      // It is unknown attribute value, so it is considered a match.
      return true
    }
    const attrValue = attr.staticValue.value
    return attrValue === id
  }
}

/**
 * Convert Tag node to JSXElementMatcher
 * @param {parser.Tag} selector
 * @returns {JSXElementMatcher}
 */
function tagNodeToJSXElementMatcher(selector: parser.Tag): JSXElementMatcher {
  const name = selector.value
  return (element) => {
    if (isComponent(element)) {
      // It is unknown if the component has attributes, so it is considered a match.
      return true
    }
    const elementName = getElementName(element.node)
    return elementName === name
  }
}

/**
 * Convert Universal node to JSXElementMatcher
 * @param {parser.Universal} _selector
 * @returns {JSXElementMatcher}
 */
function universalNodeToJSXElementMatcher(
  _selector: parser.Universal,
): JSXElementMatcher {
  return () => true
}

/**
 * Convert Pseudo node to JSXElementMatcher
 * @param {parser.Pseudo} selector
 * @returns {JSXElementMatcher}
 */
function pseudoNodeToJSXElementMatcher(
  selector: parser.Pseudo,
  context: RuleContext,
): JSXElementMatcher {
  const pseudo = selector.value
  switch (pseudo) {
    case ":is":
    case ":where":
      // https://developer.mozilla.org/en-US/docs/Web/CSS/:is
      // https://developer.mozilla.org/en-US/docs/Web/CSS/:where
      return selectorsToJSXElementMatcher(selector.nodes, context)
    case ":has":
      // https://developer.mozilla.org/en-US/docs/Web/CSS/:has
      return pseudoHasSelectorsToJSXElementMatcher(selector.nodes, context)
    case ":empty":
      // https://developer.mozilla.org/en-US/docs/Web/CSS/:empty
      return (element) =>
        element.node.children.every(
          (child) =>
            (child.type === "JSXText" && !child.value.trim()) ||
            child.type === "AstroHTMLComment",
        )
    // https://docs.astro.build/en/guides/styling/#global-styles
    case ":global": {
      return () => true
    }

    default:
      // unknown
      return () => true
  }
}

/**
 * Convert :has() selector nodes to JSXElementMatcher
 * @param {parser.Selector[]} selectorNodes
 * @returns {JSXElementMatcher}
 */
function pseudoHasSelectorsToJSXElementMatcher(
  selectorNodes: parser.Selector[],
  context: RuleContext,
): JSXElementMatcher {
  const selectors = selectorNodes.map((n) =>
    pseudoHasSelectorToJSXElementMatcher(n, context),
  )
  return (element, subject) => selectors.some((sel) => sel(element, subject))
}

/**
 * Convert :has() selector node to JSXElementMatcher
 * @param {parser.Selector} selector
 * @returns {JSXElementMatcher}
 */
function pseudoHasSelectorToJSXElementMatcher(
  selector: parser.Selector,
  context: RuleContext,
): JSXElementMatcher {
  const nodes = cleanSelectorChildren(selector)
  const selectors = selectorToJSXElementMatcher(nodes, context)
  const firstNode = nodes[0]
  if (
    firstNode.type === "combinator" &&
    (firstNode.value === "+" || firstNode.value === "~")
  ) {
    // adjacent or sibling
    return buildJSXElementMatcher((element) => getAfterElements(element))
  }
  // descendant or child
  return buildJSXElementMatcher((element) => element.childElements)

  /**
   * @param {(element: JSXElementTreeNode) => JSXElementTreeNode[]} getStartElements
   * @returns {JSXElementMatcher}
   */
  function buildJSXElementMatcher(
    getStartElements: (element: JSXElementTreeNode) => JSXElementTreeNode[],
  ): JSXElementMatcher {
    return (element) => {
      const elements = [...getStartElements(element)]
      let curr: JSXElementTreeNode | undefined
      while ((curr = elements.shift())) {
        const el = curr
        if (selectors(el, element)) {
          return true
        }
        elements.push(...el.childElements)
      }
      return false
    }
  }
}

/**
 * @param {JSXElementTreeNode} element
 */
function getBeforeElement(element: JSXElementTreeNode) {
  return getBeforeElements(element).pop() || null
}

/**
 * @param {JSXElementTreeNode} element
 */
function getBeforeElements(element: JSXElementTreeNode) {
  const parent = element.parent
  if (!parent) {
    return []
  }
  const index = parent.childElements.indexOf(element)
  return parent.childElements.slice(0, index)
}

/**
 * @param {JSXElementTreeNode} element
 */
function getAfterElements(element: JSXElementTreeNode) {
  const parent = element.parent
  if (!parent) {
    return []
  }
  const index = parent.childElements.indexOf(element)
  return parent.childElements.slice(index + 1)
}

/**
 * @param {JSXElementMatcher} a
 * @param {JSXElementMatcher} b
 * @returns {JSXElementMatcher}
 */
function compound(
  a: JSXElementMatcher,
  b: JSXElementMatcher,
): JSXElementMatcher {
  return (element, subject) => a(element, subject) && b(element, subject)
}

/**
 * Checks whether the given element is component.
 */
function isComponent(element: JSXElementTreeNode) {
  const elementName = getElementName(element.node)
  return elementName == null || elementName.toLowerCase() !== elementName
}

/**
 * Checks whether the given node is :global.
 */
function isGlobalPseudo(node: ChildNode) {
  // https://docs.astro.build/en/guides/styling/#global-styles
  return node.type === "pseudo" && node.value === ":global"
}

/**
 * Checks whether the given node is :root.
 */
function isRootPseudo(node: ChildNode) {
  return node.type === "pseudo" && node.value === ":root"
}

/**
 * Checks whether the given element has the given attribute.
 * @param {JSXElementTreeNode} element The element node.
 * @param {string} attribute The attribute name.
 */
function hasAttribute(
  element: JSXElementTreeNode,
  attribute: string,
  context: RuleContext,
) {
  const attr = getAttribute(element, attribute, context)
  if (attr) {
    return true
  }
  return false
}

/**
 * Get attribute from given element.
 * @param {JSXElementTreeNode} element The element node.
 * @param {string} attribute The attribute name.
 */
function getAttribute(
  element: JSXElementTreeNode,
  attribute: string,
  context: RuleContext,
):
  | {
      unknown: false
      hasAttr: boolean
      staticValue: { value: string } | null
    }
  | {
      unknown: true
    }
  | null {
  const attr = findAttribute(element.node, attribute)
  if (attr) {
    if (attr.value == null) {
      return {
        unknown: false,
        hasAttr: true,
        staticValue: { value: "" },
      }
    }
    const value = getStaticAttributeStringValue(attr, context)
    if (value == null) {
      return {
        unknown: false,
        hasAttr: true,
        staticValue: null,
      }
    }
    return {
      unknown: false,
      hasAttr: true,
      staticValue: { value },
    }
  }

  if (attribute === "class") {
    const result = getClassListAttribute(element, context)
    if (result) {
      return result
    }
  }

  const spreadAttributes = getSpreadAttributes(element.node)
  if (spreadAttributes.length === 0) {
    return null
  }

  return {
    unknown: true,
  }
}

/**
 * Get class:list attribute from given element.
 * @param {JSXElementTreeNode} element The element node.
 */
function getClassListAttribute(
  element: JSXElementTreeNode,
  context: RuleContext,
):
  | {
      unknown: false
      hasAttr: boolean
      staticValue: { value: string } | null
    }
  | {
      unknown: true
    }
  | null {
  const attr = findAttribute(element.node, "class:list")
  if (attr) {
    if (attr.value == null) {
      return {
        unknown: false,
        hasAttr: true,
        staticValue: { value: "" },
      }
    }
    const classList = extractClassList(attr, context)
    if (classList === null) {
      return {
        unknown: false,
        hasAttr: true,
        staticValue: null,
      }
    }
    return {
      unknown: false,
      hasAttr: true,
      staticValue: { value: classList.classList.join(" ") },
    }
  }

  return null
}

/** Extract class:list class names */
function extractClassList(
  node:
    | AST.JSXAttribute
    | AST.AstroTemplateLiteralAttribute
    | AST.AstroShorthandAttribute,
  context: RuleContext,
): { classList: string[] } | null {
  if (node.value?.type === AST_NODE_TYPES.Literal) {
    return { classList: [String(node.value.value)] }
  }
  if (
    node.value?.type === "JSXExpressionContainer" &&
    node.value.expression.type !== "JSXEmptyExpression"
  ) {
    const classList: string[] = []
    for (const className of extractClassListFromExpression(
      node.value.expression,
      context,
    )) {
      if (className == null) {
        return null
      }
      classList.push(className)
    }
    return { classList }
  }

  return null
}

/** Extract class:list class names */
function* extractClassListFromExpression(
  node: TSESTree.Expression,
  context: RuleContext,
): Iterable<string | null> {
  if (node.type === AST_NODE_TYPES.ArrayExpression) {
    for (const element of node.elements) {
      if (element == null) continue
      if (element.type === AST_NODE_TYPES.SpreadElement) {
        yield* extractClassListFromExpression(element.argument, context)
      } else {
        yield* extractClassListFromExpression(element, context)
      }
    }
    return
  }
  if (node.type === AST_NODE_TYPES.ObjectExpression) {
    for (const prop of node.properties) {
      if (prop.type === AST_NODE_TYPES.SpreadElement) {
        yield* extractClassListFromExpression(prop.argument, context)
      } else {
        if (!prop.computed) {
          if (prop.key.type === AST_NODE_TYPES.Literal) {
            yield String(prop.key.value)
          } else {
            yield prop.key.name
          }
        } else {
          yield* extractClassListFromExpression(prop.key, context)
        }
      }
    }
    return
  }
  const staticValue = getStaticValue(
    node as never,
    context.getSourceCode().scopeManager.globalScope!,
  )
  if (staticValue) {
    yield* extractClassListFromUnknown(staticValue.value)
    return
  }

  yield null
}

/** Extract class:list class names */
function* extractClassListFromUnknown(value: unknown): Iterable<string | null> {
  if (!value) {
    return
  }
  if (Array.isArray(value)) {
    for (const e of value) {
      yield* extractClassListFromUnknown(e)
    }
    return
  }
  if (typeof value === "object") {
    yield* Object.keys(value)
    return
  }
  yield String(value)
}
