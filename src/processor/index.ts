import type { ParseTemplateResult } from "astro-eslint-parser"
import { parseTemplate } from "astro-eslint-parser"
import type { Linter } from "eslint"
import { beginShared, terminateShared } from "../shared"
import * as meta from "../meta"

export const processor: Linter.Processor = {
  preprocess(code: string, filename: string) {
    if (filename) {
      const shared = beginShared(filename)
      let parsed: ParseTemplateResult
      try {
        parsed = parseTemplate(code)
      } catch {
        // ignore
        return [code]
      }

      parsed.walk(parsed.result.ast, (node) => {
        if (
          node.type === "element" &&
          node.name === "script" &&
          node.children.length &&
          !node.attributes.some(
            ({ name, value }) =>
              name === "type" && /json$|importmap/i.test(value),
          )
        ) {
          shared.addClientScript(code, node, parsed)
        }
      })
      return [code, ...shared.clientScripts.map((cs) => cs.getProcessorFile())]
    }

    return [code]
  },
  postprocess(
    [messages, ...blockMessages]: Linter.LintMessage[][],
    filename: string,
  ): Linter.LintMessage[] {
    const shared = terminateShared(filename)
    if (shared) {
      return messages.concat(
        ...blockMessages.map((m, i) =>
          shared.clientScripts[i].remapMessages(m),
        ),
      )
    }

    return messages
  },
  supportsAutofix: true,
  // @ts-expect-error -- missing type
  meta,
}
