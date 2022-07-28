---
title: "astro/jsx-a11y/role-supports-aria-props"
description: "apply `jsx-a11y/role-supports-aria-props` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/role-supports-aria-props

> apply `jsx-a11y/role-supports-aria-props` rule to Astro components

This rule is the same rule as [jsx-a11y/role-supports-aria-props] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/role-supports-aria-props]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/role-supports-aria-props.md

The following is a partial excerpt from the [jsx-a11y/role-supports-aria-props] rule documentation. See [original documentation][jsx-a11y/role-supports-aria-props] for more details.

> Enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`. Many ARIA attributes (states and properties) can only be used on elements with particular roles. Some elements have implicit roles, such as `<a href="#" />`, which will resolve to `role="link"`.

## :books: Further Reading

- [jsx-a11y/role-supports-aria-props]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/role-supports-aria-props.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/role-supports-aria-props.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/role-supports-aria-props.md)</sup>
