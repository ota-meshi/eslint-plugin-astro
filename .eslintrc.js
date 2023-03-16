"use strict"

// const version = require("./package.json").version

module.exports = {
  parserOptions: {
    sourceType: "script",
    ecmaVersion: "latest",
    project: require.resolve("./tsconfig.json"),
  },
  extends: [
    "plugin:@ota-meshi/recommended",
    "plugin:@ota-meshi/+node",
    "plugin:@ota-meshi/+typescript",
    "plugin:@ota-meshi/+eslint-plugin",
    "plugin:@ota-meshi/+package-json",
    "plugin:@ota-meshi/+json",
    "plugin:@ota-meshi/+yaml",
    "plugin:@ota-meshi/+md",
    "plugin:astro/all",
    "plugin:@ota-meshi/+prettier",
  ],
  rules: {
    "astro/semi": "off",
    "require-jsdoc": "error",
    "no-warning-comments": "warn",
    "no-lonely-if": "off",
    "new-cap": "off",
    "no-shadow": "off",
    "no-void": ["error", { allowAsStatement: true }],
    "prettier/prettier": [
      "error",
      {},
      {
        usePrettierrc: true,
      },
    ],
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
  },
  overrides: [
    {
      files: ["*.mjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: [require.resolve("./tsconfig.json")],
        sourceType: "module",
      },
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
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      files: ["*.svelte"],
      extends: ["plugin:svelte/recommended"],
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        project: require.resolve("./tsconfig.json"),
      },
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "default",
            format: ["camelCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
          },
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
          },
          {
            selector: "typeLike",
            format: ["PascalCase"],
          },
          {
            selector: "property",
            format: null,
          },
          {
            selector: "method",
            format: null,
          },
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    {
      files: ["src/rules/**"],
      rules: {},
    },
    {
      files: ["tests/**"],
      rules: {
        "@typescript-eslint/no-misused-promises": "off",
      },
    },
    {
      files: ["scripts/**/*.ts", "tests/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        project: require.resolve("./tsconfig.json"),
      },
      rules: {
        "require-jsdoc": "off",
        "no-console": "off",
      },
    },
  ],
}
