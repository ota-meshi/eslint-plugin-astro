import assembleReleasePlan from "@changesets/assemble-release-plan"
import readChangesets from "@changesets/read"
import { read } from "@changesets/config"
import { getPackages } from "@manypkg/get-packages"
import { readPreState } from "@changesets/pre"
import path from "path"

const root = path.resolve(__dirname, "../..")

/** Get new version string from changesets */
export async function getNewVersion(): Promise<string> {
  const packages = await getPackages(root)
  const preState = await readPreState(root)
  const config = await read(root, packages)
  const changesets = await readChangesets(root)

  const releasePlan = assembleReleasePlan(
    changesets,
    packages,
    config,
    preState,
  )

  return releasePlan.releases.find(({ name }) => name === "eslint-plugin-yml")!
    .newVersion
}
