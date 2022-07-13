// eslint-disable-next-line node/no-extraneous-import -- Demo
import { fromMarkdown } from "mdast-util-from-markdown"

/**
 * Parse code by `mdast-util-from-markdown`
 */
export function parseMarkdown(code) {
  return fromMarkdown(code)
}
export default { parseMarkdown }
