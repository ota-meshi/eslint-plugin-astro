"use strict"

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

    "astro/no-set-html-directive": "off",
    "astro/no-set-text-directive": "off",
  },
}
