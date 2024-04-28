import { buildEsmConfigs } from "./esm-config-builder"
import { plugin } from "./plugin"
export const configs = buildEsmConfigs()
export default Object.assign(plugin, { configs })
export const { meta, rules, processors, environments } = plugin
