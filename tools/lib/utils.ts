import fs from "node:fs"
import prettier from "prettier"

/** Run eslint fix */
export async function formatAndSave(
  filename: string,
  text: string,
): Promise<string> {
  if (!filename.endsWith(".md")) {
    try {
      const config = await prettier.resolveConfig(filename)
      const output = await prettier.format(text, {
        ...config,
        filepath: filename,
      })
      fs.writeFileSync(filename, output)
      return output
    } catch {
      // ignore
    }
  }
  fs.writeFileSync(filename, text)
  return text
}
