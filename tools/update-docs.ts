import path from "path"
import fs from "fs"
import { rules } from "../src/utils/rules"
import type { RuleModule } from "../src/types"

//eslint-disable-next-line require-jsdoc -- tools
function formatItems(items: string[]) {
  if (items.length <= 2) {
    return items.join(" and ")
  }
  return `all of ${items.slice(0, -1).join(", ")} and ${
    items[items.length - 1]
  }`
}

//eslint-disable-next-line require-jsdoc -- tools
function yamlValue(val: unknown) {
  if (typeof val === "string") {
    return `"${val.replace(/\\/gu, "\\\\").replace(/"/gu, '\\"')}"`
  }
  return val
}

const ROOT = path.resolve(__dirname, "../docs/rules")

//eslint-disable-next-line require-jsdoc -- tools
function pickSince(content: string): string | null {
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

  private readonly since: string | null

  public constructor(rule: RuleModule) {
    this.rule = rule
    this.filePath = path.join(ROOT, `${rule.meta.docs.ruleName}.md`)
    this.content = fs.readFileSync(this.filePath, "utf8")
    this.since = pickSince(this.content)
  }

  public static read(rule: RuleModule) {
    return new DocFile(rule)
  }

  public updateHeader() {
    const {
      meta: {
        fixable,
        deprecated,
        replacedBy,
        docs: { ruleId, description, recommended },
      },
    } = this.rule
    const title = `# ${ruleId}\n\n> ${description}`
    const notes = []

    if (deprecated) {
      if (replacedBy) {
        const replacedRules = replacedBy.map(
          (name) => `[astro/${name}](${name}.md) rule`,
        )
        notes.push(
          `- :warning: This rule was **deprecated** and replaced by ${formatItems(
            replacedRules,
          )}.`,
        )
      } else {
        notes.push("- :warning: This rule was **deprecated**.")
      }
    } else {
      if (recommended) {
        if (recommended === "base") {
          notes.push(
            '- :gear: This rule is included in `"plugin:astro/base"` and `"plugin:astro/recommended"`.',
          )
        } else {
          notes.push(
            '- :gear: This rule is included in `"plugin:astro/recommended"`.',
          )
        }
      }
    }
    if (fixable) {
      notes.push(
        "- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.",
      )
    }
    if (!this.since) {
      notes.unshift(
        `- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>`,
      )
    }

    // Add an empty line after notes.
    if (notes.length >= 1) {
      notes.push("", "")
    }

    const headerPattern = /(?:^|\n)#.+\n+[^\n]*\n+(?:- .+\n+)*\n*/u

    const header = `\n${title}\n\n${notes.join("\n")}`
    if (headerPattern.test(this.content)) {
      this.content = this.content.replace(
        headerPattern,
        header.replace(/\$/g, "$$$$"),
      )
    } else {
      this.content = `${header}${this.content.trim()}\n`
    }

    return this
  }

  public updateFooter() {
    const { ruleName, extensionRule } = this.rule.meta.docs
    const footerPattern =
      /## (?:(?::mag:)? ?Implementation|:rocket: Version).+$/s
    const footer = `${
      this.since
        ? `## :rocket: Version

This rule was introduced in eslint-plugin-astro ${this.since}

`
        : ""
    }## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/${ruleName}.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/${ruleName}.ts)
${
  extensionRule
    ? `
<sup>Taken with ❤️ [from ESLint core](https://eslint.org/docs/rules/${extensionRule})</sup>
`
    : ""
}`
    if (footerPattern.test(this.content)) {
      this.content = this.content.replace(
        footerPattern,
        footer.replace(/\$/g, "$$$$"),
      )
    } else {
      this.content = `${this.content.trim()}\n\n${footer}`
    }

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

  public updateFileIntro() {
    const { ruleId, description } = this.rule.meta.docs

    const fileIntro = {
      title: ruleId,
      description,
      ...(this.since ? { since: this.since } : {}),
    }
    const computed = `---\n${Object.keys(fileIntro)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- tool
      .map((key) => `${key}: ${yamlValue((fileIntro as any)[key])}`)
      .join("\n")}\n---\n\n`

    const fileIntroPattern = /^---\n(?:.*\n)+?---\n*/gu

    if (fileIntroPattern.test(this.content)) {
      this.content = this.content.replace(
        fileIntroPattern,
        computed.replace(/\$/g, "$$$$"),
      )
    } else {
      this.content = `${computed}${this.content.trim()}\n`
    }

    return this
  }

  public write() {
    this.content = this.content.replace(/\r?\n/gu, "\n")

    fs.writeFileSync(this.filePath, this.content)
  }
}

for (const rule of rules) {
  DocFile.read(rule)
    .updateHeader()
    .updateFooter()
    .updateCodeBlocks()
    .updateFileIntro()
    .adjustCodeBlocks()
    .write()
}
