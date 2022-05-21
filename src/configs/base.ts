export = {
  plugins: ["astro"],
  overrides: [
    {
      files: ["*.astro"],
      parser: require.resolve("astro-eslint-parser"),
      rules: {
        // ESLint core rules known to cause problems with `.astro`.
        //
        // "no-irregular-whitespace": "off",
        // eslint-plugin-astro rules
      },
    },
  ],
}
