import path from "path"
const base = require.resolve("./base")
const baseExtend =
  path.extname(`${base}`) === ".ts" ? "plugin:astro/base" : base
export = {
  extends: [baseExtend],
  rules: {
    // eslint-plugin-astro rules
    "astro/no-conflict-set-directives": "error",
    "astro/no-unused-css-selector": "warn",
    "astro/no-unused-define-vars-in-style": "error",
  },
}
