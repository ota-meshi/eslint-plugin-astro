import { getPluginJsxA11y } from "./load"

const plugin = getPluginJsxA11y()
export const a11yRuleKeys = plugin?.rules
  ? Object.keys(plugin.rules).filter(
      (s) => !plugin?.rules?.[s]?.meta?.deprecated,
    )
  : ([
      "alt-text",
      "anchor-ambiguous-text",
      "anchor-has-content",
      "anchor-is-valid",
      "aria-activedescendant-has-tabindex",
      "aria-props",
      "aria-proptypes",
      "aria-role",
      "aria-unsupported-elements",
      "autocomplete-valid",
      "click-events-have-key-events",
      "control-has-associated-label",
      "heading-has-content",
      "html-has-lang",
      "iframe-has-title",
      "img-redundant-alt",
      "interactive-supports-focus",
      "label-has-associated-control",
      "lang",
      "media-has-caption",
      "mouse-events-have-key-events",
      "no-access-key",
      "no-autofocus",
      "no-distracting-elements",
      "no-interactive-element-to-noninteractive-role",
      "no-noninteractive-element-interactions",
      "no-noninteractive-element-to-interactive-role",
      "no-noninteractive-tabindex",
      "no-redundant-roles",
      "no-static-element-interactions",
      "prefer-tag-over-role",
      "role-has-required-aria-props",
      "role-supports-aria-props",
      "scope",
      "tabindex-no-positive",
    ] as const)
export const a11yConfigKeys = plugin?.configs
  ? Object.keys(plugin.configs)
  : (["recommended", "strict"] as const)
