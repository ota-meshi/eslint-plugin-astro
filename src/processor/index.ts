import type { ParseTemplateResult } from "astro-eslint-parser"
import { parseTemplate } from "astro-eslint-parser"
import type { Linter } from "eslint"
import { beginShared, terminateShared } from "../shared/index.ts"
import * as meta from "../meta.ts"
import {
  isAstroFrontmatter,
  isJSXClosingElement,
  isJSXElement,
  isJSXOpeningElement,
} from "./astro/node.ts"

export const astroProcessor: Linter.Processor = {
  preprocess(code: string, filename: string) {
    return preprocess(code, filename, ".js")
  },
  postprocess,
  supportsAutofix: true,
  meta,
}

export const clientSideTsProcessor: Linter.Processor = {
  preprocess(code: string, filename: string) {
    return preprocess(code, filename, ".ts")
  },
  postprocess,
  supportsAutofix: true,
  meta: { ...meta, name: "astro/client-side-ts" },
}

/** preprocess */
function preprocess(
  code: string,
  filename: string,
  virtualFileExt: string,
): ReturnType<NonNullable<Linter.Processor["preprocess"]>> {
  if (filename) {
    const shared = beginShared(filename)
    let parsed: ParseTemplateResult
    try {
      parsed = parseTemplate(code)
    } catch {
      // ignore
      return [code]
    }

    parsed.walk(parsed.result.ast, (node, _, ctx) => {
      if (
        isAstroFrontmatter(node) ||
        isJSXOpeningElement(node) ||
        isJSXClosingElement(node)
      ) {
        ctx.skipChildren()
        return
      }
      if (isJSXElement(node)) {
        if (
          node.openingElement.name.type === "JSXIdentifier" &&
          node.openingElement.name.name === "script" &&
          node.children.length &&
          !node.openingElement.attributes.some(
            (attr) =>
              attr.type === "JSXAttribute" &&
              attr.name.type === "JSXIdentifier" &&
              attr.name.name === "type" &&
              attr.value?.type === "Literal" &&
              /json$|importmap/i.test(String(attr.value.value)),
          )
        ) {
          shared.addClientScript(code, node, parsed)
        }
      }
    })
    return [
      code,
      ...shared.clientScripts.map((cs) => cs.getProcessorFile(virtualFileExt)),
    ]
  }

  return [code]
}

/** postprocess */
function postprocess(
  [messages, ...blockMessages]: Linter.LintMessage[][],
  filename: string,
): Linter.LintMessage[] {
  const shared = terminateShared(filename)
  if (shared) {
    return messages.concat(
      ...blockMessages.map((m, i) => shared.clientScripts[i].remapMessages(m)),
    )
  }

  return messages
}
