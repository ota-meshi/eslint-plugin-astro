/* eslint @typescript-eslint/no-explicit-any: off -- util */
import type { RuleListener, RuleContext, RuleModule } from "../types"
import type * as ESTree from "estree"
import type { AST as AstroAST } from "astro-eslint-parser"
import { Linter } from "eslint"

/**
 * Define the wrapped core rule.
 */
export function defineWrapperListener(
  coreRule: RuleModule,
  context: RuleContext,
  proxyOptions: {
    createListenerProxy?: (listener: RuleListener) => RuleListener
  },
): RuleListener {
  const listener = coreRule.create(context as any)

  const astroListener = proxyOptions.createListenerProxy?.(listener) ?? listener

  return astroListener
}

/**
 * Get the proxy node
 */
export function getProxyNode(node: { type: string }, properties: any): any {
  const cache: any = {}
  return new Proxy(node, {
    get(_t, key) {
      if (key in cache) {
        return cache[key]
      }
      if (key in properties) {
        return (cache[key] = properties[key])
      }
      return (node as any)[key]
    },
  })
}

/**
 * Build the proxy rule listener
 */
export function buildProxyListener(
  base: RuleListener,
  convertNode: (
    node:
      | AstroAST.AstroNode
      | (ESTree.Node & { parent: AstroAST.AstroNode | ESTree.Node | null }),
  ) => any,
): RuleListener {
  const listeners: RuleListener = {}
  for (const [key, listener] of Object.entries(base)) {
    listeners[key] = function (...args: [any, any, any]) {
      ;(listener! as any).call(
        this,
        ...args.map((arg) => {
          if (
            typeof arg === "object" &&
            "type" in arg &&
            typeof arg.type === "string" &&
            "range" in arg
          ) {
            return convertNode(arg)
          }
          return arg
        }),
      )
    }
  }
  return listeners
}
/**
 * New proxy object
 */
export function newProxy<T extends object>(
  target: T,
  ...propsArray: Partial<T>[]
): T {
  const cache: Partial<T> = {}
  const result = new Proxy({} as T, {
    get(_object, k) {
      const key = k as keyof T
      if (key in cache) {
        return cache[key]
      }
      for (const props of propsArray) {
        if (key in props) {
          return (cache[key] = props[key])
        }
      }
      return target[key]
    },
    has(_object, key) {
      return key in target
    },
    ownKeys(_object) {
      return Reflect.ownKeys(target)
    },
    getPrototypeOf(_object) {
      return Reflect.getPrototypeOf(target)
    },
  })
  return result
}

let ruleMap: Map<string, RuleModule> | null = null

/**
 * Get the core rule implementation from the rule name
 */
export function getCoreRule(ruleName: string): RuleModule {
  let map: Map<string, RuleModule>
  if (ruleMap) {
    map = ruleMap
  } else {
    ruleMap = map = (new Linter() as any).getRules()
  }
  return map.get(ruleName)!
}
