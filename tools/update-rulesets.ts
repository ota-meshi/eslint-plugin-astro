import path from "path"
import { rules } from "./lib/load-rules"
import { formatAndSave } from "./lib/utils"

const baseRules = rules.filter(
  (rule) => rule.meta.docs.recommended === "base" && !rule.meta.deprecated,
)
const baseContent = `export = {
  plugins: ["astro"],
  overrides: [
    {
      // Define the configuration for \`.astro\` file.
      files: ["*.astro"],
      // Enable this plugin
      plugins: ["astro"],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        "astro/astro": true,
      },
      // Allows Astro components to be parsed.
      parser: require.resolve("astro-eslint-parser"),
      // Parse the script in \`.astro\` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        // The script of Astro components uses ESM.
        sourceType: "module",
      },
      rules: {
        // eslint-plugin-astro rules
        // Enable recommended rules
        ${baseRules
          .map((rule) => {
            const conf = rule.meta.docs.default || "error"
            return `"${rule.meta.docs.ruleId}": "${conf}"`
          })
          .join(",\n        ")}
      },
    },
    {
      // Define the configuration for \`<script>\` tag.
      // Script in \`<script>\` is assigned a virtual file name with the \`.js\` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
      },
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        // If you are using "prettier/prettier" rule,
        // you don't need to format inside <script> as it will be formatted as a \`.astro\` file.
        "prettier/prettier": "off",
      },
    },
  ],
}
`

const baseFilePath = path.resolve(__dirname, "../src/configs/base.ts")

// Update file.
void formatAndSave(baseFilePath, baseContent)

const recommendedRules = rules.filter(
  (rule) => rule.meta.docs.recommended && !rule.meta.deprecated,
)

const recommendedContent = `import path from "path"
const base = require.resolve("./base")
const baseExtend =
  path.extname(\`\${base}\`) === ".ts" ? "plugin:astro/base" : base
export = {
  extends: [baseExtend],
  rules: {
    // eslint-plugin-astro rules
    ${recommendedRules
      .map((rule) => {
        const conf = rule.meta.docs.default || "error"
        return `"${rule.meta.docs.ruleId}": "${conf}"`
      })
      .join(",\n    ")}
  },
}
`

const recommendedFilePath = path.resolve(
  __dirname,
  "../src/configs/recommended.ts",
)

// Update file.
void formatAndSave(recommendedFilePath, recommendedContent)
