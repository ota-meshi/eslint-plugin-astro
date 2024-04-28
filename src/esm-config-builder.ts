import flatBase from "./configs/flat/base"
import flatRecommended from "./configs/flat/recommended"
import flatAll from "./configs/flat/all"
import { buildA11yFlatConfigs } from "./a11y"
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
