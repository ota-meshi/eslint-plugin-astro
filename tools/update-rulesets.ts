import path from "path"
import { rules } from "./lib/load-rules"
import { formatAndSave } from "./lib/utils"

const baseRules = rules.filter(
  (rule) => rule.meta.docs.recommended === "base" && !rule.meta.deprecated,
)
void formatAndSave(
  path.resolve(__dirname, "../src/configs/base.ts"),
  `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
import { hasTypescriptEslintParser } from "./has-typescript-eslint-parser"

export default {
  plugins: ["astro"],
  overrides: [
    {
      // Define the configuration for \`.astro\` file.
      files: ["*.astro"],
      // Enable this plugin
      plugins: ["astro"],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        "astro/astro": true,
        es2020: true,
      },
      // Allows Astro components to be parsed.
      parser: require.resolve("astro-eslint-parser"),
      // Parse the script in \`.astro\` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: hasTypescriptEslintParser
          ? "@typescript-eslint/parser"
          : undefined,
        extraFileExtensions: [".astro"],
        // The script of Astro components uses ESM.
        sourceType: "module",
      },
      rules: {
        // eslint-plugin-astro rules
        // Enable base rules
        ${baseRules
          .map((rule) => {
            const conf = rule.meta.docs.default || "error"
            return `"${rule.meta.docs.ruleId}": "${conf}"`
          })
          .join(",\n        ")}
      },
    },
    {
      // Define the configuration for \`<script>\` tag.
      // Script in \`<script>\` is assigned a virtual file name with the \`.js\` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2020: true,
      },
      parserOptions: {
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
      files: ["**/*.astro/*.ts", "*.astro/*.ts"],
      env: {
        browser: true,
        es2020: true,
      },
      parser: hasTypescriptEslintParser
        ? "@typescript-eslint/parser"
        : undefined,
      parserOptions: {
        sourceType: "module",
        project: null,
      },
      rules: {
        // If you are using "prettier/prettier" rule,
        // you don't need to format inside <script> as it will be formatted as a \`.astro\` file.
        "prettier/prettier": "off",
      },
    },
  ],
}
`,
)

void formatAndSave(
  path.resolve(__dirname, "../src/configs/flat/base.ts"),
  `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
import globals from "globals"
import type { ESLint } from "eslint"
import * as parser from "astro-eslint-parser"
import { tsESLintParser, hasTypescriptEslintParser } from "../has-typescript-eslint-parser"
import { environments } from "../../environments/index"
let plugin: unknown
export default [
  {
    plugins: {
      get astro(): ESLint.Plugin {
        // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
        return (plugin ??= require("../../plugin-without-config"))
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
      ${baseRules
        .map((rule) => {
          const conf = rule.meta.docs.default || "error"
          return `"${rule.meta.docs.ruleId}": "${conf}"`
        })
        .join(",\n        ")}
    },
		processor: hasTypescriptEslintParser ? 'astro/client-side-ts' : 'astro/astro'
  },
  {
    // Define the configuration for \`<script>\` tag.
    // Script in \`<script>\` is assigned a virtual file name with the \`.js\` extension.
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
]`,
)

const recommendedRules = rules.filter(
  (rule) => rule.meta.docs.recommended && !rule.meta.deprecated,
)

void formatAndSave(
  path.resolve(__dirname, "../src/configs/recommended.ts"),
  `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
const baseExtend = "plugin:astro/base"
export default {
  extends: [baseExtend],
  rules: {
    // eslint-plugin-astro rules
    ${recommendedRules
      .map((rule) => {
        const conf = rule.meta.docs.default || "error"
        return `"${rule.meta.docs.ruleId}": "${conf}"`
      })
      .join(",\n    ")}
  },
}
`,
)

void formatAndSave(
  path.resolve(__dirname, "../src/configs/flat/recommended.ts"),
  `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
import base from './base';
export default [
  ...base,
  {
    rules: {
      // eslint-plugin-astro rules
      ${recommendedRules
        .map((rule) => {
          const conf = rule.meta.docs.default || "error"
          return `"${rule.meta.docs.ruleId}": "${conf}"`
        })
        .join(",\n    ")}
    },
  }
]
`,
)
