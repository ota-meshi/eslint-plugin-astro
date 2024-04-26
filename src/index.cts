import { buildCjsConfigs } from "./plugin-config-builder"
import { meta, rules, processors, environments } from "./plugin-without-config"
const configs = buildCjsConfigs()
export = { meta, configs, rules, processors, environments }
