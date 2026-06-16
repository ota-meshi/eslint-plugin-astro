import { builtinRules } from "eslint/use-at-your-own-risk"

/**
 * Get the core rule implementation from the rule name
 */
export function getCoreRule(ruleName: string): any {
  return builtinRules.get(ruleName)
}
