---
title: "astro/jsx-a11y/aria-unsupported-elements"
description: "apply `jsx-a11y/aria-unsupported-elements` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/aria-unsupported-elements

> apply `jsx-a11y/aria-unsupported-elements` rule to Astro components

This rule is the same rule as [jsx-a11y/aria-unsupported-elements] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/aria-unsupported-elements]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-unsupported-elements.md

The following is a partial excerpt from the [jsx-a11y/aria-unsupported-elements] rule documentation. See [original documentation][jsx-a11y/aria-unsupported-elements] for more details.

> Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `role` and/or `aria-*` props.

## :books: Further Reading

- [jsx-a11y/aria-unsupported-elements]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/aria-unsupported-elements.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/aria-unsupported-elements.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-unsupported-elements.md)</sup>
