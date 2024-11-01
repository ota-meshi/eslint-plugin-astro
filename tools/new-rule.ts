import path from "path"
import fs from "fs"
import cp from "child_process"
import { renderRuleHeader } from "./lib/doc-renderer"
const logger = console

// main
;((ruleId) => {
  if (ruleId == null) {
    logger.error("Usage: npm run new <RuleID>")
    process.exitCode = 1
    return
  }
  if (!/^[\w-]+$/u.test(ruleId)) {
    logger.error("Invalid RuleID '%s'.", ruleId)
    process.exitCode = 1
    return
  }

  const ruleFile = path.resolve(__dirname, `../src/rules/${ruleId}.ts`)
  const testFile = path.resolve(__dirname, `../tests/src/rules/${ruleId}.ts`)
  const docFile = path.resolve(__dirname, `../docs/rules/${ruleId}.md`)
  const fixturesRoot = path.resolve(
    __dirname,
    `../tests/fixtures/rules/${ruleId}/`,
  )
  try {
    fs.mkdirSync(fixturesRoot)
    fs.mkdirSync(path.resolve(fixturesRoot, "valid"))
    fs.mkdirSync(path.resolve(fixturesRoot, "invalid"))
  } catch {
    // ignore
  }

  fs.writeFileSync(
    ruleFile,
    `import { AST } from "astro-eslint-parser"
import { createRule } from "../utils"
import { getSourceCode } from "../utils/compat"

export default createRule("${ruleId}", {
  meta: {
    docs: {
      description: "",
      category: "",
      recommended: false,
    },
    schema: [],
    messages: {},
    type: "suggestion", // "problem", or "layout",
  },
  create(context) {
    const sourceCode = getSourceCode(context)
    if (!sourceCode.parserServices.isAstro) {
      return {}
    }
    
    return {}
  },
})
`,
  )
  fs.writeFileSync(
    testFile,
    `import { RuleTester } from "../../utils/eslint-compat"
import rule from "../../../src/rules/${ruleId}"
import { loadTestCases } from "../../utils/utils"

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
})

tester.run("${ruleId}", rule as any, loadTestCases("${ruleId}"))
`,
  )
  fs.writeFileSync(
    docFile,
    `${renderRuleHeader({ ruleId: `astro/${ruleId}`, description: "description", notes: [] })}

## 📖 Rule Details

This rule reports ???.

<ESLintCodeBlock>

<!--eslint-skip-->

\`\`\`astro
---
/* eslint astro/${ruleId}: "error" */
---

{/* ✓ GOOD */}

{/* ✗ BAD */}

\`\`\`

</ESLintCodeBlock>

## 🔧 Options

\`\`\`json
{
  "astro/${ruleId}": ["error", {
   
  }]
}
\`\`\`

- 

## 📚 Further Reading

- 

`,
  )

  cp.execSync(`code "${ruleFile}"`)
  cp.execSync(`code "${testFile}"`)
  cp.execSync(`code "${docFile}"`)

  const yellow = "\u001b[33m"

  const reset = "\u001b[0m"

  // eslint-disable-next-line no-console -- ignore
  console.log(`Test Command:

${yellow}npm run test -- -g ${ruleId}${reset}

`)
})(process.argv[2])
