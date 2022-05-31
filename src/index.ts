import type { RuleModule } from "./types"
import { rules as ruleList } from "./utils/rules"
import { processor } from "./processor"
import { environment } from "./environment"
import base from "./configs/base"
import recommended from "./configs/recommended"
import all from "./configs/all"

const configs = {
  base,
  recommended,
  all,
}

const rules = ruleList.reduce((obj, r) => {
  obj[r.meta.docs.ruleName] = r
  return obj
}, {} as { [key: string]: RuleModule })

export = {
  configs,
  rules,
  processors: {
    ".astro": processor,
    astro: processor,
  },
  environments: {
    astro: environment,
  },
}
