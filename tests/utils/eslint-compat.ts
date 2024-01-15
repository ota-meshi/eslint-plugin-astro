import { ESLint as OriginalESLint } from "eslint"
import * as unsupported from "eslint/use-at-your-own-risk"
import { getRuleTester } from "eslint-compat-utils/rule-tester"

// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const ESLint = (unsupported as any).LegacyESLint || OriginalESLint
// eslint-disable-next-line @typescript-eslint/naming-convention -- class name
export const RuleTester = getRuleTester()
