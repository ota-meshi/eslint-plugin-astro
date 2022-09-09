---
title: "astro/jsx-a11y/aria-props"
description: "apply `jsx-a11y/aria-props` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/aria-props

> apply `jsx-a11y/aria-props` rule to Astro components

This rule is the same rule as [jsx-a11y/aria-props] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/aria-props]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-props.md

The following is a partial excerpt from the [jsx-a11y/aria-props] rule documentation. See [original documentation][jsx-a11y/aria-props] for more details.

> Elements cannot use an invalid ARIA attribute. This will fail if it finds an `aria-*` property that is not listed in [WAI-ARIA States and Properties spec](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties).

## :books: Further Reading

- [jsx-a11y/aria-props]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/aria-props.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/aria-props.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/aria-props)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-props.md)</sup>
