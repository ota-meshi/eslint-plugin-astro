// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair -- ignore
/* eslint-disable func-style -- Arrow functions are better when returning string */
import type { RuleCategory, RuleModule } from "../src/types"
import { rules } from "../src/utils/rules"

const categories: RuleCategory[] = [
  "Possible Errors",
  "Security Vulnerability",
  "Best Practices",
  "Stylistic Issues",
  "A11Y Extension Rules",
  "Extension Rules",
  "System",
] as const

const descriptions: Record<RuleCategory, string> = {
  "Possible Errors":
    "These rules relate to possible syntax or logic errors in Astro component code:",
  "Security Vulnerability":
    "These rules relate to security vulnerabilities in Astro component code:",
  "Best Practices":
    "These rules relate to better ways of doing things to help you avoid problems:",
  "Stylistic Issues":
    "These rules relate to style guidelines, and are therefore quite subjective:",
  "A11Y Extension Rules":
    "These rules extend the rules provided by [eslint-plugin-jsx-a11y] to work well in Astro component:  \n(You need to install [eslint-plugin-jsx-a11y] to use the rules.)",
  "Extension Rules":
    "These rules extend the rules provided by ESLint itself to work well in Astro component:",
  System: "These rules relate to this plugin works:",
}

const activeRules = rules.filter((rule) => !rule.meta.deprecated)
const astroRules = activeRules
const deprecatedRules = rules.filter((rule) => rule.meta.deprecated)

activeRules.forEach((rule) => {
  if (!categories.includes(rule.meta.docs.category)) {
    throw new Error(`missing categories:${rule.meta.docs.category}`)
  }
})

type RulesGroupByCategory = {
  cat: RuleCategory
  description: string
  rules: RuleModule[]
}

const buildDefaultRulePath = (ruleName: string) => `./rules/${ruleName}.md`

type BuildRulePathFunc = typeof buildDefaultRulePath

const categoryRules: RulesGroupByCategory[] = categories.map((cat) => {
  return {
    cat,
    description: descriptions[cat],
    rules: astroRules.filter((rule) => rule.meta.docs.category === cat),
  }
})

//eslint-disable-next-line jsdoc/require-jsdoc -- ignore
function toRuleRow(rule: RuleModule, buildRulePath: BuildRulePathFunc) {
  const recommendedMark = rule.meta.docs.recommended ? "⭐" : ""
  const fixableMark = rule.meta.fixable ? "🔧" : ""
  const deprecatedMark = rule.meta.deprecated ? "⚠️" : ""
  const mark = recommendedMark + fixableMark + deprecatedMark
  const link = `[${rule.meta.docs.ruleId}](${buildRulePath(
    rule.meta.docs.ruleName || "",
  )})`
  const description = rule.meta.docs.description || "(no description)"

  return `| ${link} | ${description} | ${mark} |`
}

/**
 *
 */
function toTableRows(rules: RuleModule[], buildRulePath: BuildRulePathFunc) {
  return rules.map((rule) => toRuleRow(rule, buildRulePath)).join("\n")
}

//eslint-disable-next-line jsdoc/require-jsdoc -- ignore
function toDeprecatedRuleRow(
  rule: RuleModule,
  buildRulePath: BuildRulePathFunc,
) {
  const link = `[${rule.meta.docs.ruleId}](${buildRulePath(
    rule.meta.docs.ruleName || "",
  )})`
  const replacedRules = rule.meta.replacedBy || []
  const replacedBy = replacedRules
    .map((name) => `[astro/${name}](${buildRulePath(name)})`)
    .join(", ")

  return `| ${link} | ${replacedBy || "(no replacement)"} |`
}

const tableHeader = `
| Rule ID | Description |    |
|:--------|:------------|:---|`

const toTable = (
  { cat, description, rules }: RulesGroupByCategory,
  buildRulePath: BuildRulePathFunc,
) => `
## ${cat}

${description}
${tableHeader}
${toTableRows(rules, buildRulePath)}
`
const deprecatedTable = (buildRulePath: BuildRulePathFunc) => `
## Deprecated

- ⚠️ We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.
- 😇 We don't fix bugs which are in deprecated rules since we don't have enough resources.

${tableHeader}
${deprecatedRules.map((rule) => toDeprecatedRuleRow(rule, buildRulePath)).join("\n")}
`

const noRulesTableContent = `
*No rules have been provided yet.*
`

//eslint-disable-next-line jsdoc/require-jsdoc -- ignore
export default function renderRulesTableContent(
  buildRulePath = buildDefaultRulePath,
): string {
  let rulesTableContent = categoryRules
    .filter((cat) => cat.rules.length)
    .map((cat) => toTable(cat, buildRulePath))
    .join("")

  if (deprecatedRules.length >= 1) {
    rulesTableContent += deprecatedTable(buildRulePath)
  }
  if (!rulesTableContent.trim()) {
    return noRulesTableContent
  }
  return rulesTableContent
}
