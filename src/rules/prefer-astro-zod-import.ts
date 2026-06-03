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

export default createRule("prefer-astro-zod-import", {
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
    /** Reports the given import/export source if it targets `zod`. */
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
    }
  },
}) satisfies RuleModule
