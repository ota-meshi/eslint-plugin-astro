import { rules as ruleList } from "./rules"
import * as processorsDefines from "./processor"
import type { Linter, Rule } from "eslint"
import { name, version } from "./meta"
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
export type AstroPlugin = {
  meta: { name: string; version: string }
  environments: {
    astro: {
      globals: {
        Astro: boolean
        Fragment: boolean
      }
    }
  }
  rules: { [key: string]: Rule.RuleModule }
  processors: {
    ".astro": Linter.Processor
    astro: Linter.Processor
    "client-side-ts": Linter.Processor
  }
}
export const plugin: AstroPlugin = {
  meta: { name, version },
  environments,
  rules,
  processors,
}
