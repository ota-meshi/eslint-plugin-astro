import type { AST } from "astro-eslint-parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createSyncFn } from "synckit"
import type { RuleContext } from "../../types.ts"
import { getContentRange, resolveModule } from "./utils.ts"
import type { TransformResult } from "./types.ts"
import type { PostcssWorker } from "./postcss-worker.mts"

let transformSync: ReturnType<typeof createSyncFn<PostcssWorker>> | null = null

/**
 * Transform with postcss
 */
export function transform(
  node: AST.JSXElement,
  context: RuleContext,
): TransformResult | null {
  // Avoid starting the worker when postcss-load-config is not installed.
  if (!resolveModule(context, "postcss-load-config")) {
    return null
  }
  const inputRange = getContentRange(node)

  const sourceCode = context.sourceCode
  const code = sourceCode.text.slice(...inputRange)

  try {
    const result = getTransformSync()({
      cwd: context.cwd ?? process.cwd(),
      filename: `${context.filename}.css`,
      code,
    })

    return {
      inputRange,
      output: result.output,
      mappings: result.mappings,
    }
  } catch {
    return null
  }
}

/**
 * Get the synchronous function that runs the postcss worker.
 *
 * `postcss-load-config` v4 and later only provide an async API, so the
 * transform runs in a worker thread and is synchronized with `synckit`.
 */
function getTransformSync(): ReturnType<typeof createSyncFn<PostcssWorker>> {
  if (!transformSync) {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    // synckit falls back to `postcss-worker.mts` when running from the sources.
    transformSync = createSyncFn<PostcssWorker>(
      path.join(dirname, "postcss-worker.mjs"),
    )
  }
  return transformSync
}
