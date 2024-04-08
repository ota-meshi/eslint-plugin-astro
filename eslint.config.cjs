"use strict"

const { FlatCompat } = require("@eslint/eslintrc")
const js = require("@eslint/js")
const fs = require("fs")
const path = require("path")
const compat = new FlatCompat({
  recommendedConfig: js.configs.recommended,
})
const ignores = fs
  .readFileSync(".eslintignore", "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((line) =>
    line.replace(/^(!?)(.*)$/u, (_, negate, pattern) => {
      let suffix = ""
      if (
        fs.statSync(`./${pattern}`, { throwIfNoEntry: false })?.isDirectory()
      ) {
        suffix = "/**"
      }
      if (pattern.startsWith("/")) {
        return `${negate}${pattern.slice(1)}${suffix}`
      }
      return `${negate}${pattern}${suffix}`
    }),
  )
module.exports = [
  {
    ignores: [
      ...ignores,
      "**/*.md/*.sh",
      "**/*.md/*.bash",
      "**/*.md/*.typescript",
      "**/*.md/*.jsx",
    ],
  },
  ...extendsFromDir("."),
  ...extendsFromDir("./docs-build"),
  ...extendsFromDir("./tests/fixtures/rules"),
  ...extendsFromDir("./tests/fixtures/rules/prefer-split-class-list/invalid"),
  ...extendsFromDir("./tests/fixtures/rules/prefer-object-class-list/invalid"),
  {
    rules: {
      "jsdoc/require-returns": "off",
      "jsdoc/require-param": "off",
    },
  },
]

/** */
function extendsFromDir(dirName) {
  const absoluteDirName = path.resolve(process.cwd(), dirName)
  const relativeDirName = path.relative(process.cwd(), absoluteDirName)
  return compat.extends(`${absoluteDirName}/.eslintrc.js`).map((config) => ({
    ...config,
    ...(relativeDirName
      ? {
          files: config.files
            ? config.files.map((file) => {
                if (typeof file === "function") {
                  return (absoluteFileName) =>
                    absoluteFileName.startsWith(`${absoluteDirName}/`) &&
                    file(absoluteFileName)
                }
                return [
                  `${relativeDirName}/${file}`,
                  `${relativeDirName}/**/${file}`,
                ]
              })
            : [`${relativeDirName}/**`],
        }
      : {}),
  }))
}
