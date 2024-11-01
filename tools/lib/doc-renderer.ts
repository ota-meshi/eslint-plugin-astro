import type { RuleModule } from "src/types"

type RuleDocHeader = {
  ruleId: string
  description: string
  notes: string[]
}
/**
 * Render the header of the doc file of a rule.
 *
 * example header:
 * ```
 * # astro/no-unused-vars
 *
 * > description
 *
 * - note1
 * - note2
 *
 * ```
 * Note that there are newlines between the parts of the header
 * and there is a trailing newline at the end.
 */
export function renderRuleHeader({
  ruleId,
  description,
  notes,
}: RuleDocHeader): string {
  const hasNotes = notes.length > 0
  const notesStr = hasNotes ? `${notes.join("\n")}\n\n` : ""
  return `# ${ruleId}\n\n> ${description}\n\n${notesStr}`
}

//eslint-disable-next-line jsdoc/require-jsdoc -- tools
function formatItems(items: string[]) {
  if (items.length <= 2) {
    return items.join(" and ")
  }
  return `all of ${items.slice(0, -1).join(", ")} and ${
    items[items.length - 1]
  }`
}

/**
 * Build notes from a rule for rendering the header of the doc file.
 */
export function buildNotesFromRule(rule: RuleModule, isNew: boolean): string[] {
  const {
    meta: {
      fixable,
      hasSuggestions,
      deprecated,
      replacedBy,
      docs: { recommended },
    },
  } = rule
  const notes = []

  if (deprecated) {
    if (replacedBy) {
      const replacedRules = replacedBy.map(
        (name) => `[astro/${name}](${name}.md) rule`,
      )
      notes.push(
        `- ⚠️ This rule was **deprecated** and replaced by ${formatItems(
          replacedRules,
        )}.`,
      )
    } else {
      notes.push("- ⚠️ This rule was **deprecated**.")
    }
  } else if (recommended) {
    if (recommended === "base") {
      notes.push(
        '- ⚙ This rule is included in `"plugin:astro/base"` and `"plugin:astro/recommended"`.',
      )
    } else {
      notes.push('- ⚙ This rule is included in `"plugin:astro/recommended"`.')
    }
  }
  if (fixable) {
    notes.push(
      "- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.",
    )
  }
  if (hasSuggestions) {
    notes.push(
      "- 💡 Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).",
    )
  }
  if (isNew) {
    notes.push(
      `- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>`,
    )
  }
  return notes
}
