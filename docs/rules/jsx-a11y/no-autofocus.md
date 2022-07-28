---
title: "astro/jsx-a11y/no-autofocus"
description: "apply `jsx-a11y/no-autofocus` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-autofocus

> apply `jsx-a11y/no-autofocus` rule to Astro components

This rule is the same rule as [jsx-a11y/no-autofocus] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-autofocus]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-autofocus.md

The following is a partial excerpt from the [jsx-a11y/no-autofocus] rule documentation. See [original documentation][jsx-a11y/no-autofocus] for more details.

> Enforce that autoFocus prop is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.

## :books: Further Reading

- [jsx-a11y/no-autofocus]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-autofocus.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-autofocus.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-autofocus.md)</sup>
