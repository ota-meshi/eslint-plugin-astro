import type { AST } from "astro-eslint-parser"
import { parse, parseFragment, type DefaultTreeAdapterTypes } from "parse5"
import { createRule } from "../utils/index.ts"
import type { RuleModule } from "../types.ts"

type Parse5Element = DefaultTreeAdapterTypes.Element
type Parse5Node = DefaultTreeAdapterTypes.Node
type Parse5ChildNode = DefaultTreeAdapterTypes.ChildNode
type Parse5DocumentFragment = DefaultTreeAdapterTypes.DocumentFragment

type TemplateStack = {
  node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment
  html: string
  range: AST.Range
  upper: TemplateStack | null
}

type OmittedEndTag = {
  children: OmittedEndTag[]
  insertIndex: number
  nameRange: AST.Range
  parent: OmittedEndTag | null
  tagName: string
}

const htmlVoidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
])

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-omitted-end-tags", {
  meta: {
    docs: {
      description: "disallow omitted end tags",
      category: "Stylistic Issues",
      recommended: true,
    },
    schema: [],
    messages: {
      missing: "Expected an end tag for `<{{tagName}}>`.",
    },
    type: "layout",
    fixable: "code",
  },
  create(context) {
    const sourceCode = context.sourceCode
    if (!sourceCode.parserServices?.isAstro) {
      return {}
    }

    const rootAstroFragment = sourceCode.ast.body.find(
      (node): node is AST.AstroFragment => node.type === "AstroFragment",
    )

    let templateStack: TemplateStack | null = null

    /** Check whether this node belongs to the Astro template body. */
    function isInTemplate(node: { range: AST.Range }) {
      return (
        rootAstroFragment != null &&
        containsRange(rootAstroFragment.range, node.range)
      )
    }

    /** Check whether this node should be parsed independently by parse5. */
    function isRoot(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ) {
      if (!isInTemplate(node)) return false
      if (node.type === "AstroFragment" || node.type === "JSXFragment") {
        // Fragment delimiters are not HTML. Give every fragment its own target,
        // including nested fragments, so parse5 only sees the fragment children.
        return true
      }
      if (isHtmlIntegrationPoint(node)) {
        // `foreignObject` is an SVG HTML integration point. Parse its children
        // separately while keeping the wrapper in the SVG target.
        return true
      }
      const parent = node.parent
      // A JSX element whose parent is an expression node is not guaranteed to
      // be rendered at this source position. Parse it as an isolated target
      // instead of letting it affect the surrounding Astro template.
      return (
        parent != null &&
        parent.type !== "JSXElement" &&
        parent.type !== "JSXFragment" &&
        parent.type !== "AstroFragment"
      )
    }

    /** Hide the node from parse5 while preserving offsets and line breaks. */
    function mask(
      node:
        | AST.AstroRawText
        | AST.AstroShorthandAttribute
        | AST.AstroTemplateLiteralAttribute
        | AST.JSXExpressionContainer
        | AST.JSXSpreadAttribute
        | AST.JSXSpreadChild
        | AST.JSXElement
        | AST.JSXFragment
        | AST.AstroFragment
        | AST.AstroHTMLComment
        | AST.JSXText,
    ) {
      if (!templateStack) {
        return
      }
      const maskStart = node.range[0] - templateStack.range[0]
      const maskEnd = node.range[1] - templateStack.range[0]

      templateStack.html = `${templateStack.html.slice(0, maskStart)}${templateStack.html
        .slice(maskStart, maskEnd)
        // AST ranges are UTF-16 offsets. With the Unicode flag, a match may be
        // a surrogate pair, so preserve its code-unit length when masking.
        .replace(/[^\n\r]/gu, (char) =>
          " ".repeat(char.length),
        )}${templateStack.html.slice(maskEnd)}`
    }

    /** Add a same-length source replacement for the parse5 input. */
    function replaceName(
      nameNode: AST.JSXTagNameExpression,
      replacement: string,
    ) {
      if (!templateStack) {
        return
      }
      const replaceStart = nameNode.range[0] - templateStack.range[0]
      const replaceEnd = nameNode.range[1] - templateStack.range[0]
      templateStack.html = `${templateStack.html.slice(0, replaceStart)}${
        replacement
      }${templateStack.html.slice(replaceEnd)}`
    }

    /** Check whether parse5 would treat Astro self-closing syntax as unclosed HTML. */
    function isNonVoidSelfClosingElement(node: AST.JSXElement) {
      if (!isSyntaxSelfClosingElement(node)) return false
      const name = node.openingElement.name
      if (name.type !== "JSXIdentifier") return false
      return !isHtmlVoidElementName(name.name)
    }

    /** Check whether the original opening tag uses `/>`. */
    function isSyntaxSelfClosingElement(node: AST.JSXElement) {
      return isSelfClosingStartTag(
        sourceCode.text.slice(
          node.openingElement.range[0],
          node.openingElement.range[1],
        ),
      )
    }

    /** Report one omitted end tag. */
    function reportOmittedEndTag(omittedEndTag: OmittedEndTag) {
      context.report({
        loc: {
          start: sourceCode.getLocFromIndex(omittedEndTag.nameRange[0]),
          end: sourceCode.getLocFromIndex(omittedEndTag.nameRange[1]),
        },
        messageId: "missing",
        data: { tagName: omittedEndTag.tagName },
        fix(fixer) {
          if (hasOmittedEndTagDescendantAtSameIndex(omittedEndTag)) {
            // The deepest report owns a shared insertion point and inserts the
            // whole end-tag chain. Skipping ancestor fixes avoids duplicate
            // edits at the same offset.
            return null
          }
          return fixer.insertTextBeforeRange(
            [omittedEndTag.insertIndex, omittedEndTag.insertIndex],
            buildEndTagsAtSameIndex(omittedEndTag),
          )
        },
      })
    }

    /** Check whether the source tag name is an HTML void element name. */
    function isHtmlVoidElementName(tagName: string) {
      return htmlVoidElements.has(tagName)
    }

    /** Check whether a JSX tag name collides with an HTML void tag in parse5. */
    function isVoidNamedJsxComponentName(tagName: string) {
      return (
        !isHtmlVoidElementName(tagName) &&
        htmlVoidElements.has(tagName.toLowerCase())
      )
    }

    /** Replace JSX component names that parse5 would otherwise treat as void HTML. */
    function replaceVoidNamedJsxComponent(node: AST.JSXElement) {
      const name = node.openingElement.name
      if (name.type !== "JSXIdentifier") return
      const tagName = name.name
      if (!isVoidNamedJsxComponentName(tagName)) {
        return
      }
      // parse5 lowercases tag names, so `<Input>` would become the void HTML
      // element `<input>` and never report a missing end tag. Use a same-length
      // non-void name in the parse input so offsets still point to the original.
      const replacement = toNonVoidTagName(tagName)
      replaceName(node.openingElement.name, replacement)
      const closingElement = node.closingElement
      if (closingElement && hasRealClosingElement(node)) {
        replaceName(closingElement.name, replacement)
      }
    }

    /** Check whether the closing element comes from source text. */
    function hasRealClosingElement(node: AST.JSXElement) {
      return (
        node.closingElement != null &&
        node.closingElement.range[0] < node.closingElement.range[1]
      )
    }

    /** Check whether this node should split HTML parsing inside SVG. */
    function isHtmlIntegrationPoint(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ): node is AST.JSXElement & {
      openingElement: {
        name: AST.JSXTagNameExpression & {
          type: "JSXIdentifier"
          name: "foreignObject"
        }
      }
    } {
      if (node.type !== "JSXElement") return false
      const name = node.openingElement.name
      if (name.type !== "JSXIdentifier") return false
      return hasRealClosingElement(node) && name.name === "foreignObject"
    }

    /** Get the source range containing only an element's children. */
    function getChildrenRange(node: AST.JSXElement): AST.Range {
      return [
        node.openingElement.range[1],
        hasRealClosingElement(node)
          ? node.closingElement!.range[0]
          : node.range[1],
      ]
    }

    /** Handle an entered template node. */
    function enterElement(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ) {
      if (isRoot(node)) {
        // The new target will be verified by itself. Hide it from the current
        // parent target first so expression JSX and nested fragments do not
        // influence the HTML structure around the place where they are written.
        if (!isHtmlIntegrationPoint(node)) {
          mask(node)
        } else {
          for (const child of node.children) {
            mask(child)
          }
        }

        const range = getTemplateHTMLRange(node)

        templateStack = {
          node,
          html: sourceCode.text.slice(range[0], range[1]),
          range,
          upper: templateStack,
        }
      }
    }

    /** Get the source range to parse as the current HTML target. */
    function getTemplateHTMLRange(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ): AST.Range {
      if (node.type === "JSXFragment") {
        // Parse only the fragment children. If the target covered the whole
        // `<>...</>` range, the JSX delimiters would have to be masked because
        // they are not HTML. Those trailing masked spaces after `two` make
        // parse5 place EOF after `</>`, so it may fix `<><p>one<p>two</>` as
        // `<><p>one</p><p>two</></p>`. Using the child range makes EOF line up
        // immediately before `</>`.
        return [node.openingFragment.range[1], node.closingFragment.range[0]]
      }
      if (isHtmlIntegrationPoint(node)) {
        return getChildrenRange(node)
      }
      return node.range
    }

    /** Verify a template node as its own parse5 target. */
    function exitElement(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ) {
      if (templateStack?.node === node) {
        verifyTarget(templateStack)
        templateStack = templateStack?.upper ?? null
      }
    }

    /** Verify one source range with parse5 and report omitted end tags. */
    function verifyTarget(currentStack: TemplateStack) {
      const omittedEndTags = collectOmittedEndTags({
        maskedHtml: currentStack.html,
        maskedHtmlRange: currentStack.range,
        parseAsDocument: currentStack.node === rootAstroFragment,
        originalText: sourceCode.text,
      })
      for (const omittedEndTag of omittedEndTags) {
        reportOmittedEndTag(omittedEndTag)
      }
    }

    return {
      AstroFragment: (node) => enterElement(node),
      "AstroFragment:exit": (node) => exitElement(node),
      JSXElement: (node) => {
        enterElement(node)
        if (isNonVoidSelfClosingElement(node)) {
          // Astro accepts self-closing syntax for any element, while HTML only
          // treats void elements as self-closing. If parse5 sees `<div />`, it
          // keeps a `<div>` element open and may report a missing `</div>` later
          // in the target. Since this Astro node cannot contain children, hide
          // the whole element from the parse input instead of letting the slash
          // change the surrounding structure.
          mask(node)
        } else {
          replaceVoidNamedJsxComponent(node)
        }
      },
      "JSXElement:exit": (node) => exitElement(node),
      JSXFragment: (node) => enterElement(node),
      "JSXFragment:exit": (node) => exitElement(node),

      // These nodes are Astro/JSX syntax, not HTML. They are masked only in the
      // current parse target; JSX elements or fragments inside expressions are
      // still visited separately and become their own parse targets via isRoot().
      AstroRawText: (node) => mask(node),
      AstroShorthandAttribute: (node) => mask(node),
      AstroTemplateLiteralAttribute: (node) => mask(node),
      JSXExpressionContainer: (node) => mask(node),
      JSXSpreadAttribute: (node) => mask(node),
      JSXSpreadChild: (node) => mask(node),
    }
  },
}) as RuleModule

/** Check whether the outer range contains the inner range. */
function containsRange(outer: AST.Range, inner: AST.Range) {
  return outer[0] <= inner[0] && inner[1] <= outer[1]
}

/** Collect omitted end tags using parse5's HTML tree construction. */
function collectOmittedEndTags({
  maskedHtml,
  maskedHtmlRange,
  parseAsDocument,
  originalText,
}: {
  maskedHtml: string
  maskedHtmlRange: AST.Range
  parseAsDocument: boolean
  originalText: string
}) {
  const document = parseAsDocument
    ? parse(maskedHtml, { sourceCodeLocationInfo: true })
    : parseFragment(maskedHtml, { sourceCodeLocationInfo: true })
  const omittedEndTags: OmittedEndTag[] = []

  /** Traverse the parse5 tree and keep omitted-tag ancestry for fixes. */
  function traverse(node: Parse5Node, parent: OmittedEndTag | null) {
    const omittedEndTag = getOmittedEndTag(
      node,
      originalText,
      maskedHtmlRange[0],
      parent,
    )
    const currentParent = omittedEndTag ?? parent
    if (omittedEndTag) {
      // When source such as `<ul><li><p>text` reaches EOF, parse5 omits
      // several end tags at the same source offset. Keeping the omitted parent
      // chain lets the deepest report insert `</p></li></ul>` in one fix.
      omittedEndTags.push(omittedEndTag)
      parent?.children.push(omittedEndTag)
    }

    if ("childNodes" in node) {
      for (const child of node.childNodes) {
        traverse(child, currentParent)
      }
    }
    if ("content" in node) {
      traverse(node.content, currentParent)
    }
  }

  traverse(document, null)
  return omittedEndTags
}

/** Get omitted end tag data for a parse5 node. */
function getOmittedEndTag(
  node: Parse5Node,
  text: string,
  baseOffset: number,
  parent: OmittedEndTag | null,
): OmittedEndTag | null {
  if (!isParse5Element(node)) {
    return null
  }

  const loc = node.sourceCodeLocation
  if (!loc?.startTag || loc.endTag) {
    return null
  }
  if (htmlVoidElements.has(node.tagName)) {
    return null
  }

  const startTagText = text.slice(
    baseOffset + loc.startTag.startOffset,
    baseOffset + loc.startTag.endOffset,
  )
  if (isSelfClosingStartTag(startTagText)) {
    // parse5 still exposes a start tag for non-void syntax like `<div />`,
    // but Astro has already closed that node. Do not turn self-closing Astro
    // syntax into an omitted-end-tag report.
    return null
  }

  const tagNameData = getRawTagName(startTagText)
  if (!tagNameData) {
    return null
  }

  const nameStart =
    baseOffset + loc.startTag.startOffset + tagNameData.startOffset
  // parse5 can report `endOffset: 0` for EOF-terminated RCDATA/RAWTEXT
  // elements such as `<textarea>hello`. If we used that value directly, the
  // fixer would insert `</textarea>` at the start of the file, so recover the
  // insertion point from the furthest source location in the subtree.
  const endOffset = getChildrenEndOffset(node) ?? loc.endOffset
  return {
    children: [],
    insertIndex: baseOffset + endOffset,
    nameRange: [nameStart, nameStart + tagNameData.tagName.length],
    parent,
    tagName: tagNameData.tagName,
  }
}

/** Check whether a parse5 node is an element. */
function isParse5Element(node: Parse5Node): node is Parse5Element {
  return "tagName" in node
}

/** Get the maximum end offset among the children of a parse5 element. */
function getChildrenEndOffset(
  node: Parse5Element | Parse5DocumentFragment,
): number | null {
  let endOffset: number | null = null
  for (const child of node.childNodes) {
    endOffset = max(endOffset, getSourceEndOffset(child))
  }
  return endOffset
}

/** Get the furthest source end offset in the parse5 subtree. */
function getSourceEndOffset(
  node: Parse5Element | Parse5ChildNode | Parse5DocumentFragment,
): number | null {
  let endOffset: number | null = null
  const loc = node.sourceCodeLocation
  if (loc) {
    endOffset = loc.endOffset
  }

  if ("childNodes" in node) {
    endOffset = max(endOffset, getChildrenEndOffset(node))
  }
  if ("content" in node) {
    endOffset = max(endOffset, getSourceEndOffset(node.content))
  }
  return endOffset
}

/** Check whether the original start tag used self-closing syntax. */
function isSelfClosingStartTag(startTagText: string) {
  return /\/\s*>$/u.test(startTagText)
}

/** Extract the original tag name and its offset within the start tag. */
function getRawTagName(startTagText: string) {
  const beforeName = /^<\s*/u.exec(startTagText)?.[0]
  if (beforeName == null) {
    return null
  }
  const tagName = /^[^\s/>]+/u.exec(startTagText.slice(beforeName.length))?.[0]
  if (!tagName) {
    return null
  }
  return {
    startOffset: beforeName.length,
    tagName,
  }
}

/** Build a same-length tag name that parse5 will not treat as a void element. */
function toNonVoidTagName(tagName: string) {
  return `x${tagName.slice(1)}`
}

/** Check whether a descendant report owns the same insertion point. */
function hasOmittedEndTagDescendantAtSameIndex(omittedEndTag: OmittedEndTag) {
  for (const child of omittedEndTag.children) {
    if (child.insertIndex === omittedEndTag.insertIndex) {
      return true
    }
    if (hasOmittedEndTagDescendantAtSameIndex(child)) {
      return true
    }
  }
  return false
}

/** Build the end-tag chain owned by the deepest report at this offset. */
function buildEndTagsAtSameIndex(omittedEndTag: OmittedEndTag) {
  const endTags = [`</${omittedEndTag.tagName}>`]
  for (
    let parent = omittedEndTag.parent;
    parent && parent.insertIndex === omittedEndTag.insertIndex;
    parent = parent.parent
  ) {
    endTags.push(`</${parent.tagName}>`)
  }
  return endTags.join("")
}

/**
 * Get the maximum of two numbers, treating `null` as negative infinity.
 */
function max(a: number | null, b: number | null): number | null {
  if (a === null) return b
  if (b === null) return a
  return Math.max(a, b)
}
