import type { Linter } from "eslint"
import type { RuleModule } from "../types.ts"
import { buildFlatConfigs, buildLegacyConfigs } from "./configs.ts"
import { buildRules } from "./rules.ts"

/** Build a11y rules */
export function buildA11yRules(): RuleModule[] {
  return buildRules()
}

/** Build a11y configs */
export function buildA11yFlatConfigs(): Record<string, Linter.Config[]> {
  return buildFlatConfigs()
}

/** Build a11y configs */
export function buildA11yLegacyConfigs(): Record<string, Linter.Config> {
  return buildLegacyConfigs()
}
