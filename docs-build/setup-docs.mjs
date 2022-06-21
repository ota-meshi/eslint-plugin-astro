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
    let pageContent = frontmatter
      ? content.replace(/^---\n[\s\S]*?\n---\n/u, newFrontmatter)
      : `${newFrontmatter}\n${content}`
    pageContent += `

<br><br>



<a href="https://github.com/ota-meshi/eslint-plugin-astro/edit/main/docs/${page.slice(
      docsDir.length,
    )}" target="_blank" style="display: flex; color: var(--theme-text-lighter);">Edit this page <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg></a>`

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
