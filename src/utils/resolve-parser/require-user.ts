import { createRequire } from "module"
import path from "path"

/** Require from user local */
export function requireUserLocal<T>(id: string): T | null {
  try {
    const cwd = process.cwd()
    const relativeTo = path.join(cwd, "__placeholder__.js")
    return createRequire(relativeTo)(id)
  } catch {
    return null
  }
}
