import path from "path"
import fs from "fs"
import { rules } from "./lib/load-rules"
import { ESLint } from "eslint"

const baseRules = rules.filter(
  (rule) => rule.meta.docs.recommended === "base" && !rule.meta.deprecated,
)
const baseContent = `export = {
  plugins: ["astro"],
  overrides: [
    {
      files: ["*.astro"],
      parser: require.resolve("astro-eslint-parser"),
      rules: {
        // ESLint core rules known to cause problems with \`.astro\`.
        //
        // "no-irregular-whitespace": "off",

        // eslint-plugin-astro rules
        ${baseRules
          .map((rule) => {
            const conf = rule.meta.docs.default || "error"
            return `"${rule.meta.docs.ruleId}": "${conf}"`
          })
          .join(",\n        ")}
      },
    },
  ],
}
`

const baseFilePath = path.resolve(__dirname, "../src/configs/base.ts")

// Update file.
fs.writeFileSync(baseFilePath, baseContent)

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
fs.writeFileSync(recommendedFilePath, recommendedContent)

// Format files.
const linter = new ESLint({ fix: true })
void linter
  .lintFiles([baseFilePath, recommendedFilePath])
  .then((report) => ESLint.outputFixes(report))
