import { Linter } from "eslint"
import rule from "../../../src/rules/no-deprecated-astro-resolve.ts"
import { loadTestCases } from "../../utils/utils.ts"
import semver from "semver"
import { RuleTester } from "../../utils/eslint-compat.ts"

const eslintVersion = new Linter().version
if (semver.gte(eslintVersion, "8.0.0")) {
  const tester = new RuleTester({
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        Astro: false,
      },
    },
  })

  tester.run(
    "no-deprecated-astro-resolve",
    rule as any,
    loadTestCases("no-deprecated-astro-resolve"),
  )
}
