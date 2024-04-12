import { rules as pluginRules } from "../../../../../src/utils/rules"
import { Linter } from "eslint"
import * as astroEslintParser from "astro-eslint-parser"
import { astroProcessor } from "../../../../../src/processor/index"
export const { preprocess, postprocess } = astroProcessor

export const categories = [
  {
    title: "Possible Errors",
    classes: "astro-category",
    rules: [],
  },
  {
    title: "Security Vulnerability",
    classes: "astro-category",
    rules: [],
  },
  {
    title: "Best Practices",
    classes: "astro-category",
    rules: [],
  },
  {
    title: "Stylistic Issues",
    classes: "astro-category",
    rules: [],
  },
  {
    title: "A11Y Extension Rules",
    classes: "astro-category",
    rules: [],
  },
  {
    title: "Extension Rules",
    classes: "astro-category",
    rules: [],
  },
  {
    title: "System",
    classes: "astro-category",
    rules: [],
  },
  {
    type: "problem",
    title: "Possible Errors (CORE)",
    classes: "core-category",
    rules: [],
  },
  {
    type: "suggestion",
    title: "Suggestions (CORE)",
    classes: "core-category",
    rules: [],
  },
  {
    type: "layout",
    title: "Layout & Formatting (CORE)",
    classes: "core-category",
    rules: [],
  },
]
export const DEFAULT_RULES_CONFIG = {}

const rules = []
for (const rule of pluginRules) {
  if (rule.meta.deprecated) {
    continue
  }
  const data = {
    ruleId: rule.meta.docs.ruleId,
    rule,
    classes: "svelte-rule",
    url: rule.meta.docs.url,
  }
  rules.push(data)
  const category = rule.meta.docs.category
  categories.find((c) => c.title === category).rules.push(data)

  // if (rule.meta.docs.recommended) {
  DEFAULT_RULES_CONFIG[rule.meta.docs.ruleId] = "error"
  // }
}

for (const [ruleId, rule] of new Linter().getRules()) {
  if (rule.meta.deprecated) {
    continue
  }
  const data = {
    ruleId,
    rule,
    classes: "core-rule",
    url: rule.meta.docs.url,
  }
  rules.push(data)
  const type = rule.meta.type
  categories.find((c) => c.type === type).rules.push(data)

  if (rule.meta.docs.recommended && ruleId !== "no-inner-declarations") {
    DEFAULT_RULES_CONFIG[ruleId] = "error"
  }
}

/** Get rule data */
export function getRule(ruleId) {
  for (const cat of categories) {
    for (const rule of cat.rules) {
      if (rule.ruleId === ruleId) {
        return rule
      }
    }
  }
  return ""
}

export async function createLinter() {
  const tsParser = await import("@typescript-eslint/parser")
  const linter = new Linter()
  linter.defineParser("astro-auto-eslint-parser", {
    parseForESLint(code, options) {
      if (options.filePath.endsWith(".astro"))
        return astroEslintParser.parseForESLint(code, options)

      return tsParser.parseForESLint(code, options)
    },
  })
  for (const rule of pluginRules) {
    linter.defineRule(rule.meta.docs.ruleId, /** @type {any} */ (rule))
  }

  await astroEslintParser.setup()

  return linter
}
