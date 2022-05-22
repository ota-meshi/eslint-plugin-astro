import fs from "fs"
import path from "path"
import { URL } from "url"
import "./build-system/build.js"

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
  for (const md of listup(docsDir, ".md")) {
    const from = (
      md.endsWith("README.md") ? md.replace(/README.md$/u, "index.md") : md
    ).replace(/\.md$/u, ".astro")
    const to = path.resolve(buildDocsDir, path.relative(docsDir, from))
    mkDirs(path.dirname(to))

    if (md.endsWith("/playground.md")) {
      fs.writeFileSync(
        to,
        `---
import ESLintPlayground from '../components/ESLintPlaygroundWrap.astro'
import MainLayout from '../layouts/MainLayout.astro'
const content = {
  title: 'Playground',
  astro: { headers: [] }
}
---
<MainLayout {content}>
    <ESLintPlayground />
</MainLayout>
`,
        "utf8",
      )
      continue
    }

    fs.writeFileSync(
      to,
      `---
import * as all from '${path.relative(path.dirname(to), md)}'
import MainLayout from '${path.relative(path.dirname(to), mainLayoutPath)}'
const content = await all.getHeaders().then(headers=>{
    return {
        astro: {headers}
    }
})
const Md = all.Content
---
<MainLayout {content}>
    <Md />
</MainLayout>
`,
      "utf8",
    )
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
