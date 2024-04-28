import { buildCjsConfigs } from "./cjs-config-builder"
import { plugin } from "./plugin"
const configs = buildCjsConfigs()
export = Object.assign(plugin, { configs })
