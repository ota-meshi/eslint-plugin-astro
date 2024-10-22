import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import gfm from "remark-gfm"
import eslint4b from "vite-plugin-eslint4b"
import replaceLink from "./docs-build/remark-replace-link.mjs"
import "./docs-build/setup-docs.mjs"
import path from "path"
import { version as monacoVersion } from "monaco-editor/package.json"

const dirname = path.dirname(new URL(import.meta.url).pathname)

// https://astro.build/config
export default defineConfig({
  base: "/eslint-plugin-astro",
  srcDir: "./docs-build/src",
  publicDir: "./docs-build/public",
  outDir: "./docs-build/dist/eslint-plugin-astro",
  root: dirname,
  integrations: [
    svelte(),
    mdx({
      remarkPlugins: [
        gfm,
        [
          replaceLink,
          {
            srcDir: "./docs-build/src",
            base: "/eslint-plugin-astro",
          },
        ],
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [
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
    define: {
      MONACO_EDITOR_VERSION: JSON.stringify(monacoVersion),
    },
    server: {
      fs: { strict: false },
    },
    resolve: {
      alias: {
        "astro-eslint-parser": path.join(
          dirname,
          "./docs-build/shim/astro-eslint-parser.mjs",
        ),
        "eslint-plugin-jsx-a11y": path.join(
          dirname,
          "./docs-build/shim/eslint-plugin-jsx-a11y.mjs",
        ),
        // node
        url: path.join(dirname, "./docs-build/shim/url.mjs"),
        module: path.join(dirname, "./docs-build/shim/module.mjs"),
        globby: path.join(dirname, "./docs-build/shim/globby.mjs"),
        "fast-glob": path.join(dirname, "./docs-build/shim/empty.mjs"),
        // override tsconfig (it had no effect...)
        "@eslint-community/eslint-utils": path.join(
          dirname,
          "./node_modules/@eslint-community/eslint-utils",
        ),
        "node:path": path.join(
          dirname,
          "./node_modules/vite-plugin-eslint4b/shim/path-shim.mjs",
        ),
      },
    },
    plugins: [
      eslint4b(),
      {
        name: "force-alias",
        enforce: "pre",
        config() {
          return {
            resolve: {
              alias: {
                // override tsconfig
                "@eslint-community/eslint-utils": path.join(
                  dirname,
                  "./node_modules/@eslint-community/eslint-utils",
                ),
              },
            },
          }
        },
      },
    ],
  },
})
