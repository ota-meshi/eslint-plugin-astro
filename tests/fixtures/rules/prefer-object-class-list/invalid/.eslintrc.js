"use strict"

module.exports = {
  overrides: [
    {
      files: ["*.astro"],
      rules: {
        "prettier/prettier": "off",
        "prefer-template": "off",
        "no-useless-concat": "off",
        "object-shorthand": "off",
        "no-sparse-arrays": "off",
        eqeqeq: "off",
      },
    },
  ],
}
