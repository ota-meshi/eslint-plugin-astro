import { buildLegacyBase } from "./configs/base"
import recommended from "./configs/recommended"
import all from "./configs/all"
import flatBase from "./configs/flat/base"
import flatRecommended from "./configs/flat/recommended"
import flatAll from "./configs/flat/all"
import { buildA11yFlatConfigs, buildA11yLegacyConfigs } from "./a11y"
import type { Linter } from "eslint"

type ESMConfigs = {
  base: Linter.FlatConfig[]
  recommended: Linter.FlatConfig[]
  all: Linter.FlatConfig[]
  "jsx-a11y-strict": Linter.FlatConfig[]
  "jsx-a11y-recommended": Linter.FlatConfig[]
  // For backward compatibility
  "flat/base": Linter.FlatConfig[]
  "flat/recommended": Linter.FlatConfig[]
  "flat/all": Linter.FlatConfig[]
  "flat/jsx-a11y-strict": Linter.FlatConfig[]
  "flat/jsx-a11y-recommended": Linter.FlatConfig[]
}
/**
 * Build configs for ESM Module
 */
export function buildEsmConfigs(): ESMConfigs {
  const esmConfigs: ESMConfigs = {
    base: flatBase as Linter.FlatConfig[],
    recommended: flatRecommended as Linter.FlatConfig[],
    all: flatAll as Linter.FlatConfig[],
    "jsx-a11y-strict": null as never,
    "jsx-a11y-recommended": null as never,
    // For backward compatibility
    "flat/base": flatBase as Linter.FlatConfig[],
    "flat/recommended": flatRecommended as Linter.FlatConfig[],
    "flat/all": flatAll as Linter.FlatConfig[],
    "flat/jsx-a11y-strict": null as never,
    "flat/jsx-a11y-recommended": null as never,
  }

  const a11yFlatConfigs = buildA11yFlatConfigs()
  for (const configName of Object.keys(a11yFlatConfigs)) {
    Object.defineProperty(esmConfigs, configName, {
      enumerable: true,
      get() {
        return a11yFlatConfigs[configName]
      },
    })
    Object.defineProperty(esmConfigs, `flat/${configName}`, {
      enumerable: true,
      get() {
        return a11yFlatConfigs[configName]
      },
    })
  }

  return esmConfigs
}

type CJSConfigs = {
  base: Linter.Config
  recommended: Linter.Config
  all: Linter.Config
  "jsx-a11y-strict": Linter.Config
  "jsx-a11y-recommended": Linter.Config
  "flat/base": Linter.FlatConfig[]
  "flat/recommended": Linter.FlatConfig[]
  "flat/all": Linter.FlatConfig[]
  "flat/jsx-a11y-strict": Linter.FlatConfig[]
  "flat/jsx-a11y-recommended": Linter.FlatConfig[]
}

/**
 * Build configs for CJS Module
 */
export function buildCjsConfigs(): CJSConfigs {
  const cjsConfigs: CJSConfigs = {
    base: buildLegacyBase(),
    recommended: recommended as Linter.Config,
    all: all as Linter.Config,
    "jsx-a11y-strict": null as never as Linter.Config,
    "jsx-a11y-recommended": null as never as Linter.Config,
    "flat/base": flatBase as Linter.FlatConfig[],
    "flat/recommended": flatRecommended as Linter.FlatConfig[],
    "flat/all": flatAll as Linter.FlatConfig[],
    "flat/jsx-a11y-strict": null as never as Linter.FlatConfig[],
    "flat/jsx-a11y-recommended": null as never as Linter.FlatConfig[],
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
