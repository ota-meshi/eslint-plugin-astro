import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import gfm from "remark-gfm"
import replaceLink from "./docs-build/remark-replace-link.mjs"
import "./docs-build/setup-docs.mjs"
import path from "path"
import { URL } from "url"
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
        // node
        fs: path.join(dirname, "./docs-build/shim/fs.mjs"),
        url: path.join(dirname, "./docs-build/shim/url.mjs"),
        path: path.join(dirname, "./docs-build/shim/path.mjs"),
        module: path.join(dirname, "./docs-build/shim/module.mjs"),
        globby: path.join(dirname, "./docs-build/shim/globby.mjs"),
        // override tsconfig (it had no effect...)
        "@eslint-community/eslint-utils": path.join(
          dirname,
          "./node_modules/@eslint-community/eslint-utils",
        ),
      },
    },
    plugins: [
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
