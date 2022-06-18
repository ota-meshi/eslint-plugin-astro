import fs from "fs"
import path from "path"
import { URL } from "url"
import "./build-system/build.js"
import { load, dump } from "js-yaml"

const dirname = path.dirname(new URL(import.meta.url).pathname)
setupDocs()

function setupDocs() {
  const mainLayoutPath = path.resolve(dirname, "./src/layouts/MainLayout.astro")

  const buildDocsDir = path.resolve(dirname, "./src/pages")
  mkDirs(buildDocsDir)
  for (const md of listup(buildDocsDir, [".astro", ".md"])) {
    fs.unlinkSync(md)
  }
  const docsDir = path.resolve(dirname, "../docs")
  for (const page of listup(docsDir, [".astro", ".md"])) {
    const to = path.resolve(
      buildDocsDir,
      path.relative(
        docsDir,
        page.endsWith("README.md")
          ? page.replace(/README.md$/u, "index.md")
          : page,
      ),
    )
    mkDirs(path.dirname(to))
    const content = fs.readFileSync(page, "utf8")
    if (!page.endsWith(".md")) {
      fs.writeFileSync(to, content, "utf8")
      continue
    }

    const frontmatter = /^---\n([\s\S]*?)\n---\n/u.exec(content)?.[1]
    const data = frontmatter ? load(frontmatter) : {}
    data.layout = `./${path.relative(path.dirname(to), mainLayoutPath)}`
    data.markdownPath = `${to}`
    const newFrontmatter = `---
${dump(data)}---
`
    const pageContent = frontmatter
      ? content.replace(/^---\n[\s\S]*?\n---\n/u, newFrontmatter)
      : `${newFrontmatter}\n${content}`

    fs.writeFileSync(to, pageContent, "utf8")
  }
}

function mkDirs(dir) {
  if (!fs.existsSync(dir)) {
    mkDirs(path.dirname(dir))
    fs.mkdirSync(dir)
  }
}

function* listup(rootDir, ext) {
  for (const filename of fs.readdirSync(rootDir)) {
    const abs = path.join(rootDir, filename)
    if ((Array.isArray(ext) ? ext : [ext]).some((e) => filename.endsWith(e))) {
      yield abs
    } else if (fs.statSync(abs).isDirectory()) {
      yield* listup(abs, ext)
    }
  }
}
