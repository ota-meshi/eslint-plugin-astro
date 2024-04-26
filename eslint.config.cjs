"use strict"

const myPlugin = require("@ota-meshi/eslint-plugin")
const tseslint = require("typescript-eslint")
const allConfig = require("./node_modules/eslint-plugin-astro").configs.all
module.exports = [
  {
    ignores: [
      ".nyc_output/",
      "coverage/",
      "lib/",
      "node_modules/",
      "!.vscode/",
      "!.github/",
      "tests/fixtures/rules/*/invalid/template-attr-*.astro",
      "tests/fixtures/rules/*/invalid/template-attr-*.astro",
      "tests/fixtures/rules/*/invalid/_*.astro",
      "docs-build/src/md/",
      "docs-build/src/pages/",
      "docs-build/README.md",
      "docs-build/dist/",
      "docs-build/shim/assert.mjs",
      "docs-build/shim/eslint.mjs",
      "docs-build/shim/astro-eslint-parser.mjs",
      "docs-build/shim/eslint-plugin-jsx-a11y.mjs",
      "tests/fixtures/rules/indent/invalid/ts/",
      "tests/fixtures/rules/indent/invalid/ts-v5/",
      "tests/fixtures/rules/valid-compile/invalid/ts/",
      "tests/fixtures/rules/valid-compile/valid/babel/",
      "tests/fixtures/rules/valid-compile/valid/ts/",
      "tests/fixtures/rules/prefer-style-directive/",
      "build/",
    ],
  },
  ...myPlugin.config({
    node: true,
    ts: true,
    eslintPlugin: true,
    packageJson: true,
    json: true,
    yaml: true,
    md: true,
    prettier: true,
    astro: true,
    svelte: true,
  }),
  {
    rules: {
      "@typescript-eslint/no-shadow": "off",
      // Repo rule
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["/regexpp", "/regexpp/*"],
              message: "Please use `@eslint-community/regexpp` instead.",
            },
            {
              group: ["/eslint-utils", "/eslint-utils/*"],
              message: "Please use `@eslint-community/eslint-utils` instead.",
            },
          ],
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          object: "context",
          property: "getSourceCode",
          message: "Use src/utils/compat.ts",
        },
        {
          object: "context",
          property: "getFilename",
          message: "Use src/utils/compat.ts",
        },
        {
          object: "context",
          property: "getPhysicalFilename",
          message: "Use src/utils/compat.ts",
        },
        {
          object: "context",
          property: "getCwd",
          message: "Use src/utils/compat.ts",
        },
        {
          object: "context",
          property: "getScope",
          message: "Use src/utils/compat.ts",
        },
        {
          object: "context",
          property: "parserServices",
          message: "Use src/utils/compat.ts",
        },
      ],
    },
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
  },
  {
    files: ["**/*.astro", "*.astro"],
    rules: {
      "astro/prefer-split-class-list": [
        "error",
        {
          splitLiteral: true,
        },
      ],
      "prettier/prettier": "error",
      "no-console": "off",
    },
  },
  {
    files: ["**/*.svelte", "*.svelte"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "off",
    },
  },
  {
    files: ["docs-build/**"],
    rules: {
      "jsdoc/require-jsdoc": "off",
      "no-process-env": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  ...tseslint.config(
    {
      files: ["tests/fixtures/rules/**"],
      extends: [tseslint.configs.disableTypeChecked],
      rules: {
        "no-undef": "off",
        "jsdoc/require-jsdoc": "off",
        "no-inner-declarations": "off",
        "no-unused-vars": "off",
        "no-empty-function": "off",
        "one-var": "off",
        "func-style": "off",
        "@typescript-eslint/no-empty-function": "off",
        "prefer-const": "off",
        "@typescript-eslint/no-unused-vars": "off",

        ...Object.fromEntries(
          Object.keys(allConfig.rules).map((ruleId) => [ruleId, "off"]),
        ),
      },
    },
    {
      files: ["tests/fixtures/rules/**/*.astro"],
      extends: [tseslint.configs.disableTypeChecked],
      languageOptions: {
        parserOptions: {
          project: null,
        },
      },
    },
    {
      files: ["tests/fixtures/rules/**/*output.astro"],
      rules: {
        "prettier/prettier": "off",
      },
    },
    {
      files: ["tests/fixtures/rules/**/*input.astro"],
      rules: {
        "prettier/prettier": "off", // TODO
      },
    },
    {
      files: [
        "tests/fixtures/rules/prefer-split-class-list/invalid/**/*.astro",
      ],
      rules: {
        "no-implicit-coercion": "off",
        "prefer-template": "off",
      },
    },
    {
      files: [
        "tests/fixtures/rules/prefer-object-class-list/invalid/**/*.astro",
      ],
      rules: {
        "prefer-template": "off",
        "no-useless-concat": "off",
        "object-shorthand": "off",
        "no-sparse-arrays": "off",
        eqeqeq: "off",
      },
    },
  ),
]
