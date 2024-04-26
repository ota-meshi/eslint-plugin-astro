import { buildEsmConfigs } from "./plugin-config-builder"
import { meta, rules, processors, environments } from "./plugin-without-config"
const configs = buildEsmConfigs()
export default { meta, configs, rules, processors, environments }
export { meta, configs, rules, processors, environments }
