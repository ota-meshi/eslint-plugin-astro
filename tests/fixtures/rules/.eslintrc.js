"use strict"

module.exports = {
  overrides: [
    {
      files: ["*output.astro"],
      rules: {
        "prettier/prettier": "off",
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
  },
}
