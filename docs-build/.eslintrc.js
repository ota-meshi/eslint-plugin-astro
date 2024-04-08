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
    "jsdoc/require-jsdoc": "off",
    "no-process-env": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/unbound-method": "off",
  },
}
