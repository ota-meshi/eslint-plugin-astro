import { ClientScript } from "./client-script"
import type { ElementNode } from "@astrojs/compiler/types"
import type { ParseTemplateResult } from "astro-eslint-parser"

export class Shared {
  public readonly clientScripts: ClientScript[] = []

  public addClientScript(
    code: string,
    node: ElementNode,
    parsed: ParseTemplateResult,
  ): ClientScript {
    const clientScript = new ClientScript(code, node, parsed)
    this.clientScripts.push(clientScript)
    return clientScript
  }
}
const sharedMap = new Map<string, Shared>()
/** Start sharing and make the data available. */
export function beginShared(filename: string): Shared {
  const result = new Shared()
  sharedMap.set(filename, result)
  return result
}
/** Get the shared data and end the sharing. */
export function terminateShared(filename: string): Shared | null {
  const result = sharedMap.get(filename)
  sharedMap.delete(filename)
  return result ?? null
}

/** If sharing has started, get the shared data. */
export function getShared(filename: string): Shared | null {
  return sharedMap.get(filename) ?? null
}
