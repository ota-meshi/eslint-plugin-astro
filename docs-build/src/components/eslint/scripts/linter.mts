import { rules as pluginRules } from "../../../../../src/utils/rules.js"
import type { Linter, Rule } from "eslint"
import { builtinRules } from "eslint/use-at-your-own-risk"
import * as astroEslintParser from "astro-eslint-parser"
import * as processors from "../../../../../src/processor/index.js"
import globals from "globals"

export const categories: {
  title: string
  classes: string
  rules: {
    ruleId: string
    rule: Rule.RuleModule
    classes: string
    url: string
  }[]
  type?: string
}[] = [
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
export const DEFAULT_RULES_CONFIG: Record<string, string> = {}

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
  categories.find((c) => c.title === category)!.rules.push(data as never)

  // if (rule.meta.docs.recommended) {
  DEFAULT_RULES_CONFIG[rule.meta.docs.ruleId] = "error"
  // }
}

for (const [ruleId, rule] of builtinRules) {
  if (rule.meta!.deprecated) {
    continue
  }
  const data = {
    ruleId,
    rule,
    classes: "core-rule",
    url: rule.meta!.docs!.url,
  }
  rules.push(data)
  const type = rule.meta!.type
  categories.find((c) => c.type === type)!.rules.push(data as never)

  if (rule.meta!.docs!.recommended && ruleId !== "no-inner-declarations") {
    DEFAULT_RULES_CONFIG[ruleId] = "error"
  }
}

/** Get rule data */
export function getRule(ruleId: string) {
  for (const cat of categories) {
    for (const rule of cat.rules) {
      if (rule.ruleId === ruleId) {
        return rule
      }
    }
  }
  return ""
}

export function rulesMap(): Map<string, Rule.RuleModule> {
  return new Map<string, Rule.RuleModule>([
    ...builtinRules,
    ...pluginRules.map(
      (rule) => [rule.meta.docs.ruleId, rule as never] as const,
    ),
  ])
}

export async function createLinterConfig(): Promise<Linter.FlatConfig[]> {
  const tsParser = await import("@typescript-eslint/parser")

  await (astroEslintParser as any).setup()
  return [
    {
      files: ["**"],
      plugins: {
        astro: {
          rules: Object.fromEntries(
            pluginRules.map((rule) => [rule.meta.docs.ruleName, rule]),
          ) as Record<string, Rule.RuleModule>,
          processors: {
            astro: processors.astroProcessor,
            "client-side-ts": processors.clientSideTsProcessor,
          },
        },
      },
      languageOptions: {
        globals: {
          Astro: false,
          // JSX Fragment
          Fragment: false,

          // Markdown properties
          Layout: false,
          frontmatter: false,
          metadata: false,
          rawContent: false,
          compiledContent: false,

          ...globals.browser,
          ...globals.es2021,
        },
      },
    },
    {
      files: ["**/*.ts", "*.ts"],
      languageOptions: {
        parser: tsParser,
      },
    },
    {
      files: ["**/.astro", "*.astro"],
      languageOptions: {
        parser: astroEslintParser,
        parserOptions: {
          parser: tsParser,
        },
      },
      processor: "astro/client-side-ts",
    },
  ]
}
