// IMPORTANT!
// This file has been automatically generated,
// in order to update its content execute "npm run update"
import type { Linter } from "eslint"
const baseExtend = "plugin:astro/base"
export default {
  extends: [baseExtend],
  rules: {
    // eslint-plugin-astro rules
    "astro/missing-client-only-directive-value": "error",
    "astro/no-conflict-set-directives": "error",
    "astro/no-deprecated-astro-canonicalurl": "error",
    "astro/no-deprecated-astro-fetchcontent": "error",
    "astro/no-deprecated-astro-resolve": "error",
    "astro/no-deprecated-getentrybyslug": "error",
    "astro/no-unused-define-vars-in-style": "error",
    "astro/valid-compile": "error",
  },
} as Linter.LegacyConfig
