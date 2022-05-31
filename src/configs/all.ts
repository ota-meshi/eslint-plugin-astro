import recommended from "./recommended"
import { rules } from "../utils/rules"

const all: Record<string, string> = {}
for (const rule of rules) {
  all[rule.meta.docs.ruleId] = "error"
}

export = {
  extends: recommended.extends,
  rules: {
    ...all,
    ...recommended.rules,
  },
}
