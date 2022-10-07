import fs from "fs"
import path from "path"
import type { RuleTester } from "eslint"
import { Linter } from "eslint"
import * as astroESLintParser from "astro-eslint-parser"
// eslint-disable-next-line @typescript-eslint/no-require-imports -- tests
import plugin = require("../../src/index")
import { applyFixes } from "./source-code-fixer"

/**
 * Prevents leading spaces in a multiline template literal from appearing in the resulting string
 */
export function unIndent(strings: readonly string[]): string {
  const templateValue = strings[0]
  const lines = templateValue.split("\n")
  const minLineIndent = getMinIndent(lines)

  return lines.map((line) => line.slice(minLineIndent)).join("\n")
}

/**
 * for `code` and `output`
 */
export function unIndentCodeAndOutput([code]: readonly string[]): (
  args: readonly string[],
) => {
  code: string
  output: string
} {
  const codeLines = code.split("\n")
  const codeMinLineIndent = getMinIndent(codeLines)

  return ([output]: readonly string[]) => {
    const outputLines = output.split("\n")
    const minLineIndent = Math.min(getMinIndent(outputLines), codeMinLineIndent)

    return {
      code: codeLines.map((line) => line.slice(minLineIndent)).join("\n"),
      output: outputLines.map((line) => line.slice(minLineIndent)).join("\n"),
    }
  }
}

/**
 * Get number of minimum indent
 */
function getMinIndent(lines: string[]) {
  const lineIndents = lines
    .filter((line) => line.trim())
    .map((line) => / */u.exec(line)![0].length)
  return Math.min(...lineIndents)
}

/**
 * Load test cases
 */
export function loadTestCases(
  ruleName: string,
  options?: {
    additionals?: {
      valid?: (RuleTester.ValidTestCase | string)[]
      invalid?: RuleTester.InvalidTestCase[]
    }
    filter: (file: string) => boolean
  },
): {
  valid: RuleTester.ValidTestCase[]
  invalid: RuleTester.InvalidTestCase[]
} {
  const validFixtureRoot = path.resolve(
    __dirname,
    `../fixtures/rules/${ruleName}/valid/`,
  )
  const invalidFixtureRoot = path.resolve(
    __dirname,
    `../fixtures/rules/${ruleName}/invalid/`,
  )

  const filter = options?.filter ?? (() => true)

  const valid = listupInput(validFixtureRoot)
    .filter((file) => !path.basename(file).startsWith("_"))
    .filter(filter)
    .map((inputFile) => getConfig(ruleName, inputFile))

  const fixable = plugin.rules[ruleName].meta.fixable != null

  const invalid = listupInput(invalidFixtureRoot)
    .filter((file) => !path.basename(file).startsWith("_"))
    .filter(filter)
    .map((inputFile) => {
      const config = getConfig(ruleName, inputFile)
      const errorFile = inputFile.replace(/input\.astro$/u, "errors.json")
      const outputFile = inputFile.replace(/input\.astro$/u, "output.astro")
      let errors
      try {
        errors = fs.readFileSync(errorFile, "utf8")
      } catch (_e) {
        writeFixtures(ruleName, inputFile)
        errors = fs.readFileSync(errorFile, "utf8")
      }
      config.errors = JSON.parse(errors)
      if (fixable) {
        let output
        try {
          output = fs.readFileSync(outputFile, "utf8")
        } catch (_e) {
          writeFixtures(ruleName, inputFile)
          output = fs.readFileSync(outputFile, "utf8")
        }
        config.output = output
      }

      return config
    })

  if (options?.additionals) {
    if (options.additionals.valid) {
      valid.push(...options.additionals.valid)
    }
    if (options.additionals.invalid) {
      invalid.push(...options.additionals.invalid)
    }
  }
  for (const test of valid) {
    if (!test.code) {
      throw new Error(`Empty code: ${test.filename}`)
    }
  }
  for (const test of invalid) {
    if (!test.code) {
      throw new Error(`Empty code: ${test.filename}`)
    }
  }
  return {
    valid,
    invalid,
  }
}

function listupInput(rootDir: string) {
  return [...itrListupInput(rootDir)]
}

function* itrListupInput(rootDir: string): IterableIterator<string> {
  for (const filename of fs.readdirSync(rootDir)) {
    if (filename.startsWith("_")) {
      // ignore
      continue
    }
    const abs = path.join(rootDir, filename)
    if (filename.endsWith("input.astro")) {
      yield abs
    } else if (fs.statSync(abs).isDirectory()) {
      yield* itrListupInput(abs)
    }
  }
}

function writeFixtures(
  ruleName: string,
  inputFile: string,
  { force }: { force?: boolean } = {},
) {
  const linter = getLinter(ruleName)
  const errorFile = inputFile.replace(/input\.astro$/u, "errors.json")
  const outputFile = inputFile.replace(/input\.astro$/u, "output.astro")

  const config = getConfig(ruleName, inputFile)

  const result = linter.verify(
    config.code,
    {
      rules: {
        [ruleName]: ["error", ...(config.options || [])],
      },
      parser: "astro-eslint-parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
      },
      globals: {
        Astro: false,
      },
    },
    config.filename,
  )
  if (force || !fs.existsSync(errorFile)) {
    fs.writeFileSync(
      errorFile,
      `${JSON.stringify(
        result.map((m) => ({
          message: m.message,
          line: m.line,
          column: m.column,
        })),
        null,
        2,
      )}\n`,
      "utf8",
    )
  }

  if (force || !fs.existsSync(outputFile)) {
    const output = applyFixes(config.code, result).output

    if (plugin.rules[ruleName].meta.fixable != null) {
      fs.writeFileSync(outputFile, output, "utf8")
    }
  }
}

function getLinter(ruleName: string) {
  const linter = new Linter()
  // @ts-expect-error for test
  linter.defineParser("astro-eslint-parser", astroESLintParser)
  linter.defineRule(ruleName, plugin.rules[ruleName] as any)

  return linter
}

function getConfig(ruleName: string, inputFile: string) {
  const filename = inputFile.slice(inputFile.indexOf(ruleName))
  const code = fs.readFileSync(inputFile, "utf8")
  let config
  let configFile: string = inputFile.replace(/input\.astro$/u, "config.json")
  if (!fs.existsSync(configFile)) {
    configFile = path.join(path.dirname(inputFile), "_config.json")
  }
  if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile, "utf8"))
  }
  if (config && typeof config === "object") {
    return Object.assign(
      { parser: require.resolve("astro-eslint-parser") },
      config,
      { code, filename },
    )
  }
  // default
  return Object.assign(
    { parser: require.resolve("astro-eslint-parser") },
    { code, filename },
  )
}
