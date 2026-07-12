import type { RuleModule } from "../types.ts"
import { createRule } from "../utils/index.ts"

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- Avoid isolatedDeclarations error
export default createRule("no-omitted-end-tags", {
  meta: {
    docs: {
      description: "disallow omitted end tags",
      category: "Stylistic Issues",
      recommended: false,
    },
    deprecated: {
      message:
        "This rule is no longer useful because omitted end tags are now rejected before ESLint rules can run.",
      url: "https://ota-meshi.github.io/eslint-plugin-astro/rules/no-omitted-end-tags/",
      replacedBy: [],
    },
    schema: [],
    messages: {},
    type: "layout",
  },
  create() {
    return {}
  },
}) as RuleModule
