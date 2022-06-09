---
title: "astro/jsx-a11y/html-has-lang"
description: "apply `jsx-a11y/html-has-lang` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/html-has-lang

> apply `jsx-a11y/html-has-lang` rule to Astro components

This rule is the same rule as [jsx-a11y/html-has-lang] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/html-has-lang]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/html-has-lang.md

The following is a partial excerpt from the [jsx-a11y/html-has-lang] rule documentation. See [original documentation][jsx-a11y/html-has-lang] for more details.

> `<html>` elements must have the lang prop. This rule is largely superseded by the [`lang` rule](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/lang.md).

## :books: Further Reading

- [jsx-a11y/html-has-lang]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/html-has-lang.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/html-has-lang.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/html-has-lang.md)</sup>
