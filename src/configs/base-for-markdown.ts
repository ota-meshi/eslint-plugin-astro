import { hasTypescriptEslintParser } from "./has-typescript-eslint-parser"

export = {
  plugins: ["astro"],
  overrides: [
    {
      // Define the configuration for `.md` file.
      files: ["*.md"],
      // Enable this plugin
      plugins: ["astro"],
      env: {
        // Enables global variables available in Astro Markdown pages.
        node: true,
        "astro/markdown": true,
        es2020: true,
      },
      // Allows Astro Markdown pages to be parsed.
      parser: require.resolve("astro-eslint-parser"),
      // Parse the script in `.md` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: hasTypescriptEslintParser
          ? "@typescript-eslint/parser"
          : undefined,
        extraFileExtensions: [".md"],
        // The script of Astro Markdown pages uses ESM.
        sourceType: "module",
      },
      rules: {
        // Turn off rules that are incompatible with markdown
        indent: "off",
        // eslint-plugin-astro rules
        // Enable base rules
      },
    },
  ],
}
