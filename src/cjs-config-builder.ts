import { buildLegacyBase } from "./configs/base"
import recommended from "./configs/recommended"
import all from "./configs/all"
import flatBase from "./configs/flat/base"
import flatRecommended from "./configs/flat/recommended"
import flatAll from "./configs/flat/all"
import { buildA11yFlatConfigs, buildA11yLegacyConfigs } from "./a11y"
import type { Linter } from "eslint"

type CJSConfigs = {
  base: Linter.LegacyConfig
  recommended: Linter.LegacyConfig
  all: Linter.LegacyConfig
  "jsx-a11y-strict": Linter.LegacyConfig
  "jsx-a11y-recommended": Linter.LegacyConfig
  "flat/base": Linter.Config[]
  "flat/recommended": Linter.Config[]
  "flat/all": Linter.Config[]
  "flat/jsx-a11y-strict": Linter.Config[]
  "flat/jsx-a11y-recommended": Linter.Config[]
}

/**
 * Build configs for CJS Module
 */
export function buildCjsConfigs(): CJSConfigs {
  const cjsConfigs: CJSConfigs = {
    base: buildLegacyBase(),
    recommended: recommended as Linter.LegacyConfig,
    all: all as Linter.LegacyConfig,
    "jsx-a11y-strict": null as never as Linter.LegacyConfig,
    "jsx-a11y-recommended": null as never as Linter.LegacyConfig,
    "flat/base": flatBase as Linter.Config[],
    "flat/recommended": flatRecommended as Linter.Config[],
    "flat/all": flatAll as Linter.Config[],
    "flat/jsx-a11y-strict": null as never as Linter.Config[],
    "flat/jsx-a11y-recommended": null as never as Linter.Config[],
  }

  const a11yFlatConfigs = buildA11yFlatConfigs()
  for (const configName of Object.keys(a11yFlatConfigs)) {
    Object.defineProperty(cjsConfigs, `flat/${configName}`, {
      enumerable: true,
      get() {
        return a11yFlatConfigs[configName]
      },
    })
  }
  const a11yLegacyConfigs = buildA11yLegacyConfigs()
  for (const configName of Object.keys(a11yLegacyConfigs)) {
    Object.defineProperty(cjsConfigs, configName, {
      enumerable: true,
      get() {
        return a11yLegacyConfigs[configName]
      },
    })
  }
  return cjsConfigs
}
