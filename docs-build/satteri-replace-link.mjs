import path from "path"
import { fileURLToPath } from "url"

/**
 * Sätteri mdast plugin that rewrites relative `.md` links in the docs
 * (e.g. `./rules/foo.md`) into absolute site URLs (e.g. `/base/rules/foo/`).
 */
export default (options = {}) => {
  const base =
    (process?.env?.NODE_ENV === "production" ? options.base : "") || ""
  const srcDir = path.resolve(options.srcDir ? options.srcDir : "./src")
  const pagesDir = path.join(srcDir, "pages")

  function replaceUrl(node, ctx) {
    if (!ctx.fileURL || !node.url.startsWith(".")) {
      return
    }
    const markdownPath = fileURLToPath(ctx.fileURL)
    const linkPath = path.resolve(path.dirname(markdownPath), node.url)
    const relativeLinkPath = path.relative(pagesDir, linkPath)
    const absoluteLinkPath = path.join(base, relativeLinkPath)
    ctx.setProperty(
      node,
      "url",
      `/${absoluteLinkPath.replace(/^\//u, "").replace(/\.md$/u, "/")}`,
    )
  }

  return {
    name: "replace-link",
    link: replaceUrl,
    definition: replaceUrl,
  }
}
