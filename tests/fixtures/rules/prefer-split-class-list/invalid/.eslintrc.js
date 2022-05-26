"use strict"

module.exports = {
  overrides: [
    {
      files: ["*.astro"],
      rules: {
        "prettier/prettier": "off",
        "no-implicit-coercion": "off",
        "prefer-template": "off",
      },
    },
  ],
}
