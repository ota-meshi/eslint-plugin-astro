import recommended from "./recommended"
import { rules } from "../../utils/rules"

const all: Record<string, string> = {}
for (const rule of rules.filter(
  (rule) => rule.meta.docs.available() && !rule.meta.deprecated,
)) {
  all[rule.meta.docs.ruleId] = "error"
}

export default [
  ...recommended,
  {
    rules: {
      ...all,
      ...recommended[recommended.length - 1].rules,
    },
  },
]
