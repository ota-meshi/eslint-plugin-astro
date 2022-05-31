"use strict"

const allConfig = require("eslint-plugin-astro").configs.all

module.exports = {
  overrides: [
    {
      files: ["*output.astro"],
      rules: {
        "prettier/prettier": "off",
      },
    },
    {
      files: ["*input.astro"],
      rules: {
        "prettier/prettier": "off", // TODO
      },
    },
    {
      files: ["*.astro"],
      parserOptions: {
        project: null,
      },
    },
  ],
  rules: {
    "no-undef": "off",
    "require-jsdoc": "off",
    "no-inner-declarations": "off",
    "no-unused-vars": "off",
    "no-empty-function": "off",
    "one-var": "off",
    "func-style": "off",

    // eslint-disable-next-line node/no-unsupported-features/es-syntax, node/no-unsupported-features/es-builtins -- ignore
    ...Object.fromEntries(
      Object.keys(allConfig.rules).map((ruleId) => [ruleId, "off"]),
    ),
  },
}
