import type { RuleModule } from "../types"
import noSetHtmlDirective from "../rules/no-set-html-directive"
import noSetTextDirective from "../rules/no-set-text-directive"

export const rules = [noSetHtmlDirective, noSetTextDirective] as RuleModule[]
