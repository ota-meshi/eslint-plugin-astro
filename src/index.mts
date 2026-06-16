import type { ESMConfigs } from "./esm-config-builder.ts"
import { buildEsmConfigs } from "./esm-config-builder.ts"
import type { AstroPlugin } from "./plugin.ts"
import { getPlugin } from "./plugin.ts"
export const configs: ESMConfigs = buildEsmConfigs()
const plugin: AstroPlugin & {
  configs: ESMConfigs
} = Object.assign(getPlugin(), { configs })
export default plugin
export const meta: AstroPlugin["meta"] = plugin.meta
export const rules: AstroPlugin["rules"] = plugin.rules
export const processors: AstroPlugin["processors"] = plugin.processors
export const environments: AstroPlugin["environments"] = plugin.environments
