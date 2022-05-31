export = {
  plugins: ["astro"],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Enable this plugin
      plugins: ["astro"],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        "astro/astro": true,
        es2022: true,
      },
      // Allows Astro components to be parsed.
      parser: require.resolve("astro-eslint-parser"),
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        // The script of Astro components uses ESM.
        sourceType: "module",
      },
      rules: {
        // eslint-plugin-astro rules
        // Enable recommended rules
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2022: true,
      },
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        // If you are using "prettier/prettier" rule,
        // you don't need to format inside <script> as it will be formatted as a `.astro` file.
        "prettier/prettier": "off",
      },
    },
  ],
}
