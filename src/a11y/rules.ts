import type { RuleContext, RuleListener, RuleModule } from "../types"
import type { PluginRuleModule } from "./load"
import { getPluginJsxA11y } from "./load"
import type { ASTNode } from "../types-for-node"
import { createRule } from "../utils"
import { a11yRuleKeys } from "./keys"
import { getAttributeName } from "../utils/ast-utils"

const TYPE_MAP: Partial<Record<ASTNode["type"], ASTNode["type"]>> = {
  AstroRawText: "JSXText",
  AstroTemplateLiteralAttribute: "JSXAttribute",
  AstroShorthandAttribute: "JSXAttribute",
}

const ATTRIBUTE_MAP: Record<string, string | undefined> = {
  "set:html": "dangerouslySetInnerHTML",
  "set:text": "children",
  autofocus: "autoFocus",
}

/** Get `eslint-plugin-jsx-a11y` rule. */
function getPluginJsxA11yRule(ruleName: string) {
  const base = getPluginJsxA11y()
  return base?.rules?.[ruleName]
}

/** Build a11y rules */
export function buildRules(): RuleModule[] {
  const rules: RuleModule[] = []

  for (const ruleKey of a11yRuleKeys) {
    const jsxRuleName = `jsx-a11y/${ruleKey}`
    const astroRuleName = `astro/${jsxRuleName}`
    const ruleWithoutMeta = createRule(jsxRuleName, {
      meta: {
        messages: {},
        schema: [],
        type: "problem",
        docs: {
          description: `apply \`${jsxRuleName}\` rule to Astro components`,
          category: "A11Y Extension Rules",
          recommended: false,
          available: () => Boolean(getPluginJsxA11y()),
        },
      },
      create(context) {
        const baseRule = getPluginJsxA11yRule(ruleKey)
        if (!baseRule) {
          context.report({
            loc: { line: 0, column: 0 },
            message: `If you want to use ${astroRuleName} rule, you need to install eslint-plugin-jsx-a11y.`,
          })
          return {}
        }
        return defineWrapperListener(baseRule, context)
      },
    })
    const docs: RuleModule["meta"]["docs"] = {
      ...ruleWithoutMeta.meta.docs,
      extensionRule: {
        plugin: "eslint-plugin-jsx-a11y",
        get url() {
          return (
            getPluginJsxA11yRule(ruleKey)?.meta?.docs?.url ??
            `https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/${ruleKey}.md`
          )
        },
      },
    }
    const newRule: RuleModule = {
      meta: new Proxy(ruleWithoutMeta.meta, {
        get(_t, key: keyof RuleModule["meta"]) {
          if (key === "docs") {
            return docs
          }
          const baseRule = getPluginJsxA11yRule(ruleKey)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
          return (baseRule?.meta as any)?.[key] ?? ruleWithoutMeta.meta[key]
        },
      }),
      create: ruleWithoutMeta.create,
    }

    rules.push(newRule)
  }
  return rules
}

/**
 * Define the wrapped plugin rule.
 */
function defineWrapperListener(
  coreRule: PluginRuleModule,
  context: RuleContext,
): RuleListener {
  if (!context.parserServices.isAstro) {
    return {}
  }
  const listener = coreRule.create(context)

  const astroListener: RuleListener = {}
  for (const key of Object.keys(listener)) {
    const original = listener[key]
    if (!original) {
      continue
    }

    // eslint-disable-next-line func-style -- ignore
    const wrappedListener = function (
      this: never,
      node: never,
      ...args: never[]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-invalid-this -- ignore
      ;(original as any).call(this, getProxyNode(node), ...args)
    }

    astroListener[key] = wrappedListener
    const astroKey = key
      .replace(/(?:^|\b)AstroRawText(?:\b|$)/gu, "JSXText")
      .replace(
        /(?:^|\b)(?:AstroTemplateLiteralAttribute|AstroShorthandAttribute)(?:\b|$)/gu,
        "JSXAttribute",
      )
    // AstroFragment
    // AstroHTMLComment
    // AstroDoctype
    if (astroKey !== key) {
      astroListener[astroKey] = wrappedListener
    }
  }

  /**
   *  Check whether a given value is a node.
   */
  function isNode(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
    data: any,
  ): boolean {
    return (
      data &&
      typeof data.type === "string" &&
      Array.isArray(data.range) &&
      data.range.length === 2 &&
      typeof data.range[0] === "number" &&
      typeof data.range[1] === "number"
    )
  }

  /**
   * Get the proxy node
   */
  function getProxyNode(
    node: ASTNode,
    overrides?: Record<string | symbol, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  ): any {
    const type = TYPE_MAP[node.type] || node.type
    const cache: Record<string | symbol, unknown> = {
      type,
      ...(overrides ?? {}),
    }

    if (node.type === "JSXAttribute") {
      const attrName = getAttributeName(node)
      const converted = attrName != null && ATTRIBUTE_MAP[attrName]
      if (converted) {
        cache.name = getProxyNode(node.name, {
          type: "JSXIdentifier",
          namespace: null,
          name: converted,
        })
      }
    }

    return new Proxy(node, {
      get(_t, key) {
        if (key in cache) {
          return cache[key]
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
        const data = (node as any)[key]
        if (isNode(data)) {
          return (cache[key] = getProxyNode(data))
        }
        if (Array.isArray(data)) {
          return (cache[key] = data.map((e) =>
            isNode(e) ? getProxyNode(e) : e,
          ))
        }
        return data
      },
    })
  }

  return astroListener
}
