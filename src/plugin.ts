import { rules as ruleList } from "./rules"
import * as processorsDefines from "./processor"
import type { Linter, Rule } from "eslint"
import { name, version } from "./meta"
import { environments } from "./environments"

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
let _plugin: AstroPlugin | undefined

/**
 * Get ESLint Plugin object
 */
export function getPlugin(): AstroPlugin {
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

  // lazy load to avoid bundling issue
  return (_plugin ??= {
    meta: { name, version },
    environments,
    rules,
    processors,
  })
}
// export const plugin: AstroPlugin =
