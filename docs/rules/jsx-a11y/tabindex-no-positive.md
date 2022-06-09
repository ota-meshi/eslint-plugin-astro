---
title: "astro/jsx-a11y/tabindex-no-positive"
description: "apply `jsx-a11y/tabindex-no-positive` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/tabindex-no-positive

> apply `jsx-a11y/tabindex-no-positive` rule to Astro components

This rule is the same rule as [jsx-a11y/tabindex-no-positive] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/tabindex-no-positive]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/tabindex-no-positive.md

The following is a partial excerpt from the [jsx-a11y/tabindex-no-positive] rule documentation. See [original documentation][jsx-a11y/tabindex-no-positive] for more details.

> Avoid positive `tabIndex` property values to synchronize the flow of the page with keyboard tab order.

## :books: Further Reading

- [jsx-a11y/tabindex-no-positive]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/tabindex-no-positive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/tabindex-no-positive.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/tabindex-no-positive.md)</sup>
