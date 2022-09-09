---
title: "astro/jsx-a11y/no-static-element-interactions"
description: "apply `jsx-a11y/no-static-element-interactions` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-static-element-interactions

> apply `jsx-a11y/no-static-element-interactions` rule to Astro components

This rule is the same rule as [jsx-a11y/no-static-element-interactions] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-static-element-interactions]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-static-element-interactions.md

However, this rule probably doesn't work for Astro components because Astro components don't provide an event listener as syntax.

## :books: Further Reading

- [jsx-a11y/no-static-element-interactions]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-static-element-interactions.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-static-element-interactions.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/no-static-element-interactions)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-static-element-interactions.md)</sup>
