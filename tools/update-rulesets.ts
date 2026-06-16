import path from "node:path"
import { fileURLToPath } from "node:url"
import { rules } from "./lib/load-rules.ts"
import { formatAndSave } from "./lib/utils.ts"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const baseRules = rules.filter(
  (rule) => rule.meta.docs.recommended === "base" && !rule.meta.deprecated,
)
void formatAndSave(
  path.resolve(dirname, "../src/configs/flat/base.ts"),
  `// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import globals from "globals"
import type { ESLint, Linter } from "eslint"
import * as parser from "astro-eslint-parser"
import { tsESLintParser, hasTypescriptEslintParser } from "../has-typescript-eslint-parser.ts"
import { environments } from "../../environments/index.ts"
import { getPlugin } from "../../plugin.ts"
export default [
  {
    name: "astro/base/plugin",
    plugins: {
      get astro(): ESLint.Plugin {
        return getPlugin()
      },
    },
  },
  {
    name: "astro/base",
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
      ${baseRules
        .map((rule) => {
          const conf = rule.meta.docs.default || "error"
          return `"${rule.meta.docs.ruleId}": "${conf}"`
        })
        .join(",\n      ")}
    },
    processor: hasTypescriptEslintParser
      ? "astro/client-side-ts"
      : "astro/astro",
  },
  {
    // Define the configuration for \`<script>\` tag.
    // Script in \`<script>\` is assigned a virtual file name with the \`.js\` extension.
    name: "astro/base/javascript",
    files: ["**/*.astro/*.js", "*.astro/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      sourceType: "module",
    },
    rules: {
      // If you are using "prettier/prettier" rule,
      // you don't need to format inside <script> as it will be formatted as a \`.astro\` file.
      "prettier/prettier": "off",
    },
  },
  {
    // Define the configuration for \`<script>\` tag when using \`client-side-ts\` processor.
    // Script in \`<script>\` is assigned a virtual file name with the \`.ts\` extension.
    name: "astro/base/typescript",
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
      // you don't need to format inside <script> as it will be formatted as a \`.astro\` file.
      "prettier/prettier": "off",
    },
  },
] as Linter.Config[]`,
)

const recommendedRules = rules.filter(
  (rule) => rule.meta.docs.recommended && !rule.meta.deprecated,
)

void formatAndSave(
  path.resolve(dirname, "../src/configs/flat/recommended.ts"),
  `// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import type { Linter } from "eslint"
import base from "./base.ts"
export default [
  ...base,
  {
    name: "astro/recommended",
    rules: {
      // eslint-plugin-astro rules
      ${recommendedRules
        .map((rule) => {
          const conf = rule.meta.docs.default || "error"
          return `"${rule.meta.docs.ruleId}": "${conf}"`
        })
        .join(",\n      ")}
    },
  },
] as Linter.Config[]
`,
)
