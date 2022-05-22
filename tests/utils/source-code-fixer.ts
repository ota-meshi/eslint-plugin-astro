/**
 * Copy from https://github.com/eslint/eslint/blob/master/lib/linter/source-code-fixer.js
 * @see https://github.com/eslint/eslint/issues/14936
 */
/**
 * @fileoverview An object that caches and applies source code fixes.
 * @author Nicholas C. Zakas
 */

import type { Linter } from "eslint"

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

//  const debug = require("debug")("eslint:source-code-fixer");
type Message = {
  fix?: Linter.LintMessage["fix"]
}

type HasFixMessage = Message & {
  fix: NonNullable<Message["fix"]>
}

function hasFixMessage(m: Message): m is HasFixMessage {
  return Boolean(m.fix)
}
// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

const BOM = "\uFEFF"

/**
 * Compares items in a messages array by range.
 * @param {Message} a The first message.
 * @param {Message} b The second message.
 * @returns {int} -1 if a comes before b, 1 if a comes after b, 0 if equal.
 * @private
 */
function compareMessagesByFixRange(a: HasFixMessage, b: HasFixMessage) {
  return a.fix.range[0] - b.fix.range[0] || a.fix.range[1] - b.fix.range[1]
}

/**
 * Compares items in a messages array by line and column.
 * @param {Message} a The first message.
 * @param {Message} b The second message.
 * @returns {int} -1 if a comes before b, 1 if a comes after b, 0 if equal.
 * @private
 */
function compareMessagesByLocation(a: any, b: any) {
  return a.line - b.line || a.column - b.column
}

// ------------------------------------------------------------------------------
// Public Interface
// ------------------------------------------------------------------------------

/**
 * Applies the fixes specified by the messages to the given text. Tries to be
 * smart about the fixes and won't apply fixes over the same area in the text.
 * @param {string} sourceText The text to apply the changes to.
 * @param {Message[]} messages The array of messages reported by ESLint.
 * @param {boolean|Function} [shouldFix=true] Determines whether each message should be fixed
 * @returns {Object} An object containing the fixed text and any unfixed messages.
 */
export function applyFixes<M extends Message>(
  sourceText: string,
  messages: M[],
  shouldFix: boolean | ((m: M) => boolean) = true,
): {
  fixed: boolean
  messages: M[]
  output: string
} {
  //  debug("Applying fixes");

  if (shouldFix === false) {
    //  debug("shouldFix parameter was false, not attempting fixes");
    return {
      fixed: false,
      messages,
      output: sourceText,
    }
  }

  // clone the array
  const remainingMessages = []
  const fixes: (HasFixMessage & M)[] = []
  const bom = sourceText.startsWith(BOM) ? BOM : ""
  const text = bom ? sourceText.slice(1) : sourceText
  let lastPos = Number.NEGATIVE_INFINITY
  let output = bom

  /**
   * Try to use the 'fix' from a problem.
   * @param   {Message} problem The message object to apply fixes from
   * @returns {boolean}         Whether fix was successfully applied
   */
  function attemptFix(problem: HasFixMessage) {
    const fix = problem.fix
    const start = fix.range[0]
    const end = fix.range[1]

    // Remain it as a problem if it's overlapped or it's a negative range
    if (lastPos >= start || start > end) {
      remainingMessages.push(problem)
      return false
    }

    // Remove BOM.
    if ((start < 0 && end >= 0) || (start === 0 && fix.text.startsWith(BOM))) {
      output = ""
    }

    // Make output to this fix.
    output += text.slice(Math.max(0, lastPos), Math.max(0, start))
    output += fix.text
    lastPos = end
    return true
  }

  messages.forEach((problem) => {
    if (hasFixMessage(problem)) {
      fixes.push(problem)
    } else {
      remainingMessages.push(problem)
    }
  })

  if (fixes.length) {
    //  debug("Found fixes to apply");
    let fixesWereApplied = false

    for (const problem of fixes.sort(compareMessagesByFixRange)) {
      if (typeof shouldFix !== "function" || shouldFix(problem)) {
        attemptFix(problem)

        // The only time attemptFix will fail is if a previous fix was
        // applied which conflicts with it.  So we can mark this as true.
        fixesWereApplied = true
      } else {
        remainingMessages.push(problem)
      }
    }
    output += text.slice(Math.max(0, lastPos))

    return {
      fixed: fixesWereApplied,
      messages: remainingMessages.sort(compareMessagesByLocation),
      output,
    }
  }

  //  debug("No fixes to apply");
  return {
    fixed: false,
    messages,
    output: bom + text,
  }
}
