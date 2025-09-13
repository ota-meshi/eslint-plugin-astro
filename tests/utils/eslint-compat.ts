import type { ESLint as OriginalESLint } from "eslint"
import { getRuleIdPrefix, getRuleTester } from "eslint-compat-utils/rule-tester"
import { getLegacyESLint, getESLint, LegacyESLint as OriginalLegacyESLint } from "eslint-compat-utils/eslint"

// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const LegacyESLint: OriginalLegacyESLint = getLegacyESLint()
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const RuleTester = getRuleTester()
export const testRuleIdPrefix = getRuleIdPrefix()
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const FlatESLint: typeof OriginalESLint = getESLint()
