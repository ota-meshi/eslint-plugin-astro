// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import { hasTypescriptEslintParser } from "./has-typescript-eslint-parser"

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
        es2020: true,
      },
      // Allows Astro components to be parsed.
      parser: require.resolve("astro-eslint-parser"),
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: hasTypescriptEslintParser
          ? "@typescript-eslint/parser"
          : undefined,
        extraFileExtensions: [".astro"],
        // The script of Astro components uses ESM.
        sourceType: "module",
      },
      rules: {
        // eslint-plugin-astro rules
        // Enable base rules
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2020: true,
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
    {
      // Define the configuration for `<script>` tag when using `client-side-ts` processor.
      // Script in `<script>` is assigned a virtual file name with the `.ts` extension.
      files: ["**/*.astro/*.ts", "*.astro/*.ts"],
      env: {
        browser: true,
        es2020: true,
      },
      parser: hasTypescriptEslintParser
        ? "@typescript-eslint/parser"
        : undefined,
      parserOptions: {
        sourceType: "module",
        project: null,
      },
      rules: {
        // If you are using "prettier/prettier" rule,
        // you don't need to format inside <script> as it will be formatted as a `.astro` file.
        "prettier/prettier": "off",
      },
    },
  ],
}
