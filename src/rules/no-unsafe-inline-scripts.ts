import type { AST } from "astro-eslint-parser"
import type { RuleContext, RuleModule } from "../types"
import { createRule } from "../utils"
import {
  findAttribute,
  getAttributeName,
  getElementName,
  getStaticAttributeStringValue,
} from "../utils/ast-utils"
import { getSourceCode } from "../utils/compat"

type ScriptAttribute =
  | AST.JSXAttribute
  | AST.AstroTemplateLiteralAttribute
  | AST.AstroShorthandAttribute

type ScriptAttributeOrSpread = ScriptAttribute | AST.JSXSpreadAttribute

type Options = [
  {
    allowDefineVars?: boolean
    allowModuleScripts?: boolean
    allowNonExecutingTypes?: string[]
    allowNonce?: boolean
  },
]

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-unsafe-inline-scripts", {
  meta: {
    docs: {
      description:
        "disallow inline `<script>` without `src` to encourage CSP-safe patterns",
      category: "Security Vulnerability",
      recommended: false,
      // default severity hint for docs renderers
      default: "warn",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowDefineVars: { type: "boolean" },
          allowModuleScripts: { type: "boolean" },
          allowNonExecutingTypes: {
            type: "array",
            items: { type: "string" },
          },
          allowNonce: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unexpected:
        "Unsafe inline <script> detected. Move code to an external file (use src) or a safer pattern.",
    },
    type: "suggestion",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }

    // Option flags (with defaults)
    const options = (context.options[0] ?? {}) as Options[0]
    const allowDefineVars = options.allowDefineVars === true
    const allowModuleScripts = options.allowModuleScripts === true
    const allowNonExecutingTypes = new Set(
      (
        options.allowNonExecutingTypes ?? [
          "application/ld+json",
          "application/json",
        ]
      ).map((type) => type.trim().toLowerCase().split(";")[0].trim()),
    )
    const allowNonce = options.allowNonce === true

    return {
      JSXElement(node) {
        const name = getElementName(node)
        if (name !== "script") return

        if (!isInlineScript(node)) return

        // Allow known-safe non-executing MIME types
        const typeAttr = findAttribute(node, "type")
        if (isAllowedByType(typeAttr, context, allowNonExecutingTypes)) return

        // Optionally allow inline module scripts
        if (isModuleScript(typeAttr, context, allowModuleScripts)) return

        const attrs = node.openingElement.attributes
        // Optionally allow inline scripts when define:vars used
        if (isDefineVars(attrs, allowDefineVars)) return
        // Optionally allow inline scripts with CSP nonce
        if (allowNonce && hasNonce(attrs)) return

        // Otherwise, report inline script
        const reportTarget = node.openingElement.name
        context.report({
          node: reportTarget,
          messageId: "unexpected",
        })
      },
    }
  },
}) as RuleModule

/**
 * Normalize a MIME type string by trimming, lowercasing, and dropping parameters.
 */
function normalizeMimeType(value: unknown): string | null {
  if (!value) return null
  return String(value).trim().toLowerCase().split(";")[0].trim()
}

/**
 * Determine if the provided type attribute is listed in the allowed MIME type set.
 */
function isAllowedByType(
  attr: ScriptAttribute | null,
  context: RuleContext,
  allowedTypes: ReadonlySet<string>,
): boolean {
  if (!attr) return false
  const value = getStaticAttributeStringValue(attr, context)
  if (!value) return false
  const normalizedType = normalizeMimeType(value)
  return normalizedType != null && allowedTypes.has(normalizedType)
}

/**
 * Check whether inline scripts with define:vars should be treated as allowed.
 */
function isDefineVars(
  attrs: ScriptAttributeOrSpread[],
  allowDefineVars: boolean,
): boolean {
  if (!allowDefineVars) return false
  for (const attr of attrs) {
    if (attr.type === "JSXSpreadAttribute") continue
    if (getAttributeName(attr) === "define:vars") return true
  }
  return false
}

/**
 * Verify if the script's type attribute qualifies as an allowed module script.
 */
function isModuleScript(
  attr: ScriptAttribute | null,
  context: RuleContext,
  allowModuleScripts: boolean,
): boolean {
  if (!allowModuleScripts) return false
  if (!attr) return false
  const value = getStaticAttributeStringValue(attr, context)
  return normalizeMimeType(value) === "module"
}

/**
 * Detect the presence of a nonce attribute to satisfy CSP allowances.
 */
function hasNonce(attrs: ScriptAttributeOrSpread[]): boolean {
  for (const attr of attrs) {
    if (attr.type === "JSXSpreadAttribute") continue
    if (getAttributeName(attr) === "nonce") return true
  }
  return false
}

/**
 * Determine if a <script> element is inline by checking for the absence of src.
 */
function isInlineScript(node: AST.JSXElement): boolean {
  const srcAttr = findAttribute(node, "src")
  if (srcAttr) return false
  return true
}
