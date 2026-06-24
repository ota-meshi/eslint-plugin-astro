import { RuleTester } from "eslint"
import rule from "../../../src/rules/no-omitted-end-tags.ts"
import { loadTestCases } from "../../utils/utils.ts"

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
})

tester.run(
  "no-omitted-end-tags",
  rule as any,
  loadTestCases("no-omitted-end-tags"),
)
