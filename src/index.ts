import type { RuleModule } from "./types"
import { rules as ruleList } from "./utils/rules"
import * as processors from "./processor"
import { environments } from "./environments"
import base from "./configs/base"
import recommended from "./configs/recommended"
import all from "./configs/all"
import flatBase from "./configs/flat/base"
import flatRecommended from "./configs/flat/recommended"
import flatAll from "./configs/flat/all"
import { buildA11yConfigs } from "./a11y"
import * as meta from "./meta"
import type { Linter } from "eslint"

const configs = {
  base: base as unknown as Linter.Config,
  recommended: recommended as Linter.Config,
  all: all as Linter.Config,
  "flat/base": flatBase as Linter.FlatConfig[],
  "flat/recommended": flatRecommended as Linter.FlatConfig[],
  "flat/all": flatAll as Linter.FlatConfig[],
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
