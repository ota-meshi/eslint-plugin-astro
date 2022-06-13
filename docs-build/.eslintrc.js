"use strict"

module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  globals: {
    process: false,
    globalThis: false,
  },
  rules: {
    "require-jsdoc": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/unbound-method": "off",
  },
  overrides: [
    {
      files: ["RightSidebar.astro", "MainLayout.astro"],
      rules: {
        "prettier/prettier": "off", // TODO
      },
    },
  ],
}
