---
title: "astro/jsx-a11y/alt-text"
description: "apply `jsx-a11y/alt-text` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/alt-text

> apply `jsx-a11y/alt-text` rule to Astro components

This rule is the same rule as [jsx-a11y/alt-text] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/alt-text]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/alt-text.md

The following is a partial excerpt from the [jsx-a11y/alt-text] rule documentation. See [original documentation][jsx-a11y/alt-text] for more details.

> Enforce that all elements that require alternative text have meaningful information to relay back to the end user. This is a critical component of accessibility for screen reader users in order for them to understand the content's purpose on the page. By default, this rule checks for alternative text on the following elements: `<img>`, `<area>`, `<input type="image">`, and `<object>`.

## :books: Further Reading

- [jsx-a11y/alt-text]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/alt-text.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/alt-text.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/alt-text.md)</sup>
