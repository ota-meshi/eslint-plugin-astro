import type * as eslint from "eslint"
import { getRuleIdPrefix, getRuleTester } from "eslint-compat-utils/rule-tester"
import { getLegacyESLint, getESLint } from "eslint-compat-utils/eslint"
import type { LegacyESLint as OriginalLegacyESLint } from "eslint/use-at-your-own-risk"

// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const LegacyESLint: typeof OriginalLegacyESLint = getLegacyESLint()
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const RuleTester: typeof eslint.RuleTester = getRuleTester()
export const testRuleIdPrefix: string = getRuleIdPrefix()
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const FlatESLint: typeof eslint.ESLint = getESLint()
