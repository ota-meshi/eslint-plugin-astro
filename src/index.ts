import type { RuleModule } from "./types"
import { rules as ruleList } from "./utils/rules"
import { processor } from "./processor"
import { environment } from "./environment"

const rules = ruleList.reduce((obj, r) => {
  obj[r.meta.docs.ruleName] = r
  return obj
}, {} as { [key: string]: RuleModule })

export = {
  rules,
  processors: {
    ".astro": processor,
    astro: processor,
  },
  environments: {
    astro: environment,
  },
}
