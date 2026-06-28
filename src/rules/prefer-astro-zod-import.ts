import type { TSESTree } from "@typescript-eslint/types"
import { createRule } from "../utils/index.ts"
import type { RuleModule } from "../types.ts"

/** Source values whose direct replacement with `astro/zod` is API-compatible. */
const FIXABLE_SOURCES = new Set(["zod", "zod/v4", "zod/v4-mini"])

/** Returns `true` when the import source refers to the standalone Zod package. */
function isZodSource(value: unknown): value is string {
  return (
    typeof value === "string" && (value === "zod" || value.startsWith("zod/"))
  )
}

/**
 * Returns the given node when it is a string-valued `Literal`, otherwise `null`.
 * Dynamic sources we cannot statically resolve (template literals with
 * expressions, identifiers, calls, etc.) are intentionally skipped.
 */
function asStringLiteral(
  node: TSESTree.Node | null | undefined,
): TSESTree.StringLiteral | null {
  if (node && node.type === "Literal" && typeof node.value === "string") {
    return node
  }
  return null
}

/**
 * Resolves the string-literal source of a `TSImportType` across both
 * `@typescript-eslint/types` v7 (only `argument` is populated) and v8+
 * (the dedicated `source` field).
 */
function getTSImportTypeSource(
  node: TSESTree.TSImportType,
): TSESTree.StringLiteral | null {
  const v8Source = (
    node as TSESTree.TSImportType & { source?: TSESTree.StringLiteral }
  ).source
  if (v8Source) {
    return asStringLiteral(v8Source)
  }
  const arg = (node as TSESTree.TSImportType & { argument?: TSESTree.Node })
    .argument
  if (arg && arg.type === "TSLiteralType") {
    return asStringLiteral(arg.literal)
  }
  return null
}

const rule: RuleModule = createRule("prefer-astro-zod-import", {
  meta: {
    docs: {
      description:
        "enforce importing Zod from `astro/zod` to stay in sync with the version bundled with Astro",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
    messages: {
      preferAstroZod:
        "Prefer importing Zod from 'astro/zod' instead of '{{source}}' to stay in sync with the version bundled with Astro.",
    },
    type: "suggestion",
    fixable: "code",
  },
  create(context) {
    /** Reports the given source string literal if it targets `zod`. */
    function checkSource(
      sourceNode: TSESTree.StringLiteral | null | undefined,
    ) {
      if (!sourceNode || !isZodSource(sourceNode.value)) {
        return
      }
      const source = sourceNode.value
      context.report({
        node: sourceNode,
        messageId: "preferAstroZod",
        data: { source },
        fix: FIXABLE_SOURCES.has(source)
          ? (fixer) => fixer.replaceText(sourceNode, `"astro/zod"`)
          : null,
      })
    }

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        checkSource(node.source)
      },
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration) {
        checkSource(node.source)
      },
      ExportAllDeclaration(node: TSESTree.ExportAllDeclaration) {
        checkSource(node.source)
      },
      ImportExpression(node: TSESTree.ImportExpression) {
        checkSource(asStringLiteral(node.source))
      },
      TSImportType(node: TSESTree.TSImportType) {
        checkSource(getTSImportTypeSource(node))
      },
    }
  },
})

export default rule
