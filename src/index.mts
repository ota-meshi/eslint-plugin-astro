import type { ESMConfigs } from "./esm-config-builder"
import { buildEsmConfigs } from "./esm-config-builder"
import type { AstroPlugin } from "./plugin"
import { getPlugin } from "./plugin"
export const configs: ESMConfigs = buildEsmConfigs()
const plugin = getPlugin()
export default Object.assign(plugin, { configs }) as AstroPlugin & {
  configs: ESMConfigs
}
export const meta: AstroPlugin["meta"] = plugin.meta
export const rules: AstroPlugin["rules"] = plugin.rules
export const processors: AstroPlugin["processors"] = plugin.processors
export const environments: AstroPlugin["environments"] = plugin.environments
