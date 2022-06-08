import type { RuleModule, PartialRuleModule } from "../types"

/**
 * Define the rule.
 * @param ruleName ruleName
 * @param rule rule module
 */
export function createRule(
  ruleName: string,
  rule: PartialRuleModule,
): RuleModule {
  return {
    meta: {
      ...rule.meta,
      docs: {
        available: () => true,
        ...rule.meta.docs,
        url: `https://ota-meshi.github.io/eslint-plugin-astro/rules/${ruleName}/`,
        ruleId: `astro/${ruleName}`,
        ruleName,
      },
    },
    create: rule.create as never,
  }
}
