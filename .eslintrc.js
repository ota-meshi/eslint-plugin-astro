"use strict"

// const version = require("./package.json").version

module.exports = {
  parserOptions: {
    sourceType: "script",
    ecmaVersion: 2020,
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
    "plugin:@ota-meshi/+prettier",
  ],
  rules: {
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
      plugins: ["astro"],
      parser: "astro-eslint-parser",
      env: {
        node: true,
        "astro/astro": true,
      },
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: [require.resolve("./tsconfig.json")],
      },
      rules: {
        "astro/no-set-html-directive": "error",
        "astro/no-set-text-directive": "error",
        "astro/prefer-class-list-directive": "error",
        "astro/prefer-object-class-list": "error",
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
      env: {
        browser: true,
      },
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "prettier/prettier": "off",
      },
    },
    {
      files: ["*.svelte"],
      extends: ["plugin:@ota-meshi/svelte/recommended"],
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
