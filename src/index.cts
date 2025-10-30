import type { CJSConfigs } from "./cjs-config-builder"
import { buildCjsConfigs } from "./cjs-config-builder"
import type { AstroPlugin } from "./plugin"
import { getPlugin } from "./plugin"
const plugin = getPlugin()
const configs = buildCjsConfigs()
export = Object.assign(plugin, { configs }) as AstroPlugin & {
  configs: CJSConfigs
}
