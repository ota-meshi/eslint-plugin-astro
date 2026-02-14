import type { CJSConfigs } from "./cjs-config-builder.ts"
import { buildCjsConfigs } from "./cjs-config-builder.ts"
import type { AstroPlugin } from "./plugin.ts"
import { getPlugin } from "./plugin.ts"
const plugin = getPlugin()
const configs = buildCjsConfigs()
export = Object.assign(plugin, { configs }) as AstroPlugin & {
  configs: CJSConfigs
}
