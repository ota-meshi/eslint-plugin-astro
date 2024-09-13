import flatBase from "./configs/flat/base"
import flatRecommended from "./configs/flat/recommended"
import flatAll from "./configs/flat/all"
import { buildA11yFlatConfigs } from "./a11y"
import type { Linter } from "eslint"

type ESMConfigs = {
  base: Linter.Config[]
  recommended: Linter.Config[]
  all: Linter.Config[]
  "jsx-a11y-strict": Linter.Config[]
  "jsx-a11y-recommended": Linter.Config[]
  // For backward compatibility
  "flat/base": Linter.Config[]
  "flat/recommended": Linter.Config[]
  "flat/all": Linter.Config[]
  "flat/jsx-a11y-strict": Linter.Config[]
  "flat/jsx-a11y-recommended": Linter.Config[]
}
/**
 * Build configs for ESM Module
 */
export function buildEsmConfigs(): ESMConfigs {
  const esmConfigs: ESMConfigs = {
    base: flatBase as Linter.Config[],
    recommended: flatRecommended as Linter.Config[],
    all: flatAll as Linter.Config[],
    "jsx-a11y-strict": null as never,
    "jsx-a11y-recommended": null as never,
    // For backward compatibility
    "flat/base": flatBase as Linter.Config[],
    "flat/recommended": flatRecommended as Linter.Config[],
    "flat/all": flatAll as Linter.Config[],
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
