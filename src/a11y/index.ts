import type { RuleModule } from "../types"
import { buildConfigs } from "./configs"
import { buildRules } from "./rules"

/** Build a11y rules */
export function buildA11yRules(): RuleModule[] {
  return buildRules()
}

/** Build a11y configs */
export function buildA11yConfigs(): Record<string, unknown> {
  return buildConfigs()
}
