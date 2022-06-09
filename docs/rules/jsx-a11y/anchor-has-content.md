---
title: "astro/jsx-a11y/anchor-has-content"
description: "apply `jsx-a11y/anchor-has-content` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/anchor-has-content

> apply `jsx-a11y/anchor-has-content` rule to Astro components

This rule is the same rule as [jsx-a11y/anchor-has-content] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/anchor-has-content]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-has-content.md

The following is a partial excerpt from the [jsx-a11y/anchor-has-content] rule documentation. See [original documentation][jsx-a11y/anchor-has-content] for more details.

> Enforce that anchors have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop.

## :books: Further Reading

- [jsx-a11y/anchor-has-content]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/anchor-has-content.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/anchor-has-content.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-has-content.md)</sup>
