import type { AST } from "astro-eslint-parser"
import { parse, parseFragment, type DefaultTreeAdapterTypes } from "parse5"
import { createRule } from "../utils/index.ts"
import type { RuleModule } from "../types.ts"

type Parse5Element = DefaultTreeAdapterTypes.Element
type Parse5Node = DefaultTreeAdapterTypes.Node

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

    /** Check whether this node should start its own parse target. */
    function isRoot(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ) {
      if (node.type === "AstroFragment" || node.type === "JSXFragment") {
        // Fragments are template boundaries, even when their parent is another fragment.
        return isInTemplate(node)
      }
      const parent = node.parent
      return (
        isInTemplate(node) &&
        parent != null &&
        parent.type !== "JSXElement" &&
        parent.type !== "JSXFragment" &&
        parent.type !== "AstroFragment"
      )
    }

    /** Add the range to the list of ranges hidden from parse5. */
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
        | AST.AstroFragment,
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
      return (
        isSyntaxSelfClosingElement(node) &&
        !isHtmlVoidElementName(sourceCode.getText(node.openingElement.name))
      )
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
      const tagName = sourceCode.getText(node.openingElement.name)
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

    /** Check whether the element has a real closing tag in the source. */
    function hasRealClosingElement(node: AST.JSXElement) {
      return (
        node.closingElement != null &&
        node.closingElement.range[0] < node.closingElement.range[1]
      )
    }

    /** Handle an entered template node. */
    function enterElement(
      node: AST.JSXElement | AST.JSXFragment | AST.AstroFragment,
    ) {
      if (isRoot(node)) {
        mask(node)

        const range: AST.Range =
          node.type === "JSXFragment"
            ? // Parse only the children. If the surrounding target merely masks
              // `<>` and `</>`, parse5 still sees one continuous HTML fragment
              // and may fix `<><p>one<p>two</>` as `<><p>one</p><p>two</></p>`.
              [node.openingFragment.range[1], node.closingFragment.range[0]]
            : node.range

        templateStack = {
          node,
          html: sourceCode.text.slice(range[0], range[1]),
          range,
          upper: templateStack,
        }
      }
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
          // Astro accepts self-closing syntax for any element, but HTML only
          // treats void elements as self-closing. If parse5 sees `<div />`,
          // it keeps a `<div>` element open and may report a missing `</div>`
          // later in the template. Since this syntax cannot contain children,
          // hide the whole element from the parent parse target.
          mask(node)
        } else {
          replaceVoidNamedJsxComponent(node)
        }
      },
      "JSXElement:exit": (node) => exitElement(node),
      JSXFragment: (node) => enterElement(node),
      "JSXFragment:exit": (node) => exitElement(node),

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

  /** Traverse the parse5 tree. */
  function traverse(node: Parse5Node, parent: OmittedEndTag | null) {
    const omittedEndTag = getOmittedEndTag(
      node,
      originalText,
      maskedHtmlRange[0],
      parent,
    )
    const currentParent = omittedEndTag ?? parent
    if (omittedEndTag) {
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
    return null
  }

  const tagNameData = getRawTagName(startTagText)
  if (!tagNameData) {
    return null
  }

  const nameStart =
    baseOffset + loc.startTag.startOffset + tagNameData.startOffset
  return {
    children: [],
    insertIndex: baseOffset + loc.endOffset,
    nameRange: [nameStart, nameStart + tagNameData.tagName.length],
    parent,
    tagName: tagNameData.tagName,
  }
}

/** Check whether a parse5 node is an element. */
function isParse5Element(node: Parse5Node): node is Parse5Element {
  return "tagName" in node
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

/** Check whether a child will insert end tags at the same offset. */
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

/** Build this element's end tag plus omitted ancestors at the same point. */
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
