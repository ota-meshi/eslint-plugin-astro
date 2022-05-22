import { visit } from "unist-util-visit"

export default () => {
  return (tree) => {
    visit(tree, "link", (node) => {
      node.url = node.url.replace(/\.md$/u, "/")
    })
    return tree
  }
}
