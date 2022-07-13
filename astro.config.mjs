// eslint-disable-next-line node/no-missing-import -- Site
import { defineConfig } from "astro/config"
// eslint-disable-next-line node/no-missing-import -- Site
import svelte from "@astrojs/svelte"
import emoji from "remark-emoji"
import gfm from "remark-gfm"
import replaceLink from "./docs-build/remark-replace-link.mjs"
import "./docs-build/setup-docs.mjs"
import path from "path"
import { URL } from "url"

const dirname = path.dirname(new URL(import.meta.url).pathname)

// https://astro.build/config
export default defineConfig({
  base: "/eslint-plugin-astro",
  srcDir: "./docs-build/src",
  publicDir: "./docs-build/public",
  outDir: "./docs-build/dist/eslint-plugin-astro",
  root: dirname,
  integrations: [svelte()],
  markdown: {
    remarkPlugins: [
      emoji,
      gfm,
      [
        replaceLink,
        {
          srcDir: "./docs-build/src",
          base: "/eslint-plugin-astro",
        },
      ],
    ],
  },
  vite: {
    server: {
      fs: { strict: false },
    },
    resolve: {
      alias: {
        eslint: path.join(dirname, "./docs-build/shim/eslint.mjs"),
        assert: path.join(dirname, "./docs-build/shim/assert.mjs"),
        "astro-eslint-parser": path.join(
          dirname,
          "./docs-build/shim/astro-eslint-parser.mjs",
        ),
        "eslint-plugin-jsx-a11y": path.join(
          dirname,
          "./docs-build/shim/eslint-plugin-jsx-a11y.mjs",
        ),
        [path.join(
          dirname,
          "./node_modules/astro-eslint-parser/lib/parser/astro-parser/astrojs-compiler-service.js",
        )]: path.join(
          dirname,
          "./docs-build/shim/@astrojs-compiler-service4b.mjs",
        ),
        [path.join(
          dirname,
          "./node_modules/astro-eslint-parser/lib/markdown/mdast-util-from-markdown-service.js",
        )]: path.join(
          dirname,
          "./docs-build/shim/@mdast-util-from-markdown-service4b.mjs",
        ),
        // node
        fs: path.join(dirname, "./docs-build/shim/fs.mjs"),
        path: path.join(dirname, "./docs-build/shim/path.mjs"),
        module: path.join(dirname, "./docs-build/shim/module.mjs"),
        globby: path.join(dirname, "./docs-build/shim/globby.mjs"),
      },
    },
  },
})
