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
    optimizeDeps: {
      // Do not prebundle compiler-rs: its WASI browser entry resolves a sibling
      // .wasm file, and prebundling rewrites that URL to node_modules/.vite/deps.
      exclude: [
        "@astrojs/compiler-binding",
        "@astrojs/compiler-binding-wasm32-wasi",
        "@astrojs/compiler-rs",
      ],
    },
    resolve: {
      alias: [
        {
          find: "eslint-plugin-jsx-a11y",
          replacement: path.join(
            dirname,
            "./docs-build/shim/eslint-plugin-jsx-a11y.mjs",
          ),
        },
        // node
        {
          find: "url",
          replacement: path.join(dirname, "./docs-build/shim/url.mjs"),
        },
        {
          find: "module",
          replacement: path.join(dirname, "./docs-build/shim/module.mjs"),
        },
        {
          find: "node:url",
          replacement: path.join(dirname, "./docs-build/shim/url.mjs"),
        },
        {
          find: "node:module",
          replacement: path.join(dirname, "./docs-build/shim/module.mjs"),
        },
        {
          find: "fast-glob",
          replacement: path.join(dirname, "./docs-build/shim/fast-glob.mjs"),
        },
        {
          find: "tinyglobby",
          replacement: path.join(dirname, "./docs-build/shim/tinyglobby.mjs"),
        },
        // override tsconfig (it had no effect...)
        {
          find: "@eslint-community/eslint-utils",
          replacement: path.join(
            dirname,
            "./node_modules/@eslint-community/eslint-utils",
          ),
        },
        {
          find: "node:path",
          replacement: path.join(
            dirname,
            "./node_modules/vite-plugin-eslint4b/shim/path-shim.mjs",
          ),
        },
        // Force compiler-rs onto its browser binding; the default binding
        // imports node:module and native .node packages.
        {
          find: "@astrojs/compiler-binding",
          replacement: path.join(
            dirname,
            "./node_modules/@astrojs/compiler-binding/browser.js",
          ),
        },
        // The wasm32-wasi binding is optional for Node installs, so the explorer
        // carries it directly and aliases exact imports to its browser files.
        {
          find: /^@astrojs\/compiler-binding-wasm32-wasi$/,
          replacement: path.join(
            dirname,
            "./node_modules/@astrojs/compiler-binding-wasm32-wasi/astro.wasi-browser.js",
          ),
        },
        {
          find: /^@astrojs\/compiler-binding-wasm32-wasi\/wasi-worker-browser\.mjs$/,
          replacement: path.join(
            dirname,
            "./node_modules/@astrojs/compiler-binding-wasm32-wasi/wasi-worker-browser.mjs",
          ),
        },
      ],
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
