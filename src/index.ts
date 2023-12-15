import type { RuleModule } from "./types"
import { rules as ruleList } from "./utils/rules"
import * as processors from "./processor"
import { environments } from "./environments"
import base from "./configs/base"
import recommended from "./configs/recommended"
import all from "./configs/all"
import { buildA11yConfigs } from "./a11y"
import * as meta from "./meta"

const configs = {
  base,
  recommended,
  all,
  ...buildA11yConfigs(),
}

const a11yConfigs = buildA11yConfigs()
for (const configName of Object.keys(a11yConfigs)) {
  Object.defineProperty(configs, configName, {
    enumerable: true,
    get() {
      return a11yConfigs[configName]
    },
  })
}

const rules = ruleList.reduce(
  (obj, r) => {
    obj[r.meta.docs.ruleName] = r
    return obj
  },
  {} as { [key: string]: RuleModule },
)

export = {
  meta,
  configs,
  rules,
  processors: {
    ".astro": processors.astroProcessor,
    astro: processors.astroProcessor,
    "client-side-ts": processors.clientSideTsProcessor,
  },
  environments,
}
