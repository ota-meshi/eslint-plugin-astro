import fs from "fs"
import path from "path"
import { name, version } from "../package.json"
import { getNewVersion } from "./lib/changesets-util"
import { formatAndSave } from "./lib/utils"

const META_PATH = path.join(__dirname, "../src/meta.ts")

void main()

/** main */
async function main() {
  if (!fs.existsSync(META_PATH)) {
    fs.writeFileSync(META_PATH, "", "utf8")
  }
  const code = `/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
export const name = ${JSON.stringify(name)} as const;
export const version = ${JSON.stringify(await getVersion())} as const;
`
  await formatAndSave(META_PATH, code)
}

/** Get version */
function getVersion() {
  // eslint-disable-next-line no-process-env -- ignore
  if (process.env.IN_VERSION_CI_SCRIPT) {
    return getNewVersion()
  }
  return version
}
