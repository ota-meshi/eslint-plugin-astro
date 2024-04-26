import { rules as ruleList } from "./utils/rules"
import * as processorsDefines from "./processor"
import type { Rule } from "eslint"

export * as meta from "./meta"
export { environments } from "./environments"

export const rules = ruleList.reduce(
  (obj, r) => {
    obj[r.meta.docs.ruleName] = r as never
    return obj
  },
  {} as { [key: string]: Rule.RuleModule },
)

export const processors = {
  ".astro": processorsDefines.astroProcessor,
  astro: processorsDefines.astroProcessor,
  "client-side-ts": processorsDefines.clientSideTsProcessor,
}
