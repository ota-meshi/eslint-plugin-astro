import { visit } from "unist-util-visit"
import path from "path"

export default (options = {}) => {
  const base =
    // eslint-disable-next-line no-process-env -- ignore
    (process?.env?.NODE_ENV === "production" ? options.base : "") || ""
  return (tree, file) => {
    const srcDir = path.resolve(
      file.cwd,
      options.srcDir ? options.srcDir : "./src",
    )
    const pagesDir = path.join(srcDir, "pages")
    const markdownPath = file.path
    if (markdownPath) {
      visit(tree, ["link", "definition"], (node) => {
        if (node.url.startsWith(".")) {
          const linkPath = path.resolve(path.dirname(markdownPath), node.url)
          const relativeLinkPath = path.relative(pagesDir, linkPath)
          const absoluteLinkPath = path.join(base, relativeLinkPath)
          node.url = `/${absoluteLinkPath
            .replace(/^\//u, "")
            .replace(/\.md$/u, "/")}`
        }
      })
    }
    return tree
  }
}
