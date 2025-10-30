import path from "path"
import fs from "fs"
import { rules } from "../src/rules"
import type { RuleModule } from "../src/types"
import { formatAndSave } from "./lib/utils"
import {
  buildNotesFromRule,
  renderExtensionNote,
  renderImplementation,
  renderRuleHeader,
  renderVerion,
} from "./lib/doc-renderer"

//eslint-disable-next-line jsdoc/require-jsdoc -- tools
function yamlValue(val: unknown) {
  if (typeof val === "string") {
    return `"${val.replace(/\\/gu, "\\\\").replace(/"/gu, '\\"')}"`
  }
  return val
}

const ROOT = path.resolve(__dirname, "../docs/rules")

//eslint-disable-next-line jsdoc/require-jsdoc -- tools
function pickSince(content: string): string | null | Promise<string> {
  const fileIntro = /^---\n((?:.*\n)+)---\n*/.exec(content)
  if (fileIntro) {
    const since = /since: "?(v\d+\.\d+\.\d+)"?/.exec(fileIntro[1])
    if (since) {
      return since[1]
    }
  }
  // eslint-disable-next-line no-process-env -- ignore
  if (process.env.IN_VERSION_SCRIPT) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports -- ignore
    return `v${require("../package.json").version}`
  }
  return null
}

class DocFile {
  private readonly rule: RuleModule

  private readonly filePath: string

  private content: string

  private readonly since: string | null | Promise<string>

  public constructor(rule: RuleModule) {
    this.rule = rule
    this.filePath = path.join(ROOT, `${rule.meta.docs.ruleName}.md`)
    this.content = fs.existsSync(this.filePath)
      ? fs.readFileSync(this.filePath, "utf8")
      : "\n\n"
    this.since = pickSince(this.content)
  }

  public static read(rule: RuleModule) {
    return new DocFile(rule)
  }

  public updateHeader() {
    const ruleDocs = this.rule.meta.docs
    const { ruleId, description } = ruleDocs
    const isNewRule = !this.since
    const notes = buildNotesFromRule(this.rule, isNewRule)
    const headerPattern = /(?:^|\n)#.+\n+[^\n]*\n+(?:- .+\n+)*\n*/u
    const header = renderRuleHeader({ ruleId, description, notes })
    this.content = headerPattern.test(this.content)
      ? this.content.replace(headerPattern, header)
      : `${header}${this.content.trim()}\n`

    return this
  }

  public async updateFooter() {
    const { ruleName, extensionRule } = this.rule.meta.docs
    const footerPattern = /## (?:(?:🔍)? ?Implementation|🚀 Version).+$/s
    const since = await this.since
    const version = since ? renderVerion(since) : ""
    const implementation = renderImplementation(ruleName)
    const extensionNote = renderExtensionNote(extensionRule)
    const footer = `${version}\n\n${implementation}${extensionNote}`
    this.content = footerPattern.test(this.content)
      ? this.content.replace(footerPattern, footer)
      : `${this.content.trim()}\n\n${footer}`

    return this
  }

  public updateCodeBlocks() {
    const { meta } = this.rule

    this.content = this.content.replace(
      /<ESLintCodeBlock(.*?)>/gu,
      (_t, str) => {
        const ps = str
          .split(/\s+/u)
          .map((s: string) => s.trim())
          .filter((s: string) => s && s !== "fix")
        if (meta.fixable) {
          ps.unshift("fix")
        }
        ps.unshift("<ESLintCodeBlock")
        return `${ps.join(" ")}>`
      },
    )
    return this
  }

  public adjustCodeBlocks() {
    // Adjust the necessary blank lines before and after the code block so that GitHub can recognize `.md`.
    this.content = this.content.replace(
      /(<ESLintCodeBlock[\s\S]*?>)\n+```/gu,
      "$1\n\n```",
    )
    this.content = this.content.replace(
      /```\n+<\/ESLintCodeBlock>/gu,
      "```\n\n</ESLintCodeBlock>",
    )
    return this
  }

  public async updateFileIntro() {
    const { ruleId, description } = this.rule.meta.docs

    const fileIntro = {
      title: ruleId,
      description,
      ...(this.since ? { since: await this.since } : {}),
    }
    const computed = `---\n${Object.keys(fileIntro)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- tool
      .map((key) => `${key}: ${yamlValue((fileIntro as any)[key])}`)
      .join("\n")}\n---\n\n`

    const fileIntroPattern = /^---\n(?:.*\n)+?---\n*/gu

    this.content = fileIntroPattern.test(this.content)
      ? this.content.replace(fileIntroPattern, computed)
      : `${computed}${this.content.trim()}\n`

    return this
  }

  public write() {
    this.content = this.content.replace(/\r?\n/gu, "\n")

    void formatAndSave(this.filePath, this.content)
  }
}

void main()

/** main */
async function main() {
  for (const rule of rules) {
    const doc = DocFile.read(rule)
    doc.updateHeader()
    await doc.updateFooter()
    doc.updateCodeBlocks()
    await doc.updateFileIntro()
    doc.adjustCodeBlocks()
    doc.write()
  }
}
