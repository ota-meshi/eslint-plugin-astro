import { RuleTester, Linter } from "eslint"
import rule from "../../../src/rules/no-deprecated-astro-resolve"
import { loadTestCases } from "../../utils/utils"
import semver from "semver"

const eslintVersion = new Linter().version
if (semver.gte(eslintVersion, "8.0.0")) {
  const tester = new RuleTester({
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    globals: {
      Astro: false,
    },
  })

  tester.run(
    "no-deprecated-astro-resolve",
    rule as any,
    loadTestCases("no-deprecated-astro-resolve"),
  )
}
