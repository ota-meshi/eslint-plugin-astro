import type { ElementNode, TextNode } from "@astrojs/compiler/types"
import type { ParseTemplateResult } from "astro-eslint-parser"
import type { Linter } from "eslint"
import type { TSESTree } from "@typescript-eslint/types"
import { AST_NODE_TYPES } from "@typescript-eslint/types"
import { parseExpression } from "./parse-expression"

const RE_LEADING_SPACES = /^[\t ]+/u
let seq = 0

class Locs {
  private readonly lineStartIndices: number[]

  public constructor(lines: string[]) {
    const lineStartIndices = [0]

    let index = 0
    for (const line of lines) {
      index += line.length
      lineStartIndices.push(index)
    }
    this.lineStartIndices = lineStartIndices
  }

  public getLocFromIndex(index: number): { line: number; column: number } {
    const lineNumber = sortedLastIndex(this.lineStartIndices, index)
    return {
      line: lineNumber,
      column: index - this.lineStartIndices[lineNumber - 1],
    }
  }
}

export class ClientScript {
  private readonly id: number

  private readonly code: string

  private readonly script: ElementNode

  private readonly parsed: ParseTemplateResult

  private readonly block: {
    text: string
    remapMessage: (message: Linter.LintMessage) => Linter.LintMessage
  }

  public constructor(
    code: string,
    script: ElementNode,
    parsed: ParseTemplateResult,
  ) {
    this.code = code
    this.script = script
    this.parsed = parsed
    this.id = ++seq

    this.block = this.initBlock()
  }

  private initBlock() {
    const textNode = this.script.children[0] as TextNode
    const startOffset = textNode.position!.start.offset
    const endOffset = this.parsed.getEndOffset(textNode)
    const startLoc = this.parsed.getLocFromIndex(startOffset)

    const lines = this.code.slice(startOffset, endOffset).split(/(?<=\n)/u)
    const firstLine = lines.shift()!

    const textLines: string[] = []
    const remapColumnOffsets: number[] = []
    const remapLines: number[] = []

    const defineVars = this.extractDefineVars()
    if (defineVars.length) {
      textLines.push("/* global\n")
      remapLines.push(-1)
      remapColumnOffsets.push(-1)

      for (const defineVar of defineVars) {
        textLines.push(`${defineVar.name}\n`)
        remapLines.push(defineVar.loc.line)
        remapColumnOffsets.push(defineVar.loc.column)
      }

      textLines.push("-- define:vars */\n")
      remapLines.push(-1)
      remapColumnOffsets.push(-1)
    }

    if (firstLine.trim()) {
      const firstLineIndent = (RE_LEADING_SPACES.exec(firstLine) || [""])[0]
        .length
      textLines.push(firstLine.slice(firstLineIndent))
      remapLines.push(startLoc.line)
      remapColumnOffsets.push(firstLineIndent + startLoc.column)
    }

    const indent = getIndent(lines)
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index]
      const lineIndent = Math.min(indent, line.length)
      textLines.push(line.slice(lineIndent))
      remapLines.push(startLoc.line + index + 1)
      remapColumnOffsets.push(lineIndent)
    }

    const text = textLines.join("")
    const textLocs = new Locs(textLines)

    /** Remap loc */
    const remapLoc = (loc: {
      line: number
      column: number
    }): {
      line: number
      column: number
    } => {
      const lineIndex = loc.line - 1
      if (remapLines.length > lineIndex) {
        return {
          line: remapLines[lineIndex],
          column: loc.column + remapColumnOffsets[lineIndex],
        }
      }
      if (remapLines.length === lineIndex) {
        return this.parsed.getLocFromIndex(endOffset + loc.column)
      }
      return {
        line: -1,
        column: loc.column + 0,
      }
    }

    /** Remap range */
    const remapRange = (range: [number, number]): [number, number] | null => {
      const startLoc = textLocs.getLocFromIndex(range[0])
      const endLoc = textLocs.getLocFromIndex(range[1])
      const remappedStartLoc = remapLoc(startLoc)
      const remappedEndLoc = remapLoc(endLoc)
      if (remappedStartLoc.line < 0 || remappedEndLoc.line < 0) {
        return null
      }
      return [
        this.parsed.getIndexFromLoc(remappedStartLoc),
        this.parsed.getIndexFromLoc(remappedEndLoc),
      ]
    }

    return {
      text,
      remapMessage(message: Linter.LintMessage): Linter.LintMessage {
        const loc = remapLoc(message)
        message.line = loc.line
        message.column = loc.column
        if (
          typeof message.endLine === "number" &&
          typeof message.endColumn === "number"
        ) {
          const loc = remapLoc({
            line: message.endLine,
            column: message.endColumn,
          })
          message.endLine = loc.line
          message.endColumn = loc.column
        }

        if (message.fix) {
          const remappedRange = remapRange(message.fix.range)
          if (remappedRange) {
            message.fix.range = remappedRange
          } else {
            delete message.fix
          }
        }
        if (message.suggestions) {
          for (const suggestion of [...message.suggestions]) {
            const remappedRange = remapRange(suggestion.fix.range)
            if (remappedRange) {
              suggestion.fix.range = remappedRange
            } else {
              message.suggestions.splice(
                message.suggestions.indexOf(suggestion),
                1,
              )
            }
          }
        }

        return message
      },
    }
  }

  private extractDefineVars() {
    const defineVars = this.script.attributes.find(
      (attr) => attr.kind === "expression" && attr.name === "define:vars",
    )
    if (!defineVars) {
      return []
    }
    const valueStart = this.parsed.calcAttributeValueStartOffset(defineVars)
    const valueEnd = this.parsed.calcAttributeEndOffset(defineVars)
    let expression: TSESTree.Expression
    try {
      expression = parseExpression(
        this.code.slice(valueStart + 1, valueEnd - 1),
      )
    } catch {
      return []
    }
    if (expression.type !== AST_NODE_TYPES.ObjectExpression) return []
    const startLoc = this.parsed.getLocFromIndex(valueStart + 1)
    return expression.properties
      .filter((p): p is TSESTree.Property => p.type === AST_NODE_TYPES.Property)
      .filter((p): p is TSESTree.PropertyNonComputedName => !p.computed)
      .map((p) => {
        return {
          name:
            p.key.type === AST_NODE_TYPES.Identifier ? p.key.name : p.key.value,
          loc: {
            line: p.key.loc.start.line + startLoc.line - 1,
            column:
              p.key.loc.start.column +
              (p.key.loc.start.line === 1 ? startLoc.column : 0),
          },
        }
      })
  }

  public getProcessorFile(): Linter.ProcessorFile {
    return {
      text: this.block.text,
      filename: `${this.id}.js`,
    }
  }

  public remapMessages(messages: Linter.LintMessage[]): Linter.LintMessage[] {
    return messages
      .filter((m) => !this.isIgnoreMessage(m))
      .map((m) => this.block.remapMessage(m))
      .filter((m) => m.line >= 0)
  }

  private isIgnoreMessage(message: Linter.LintMessage) {
    if (message.ruleId === "eol-last" && message.messageId === "unexpected") {
      // Ignore this report as it is not possible to remove the EOF of a block.
      return true
    }
    return false
  }
}

/** Get indent */
function getIndent(lines: string[]) {
  let indent: number | null = null
  for (const line of lines) {
    if (!line.trim()) continue
    const lineIndent = (RE_LEADING_SPACES.exec(line) || [""])[0].length
    if (indent == null) {
      indent = lineIndent
    } else {
      indent = Math.min(indent, lineIndent)
    }
    if (indent === 0) {
      break
    }
  }
  return indent || 0
}

/**
 * Uses a binary search to determine the highest index at which value should be inserted into array in order to maintain its sort order.
 */
function sortedLastIndex(array: number[], value: number): number {
  let lower = 0
  let upper = array.length

  while (lower < upper) {
    const mid = Math.floor(lower + (upper - lower) / 2)
    const target = array[mid]
    if (target < value) {
      lower = mid + 1
    } else if (target > value) {
      upper = mid
    } else {
      return mid + 1
    }
  }

  return upper
}
