import Module from "node:module"
import path from "node:path"
import postcss from "postcss"
import { runAsWorker } from "synckit"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports --- Ignore inline type
type PostcssLoadConfig = typeof import("postcss-load-config")

export type PostcssWorkerInput = {
  /** The directory to resolve `postcss-load-config` and its config from. */
  cwd: string
  /** The filename passed to PostCSS as `from`. */
  filename: string
  /** The CSS code to transform. */
  code: string
}
export type PostcssWorkerOutput = {
  /** The transformed CSS. */
  output: string
  /** The source map mappings from the input to the output. */
  mappings: string
}
export type PostcssWorker = (
  input: PostcssWorkerInput,
) => Promise<PostcssWorkerOutput>

/**
 * Transform CSS with PostCSS using the config found by `postcss-load-config`.
 *
 * `postcss-load-config` v4 and later only provide an async API, so this runs
 * in a worker thread and is called synchronously through `synckit`.
 */
runAsWorker(
  async ({
    cwd,
    filename,
    code,
  }: PostcssWorkerInput): Promise<PostcssWorkerOutput> => {
    const postcssrc = loadPostcssLoadConfig(cwd)
    const config = await postcssrc({ cwd, from: filename }, cwd)

    const result = await postcss(config.plugins.map(unwrapDefault)).process(
      code,
      {
        ...config.options,
        map: {
          inline: false,
        },
      },
    )

    return {
      output: result.content,
      mappings: result.map.toJSON().mappings,
    }
  },
)

/**
 * Load postcss-load-config from the given directory
 */
function loadPostcssLoadConfig(cwd: string): PostcssLoadConfig {
  const relativeTo = path.join(cwd, "__placeholder__.js")
  return unwrapDefault(
    Module.createRequire(relativeTo)(
      "postcss-load-config",
    ) as PostcssLoadConfig,
  )
}

/**
 * Unwrap the default export of an ES module namespace object.
 *
 * `postcss-load-config` v3 loads plugins with `require`, so an ESM-only plugin
 * (e.g. `postcss-nested` v8) is returned as a module namespace object,
 * which PostCSS does not accept as a plugin.
 */
function unwrapDefault<T>(plugin: T): T {
  if (
    typeof plugin === "object" &&
    plugin !== null &&
    "default" in plugin &&
    plugin.default
  ) {
    return plugin.default as T
  }
  return plugin
}
