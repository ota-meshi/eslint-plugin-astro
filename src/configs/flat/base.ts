// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import globals from "globals"
import type { ESLint } from "eslint"
import * as parser from "astro-eslint-parser"
import {
  tsESLintParser,
  hasTypescriptEslintParser,
} from "../has-typescript-eslint-parser"
import { environments } from "../../environments/index"
let plugin: unknown
export default [
  {
    plugins: {
      get astro(): ESLint.Plugin {
        // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
        return (plugin ??= require("../../plugin").plugin)
      },
    },
  },
  {
    files: ["*.astro", "**/*.astro"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...environments.astro.globals,
      },
      parser,
      // The script of Astro components uses ESM.
      sourceType: "module",
      parserOptions: {
        parser: tsESLintParser ?? undefined,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      // eslint-plugin-astro rules
      // Enable base rules
    },
    processor: hasTypescriptEslintParser
      ? "astro/client-side-ts"
      : "astro/astro",
  },
  {
    // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
    files: ["**/*.astro/*.js", "*.astro/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      sourceType: "module",
    },
    rules: {
      // If you are using "prettier/prettier" rule,
      // you don't need to format inside <script> as it will be formatted as a `.astro` file.
      "prettier/prettier": "off",
    },
  },
  {
    // Define the configuration for `<script>` tag when using `client-side-ts` processor.
    // Script in `<script>` is assigned a virtual file name with the `.ts` extension.
    files: ["**/*.astro/*.ts", "*.astro/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsESLintParser ?? undefined,
      sourceType: "module",
      parserOptions: {
        project: null,
      },
    },
    rules: {
      // If you are using "prettier/prettier" rule,
      // you don't need to format inside <script> as it will be formatted as a `.astro` file.
      "prettier/prettier": "off",
    },
  },
]
