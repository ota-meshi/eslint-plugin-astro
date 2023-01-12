import type { RuleModule } from "../src/types"
import { rules } from "../src/utils/rules"

const categories = [
  "Possible Errors",
  "Security Vulnerability",
  "Best Practices",
  "Stylistic Issues",
  "A11Y Extension Rules",
  "Extension Rules",
  "System",
] as const

const descriptions: Record<(typeof categories)[number], string> = {
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

const categoryRules = categories.map((cat) => {
  return {
    title: cat,
    rules: astroRules.filter((rule) => rule.meta.docs.category === cat),
  }
})

//eslint-disable-next-line require-jsdoc -- ignore
export default function renderRulesTableContent(
  buildRulePath = (ruleName: string) => `./rules/${ruleName}.md`,
): string {
  // -----------------------------------------------------------------------------

  //eslint-disable-next-line require-jsdoc -- ignore
  function toRuleRow(rule: RuleModule) {
    const mark = `${rule.meta.docs.recommended ? ":star:" : ""}${
      rule.meta.fixable ? ":wrench:" : ""
    }${rule.meta.deprecated ? ":warning:" : ""}`
    const link = `[${rule.meta.docs.ruleId}](${buildRulePath(
      rule.meta.docs.ruleName || "",
    )})`
    const description = rule.meta.docs.description || "(no description)"

    return `| ${link} | ${description} | ${mark} |`
  }

  //eslint-disable-next-line require-jsdoc -- ignore
  function toDeprecatedRuleRow(rule: RuleModule) {
    const link = `[${rule.meta.docs.ruleId}](${buildRulePath(
      rule.meta.docs.ruleName || "",
    )})`
    const replacedRules = rule.meta.replacedBy || []
    const replacedBy = replacedRules
      .map((name) => `[astro/${name}](${buildRulePath(name)})`)
      .join(", ")

    return `| ${link} | ${replacedBy || "(no replacement)"} |`
  }

  // -----------------------------------------------------------------------------
  let rulesTableContent = categoryRules
    .filter((cat) => cat.rules.length)
    .map((cat) => {
      return `
## ${cat.title}

${descriptions[cat.title]}

| Rule ID | Description |    |
|:--------|:------------|:---|
${cat.rules.map(toRuleRow).join("\n")}
`
    })
    .join("")

  // -----------------------------------------------------------------------------
  if (deprecatedRules.length >= 1) {
    rulesTableContent += `
## Deprecated

- :warning: We're going to remove deprecated rules in the next major release. Please migrate to successor/new rules.
- :innocent: We don't fix bugs which are in deprecated rules since we don't have enough resources.

| Rule ID | Replaced by |
|:--------|:------------|
${deprecatedRules.map(toDeprecatedRuleRow).join("\n")}
`
  }
  if (!rulesTableContent.trim()) {
    return `
*No rules have been provided yet.*
`
  }
  return rulesTableContent
}
