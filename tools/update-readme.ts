import path from "path"
import fs from "fs"
import renderRulesTableContent from "./render-rules"

const insertText = `\n${renderRulesTableContent(
  (name) => `https://ota-meshi.github.io/eslint-plugin-astro/rules/${name}/`,
)}\n`

const readmeFilePath = path.resolve(__dirname, "../README.md")
const newReadme = fs
  .readFileSync(readmeFilePath, "utf8")
  .replace(
    /<!--RULES_TABLE_START-->[\s\S]*<!--RULES_TABLE_END-->/u,
    `<!--RULES_TABLE_START-->${insertText.replace(
      /\$/g,
      "$$$$",
    )}<!--RULES_TABLE_END-->`,
  )
fs.writeFileSync(readmeFilePath, newReadme)

const docsReadmeFilePath = path.resolve(__dirname, "../docs/README.md")

fs.writeFileSync(
  docsReadmeFilePath,
  `---
title: "eslint-plugin-astro"
---

${newReadme
  .replace("# eslint-plugin-astro\n", "# Introduction\n")
  .replace(
    /<!--RULES_SECTION_START-->[\s\S]*<!--RULES_SECTION_END-->/u,
    "See [Available Rules](./rules.md).",
  )
  .replace(
    /<!--USAGE_SECTION_START-->[\s\S]*<!--USAGE_SECTION_END-->/u,
    "See [User Guide](./user-guide.md).",
  )
  .replace(/<!--DOCS_IGNORE_START-->[\s\S]*?<!--DOCS_IGNORE_END-->/gu, "")
  .replace(
    /\(https:\/\/ota-meshi.github.io\/eslint-plugin-astro(.*?)\)/gu,
    (_ptn, path: string) => {
      const [hash] = /(?:#.*)?$/u.exec(path)!
      const pathWithoutHash = hash ? path.slice(0, -hash.length) : path
      const normalizePathWithoutHash = pathWithoutHash.replace(/\/$/u, "")
      const [file] = /[^/]+$/u.exec(normalizePathWithoutHash)!
      const pathWithoutFile = file
        ? normalizePathWithoutHash.slice(0, -file.length)
        : normalizePathWithoutHash

      let result = `(.${pathWithoutFile}`
      if (file.endsWith(".html")) {
        result +=
          file === "index.html" ? "README.md" : file.replace(/\.html$/, ".md")
      } else {
        result += `${file}.md`
      }
      result += `${hash})`
      return result
    },
  )
  .replace(
    "[LICENSE](LICENSE)",
    "[LICENSE](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/LICENSE)",
  )
  .replace(/\n{3,}/gu, "\n\n")}`,
)

const docsUserGuideFilePath = path.resolve(__dirname, "../docs/user-guide.md")

const docsUserGuide = fs.readFileSync(docsUserGuideFilePath, "utf8")

fs.writeFileSync(
  docsUserGuideFilePath,
  docsUserGuide
    .replace(
      /<!--INSTALL_GUIDE_START-->[\s\S]*<!--INSTALL_GUIDE_END-->/u,
      /<!--INSTALL_GUIDE_START-->[\s\S]*<!--INSTALL_GUIDE_END-->/u.exec(
        newReadme,
      )![0],
    )
    .replace(
      /<!--USAGE_GUIDE_START-->[\s\S]*<!--USAGE_GUIDE_END-->/u,
      /<!--USAGE_GUIDE_START-->[\s\S]*<!--USAGE_GUIDE_END-->/u.exec(
        newReadme,
      )![0],
    )
    .replace(
      /\(https:\/\/ota-meshi.github.io\/eslint-plugin-astro(.*?)\)/gu,
      (_s, c: string) => `(.${c.endsWith("/") ? c.slice(0, -1) : c}.md)`,
    ),
  "utf8",
)
