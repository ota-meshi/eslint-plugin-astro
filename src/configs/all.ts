import recommended from "./recommended"
import { rules } from "../rules"
import type { Linter } from "eslint"

const all: Record<string, string> = {}
for (const rule of rules.filter(
  (rule) => rule.meta.docs.available() && !rule.meta.deprecated,
)) {
  all[rule.meta.docs.ruleId] = "error"
}

export default {
  extends: recommended.extends,
  rules: {
    ...all,
    ...recommended.rules,
  },
} as Linter.LegacyConfig
