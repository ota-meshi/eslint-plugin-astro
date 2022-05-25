import { ESLint } from "eslint"
import fs from "fs"
const eslint = new ESLint({ fix: true })

/** Run eslint fix */
export async function formatAndSave(
  filename: string,
  text: string,
): Promise<string> {
  const lintResults = await eslint.lintText(text, { filePath: filename })
  const output = lintResults[0].output || text
  fs.writeFileSync(filename, output)
  return output
}
