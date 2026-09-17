import eslintPluginAstro from "eslint-plugin-astro"
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "astro/no-unused-css-selector": "error",
    },
  },
]
