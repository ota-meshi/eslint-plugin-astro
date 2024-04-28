import { rules as ruleList } from "./utils/rules"
import * as processorsDefines from "./processor"
import type { Rule } from "eslint"
import * as meta from "./meta"
import { environments } from "./environments"

const rules = ruleList.reduce(
  (obj, r) => {
    obj[r.meta.docs.ruleName] = r as never
    return obj
  },
  {} as { [key: string]: Rule.RuleModule },
)
const processors = {
  ".astro": processorsDefines.astroProcessor,
  astro: processorsDefines.astroProcessor,
  "client-side-ts": processorsDefines.clientSideTsProcessor,
}
export const plugin = {
  meta,
  environments,
  rules,
  processors,
}
