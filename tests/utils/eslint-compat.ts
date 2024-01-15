import { ESLint as OriginalESLint } from "eslint"
import { getRuleTester } from "eslint-compat-utils/rule-tester"
// @ts-expect-error -- missing type
import { FlatCompat } from "@eslint/eslintrc"
import astroPlugin from "../../src/index"

// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const LegacyESLint: typeof OriginalESLint =
  getUnsupported().LegacyESLint || OriginalESLint
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const RuleTester = getRuleTester()

function getUnsupported() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- ignore
    return require("eslint/use-at-your-own-risk")
  } catch {
    return {}
  }
}

export function convertFlatConfig(originalConfig: any) {
  const compat = new FlatCompat()
  return compat.config(originalConfig).map((config: any) => {
    if (!config.plugins?.astro) {
      return config
    }
    return {
      ...config,
      plugins: { ...config.plugins, astro: astroPlugin },
    }
  })
}
