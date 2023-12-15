import { Linter } from "eslint"

/**
 * Get the core rule implementation from the rule name
 */
export function getCoreRule(ruleName: string): any {
  try {
    return (new Linter() as any).getRules().get(ruleName)
  } catch {
    // ignore
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- ignore
  return require("eslint/use-at-your-own-risk").builtinRules.get(ruleName)
}
