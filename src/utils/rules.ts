import type { RuleModule } from "../types"
import noConflictSetDirectives from "../rules/no-conflict-set-directives"
import noSetHtmlDirective from "../rules/no-set-html-directive"
import noSetTextDirective from "../rules/no-set-text-directive"
import noUnusedDefineVarsInStyle from "../rules/no-unused-define-vars-in-style"
import preferClassListDirective from "../rules/prefer-class-list-directive"
import preferObjectClassList from "../rules/prefer-object-class-list"
import preferSplitClassList from "../rules/prefer-split-class-list"

export const rules = [
  noConflictSetDirectives,
  noSetHtmlDirective,
  noSetTextDirective,
  noUnusedDefineVarsInStyle,
  preferClassListDirective,
  preferObjectClassList,
  preferSplitClassList,
] as RuleModule[]
