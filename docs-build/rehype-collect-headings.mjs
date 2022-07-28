// eslint-disable-next-line node/no-extraneous-import -- ignore
import Slugger from "github-slugger"
// eslint-disable-next-line node/no-extraneous-import -- ignore
import { toHtml } from "hast-util-to-html"
// eslint-disable-next-line node/no-extraneous-import -- ignore
import { visit } from "unist-util-visit"
// eslint-disable-next-line node/no-extraneous-import -- ignore
import { valueToEstree } from "estree-util-value-to-estree"

const slugger = new Slugger()

export default rehypeCollectHeadings

function rehypeCollectHeadings() {
  return function (tree) {
    const headings = []
    visit(tree, (node) => {
      if (node.type !== "element") return
      const { tagName } = node
      if (tagName[0] !== "h") return
      const [_, level] = tagName.match(/h([0-6])/) ?? []
      if (!level) return
      const depth = Number.parseInt(level, 10)
      let text = ""
      let isJSX = false
      visit(node, (child, _, parent) => {
        if (child.type === "element" || parent == null) {
          return
        }
        if (child.type === "raw") {
          if (child.value.match(/^\n?<.*>\n?$/)) {
            return
          }
        }
        if (child.type === "text" || child.type === "raw") {
          if (/* @__PURE__ */ new Set(["code", "pre"]).has(parent.tagName)) {
            text += child.value
          } else {
            text += child.value.replace(/\{/g, "${")
            isJSX = isJSX || child.value.includes("{")
          }
        }
      })
      node.properties = node.properties || {}
      if (typeof node.properties.id !== "string") {
        if (isJSX) {
          const raw = toHtml(node.children, { allowDangerousHtml: true })
            .replace(/\n(<)/g, "<")
            .replace(/(>)\n/g, ">")
          node.properties.id = `$$slug(\`${text}\`)`
          node.type = "raw"
          node.value = `<${node.tagName} id={${node.properties.id}}>${raw}</${node.tagName}>`
        } else {
          let slug = slugger.slug(text)
          if (slug.endsWith("-")) slug = slug.slice(0, -1)
          node.properties.id = slug
        }
      }
      headings.push({ depth, slug: node.properties.id, text })
    })

    tree.children.unshift(createExport(headings))
  }
}

function createExport(headings) {
  return {
    type: "mdxjsEsm",
    value: "",
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            specifiers: [],
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name: "$$headings" },
                  init: valueToEstree(headings),
                },
              ],
            },
          },
        ],
      },
    },
  }
}
