import type * as eslint from "eslint"
import { getRuleIdPrefix, getRuleTester } from "eslint-compat-utils/rule-tester"
import { getLegacyESLint, getESLint } from "eslint-compat-utils/eslint"

// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const LegacyESLint: new (args: any) => {
  lintText: eslint.ESLint["lintText"]
} = getLegacyESLint()
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const RuleTester: typeof eslint.RuleTester = getRuleTester()
export const testRuleIdPrefix: string = getRuleIdPrefix()
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const FlatESLint: typeof eslint.ESLint = getESLint()
