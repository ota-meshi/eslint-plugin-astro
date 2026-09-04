import { createRequire } from "node:module"
import path from "node:path"

type ModuleWithDefault<T> = T | { default: T }

/** Require a module from the user's local */
export function requireUserLocal<T>(id: string): T | null {
  try {
    const cwd = process.cwd()
    const relativeTo = path.join(cwd, "__placeholder__.js")
    const module = createRequire(relativeTo)(id) as ModuleWithDefault<T>

    if (
      module &&
      typeof module === "object" &&
      "default" in module &&
      module.default
    ) {
      return module.default
    }

    return module as T
  } catch {
    return null
  }
}
