---
title: "astro/jsx-a11y/no-noninteractive-element-interactions"
description: "apply `jsx-a11y/no-noninteractive-element-interactions` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/no-noninteractive-element-interactions

> apply `jsx-a11y/no-noninteractive-element-interactions` rule to Astro components

This rule is the same rule as [jsx-a11y/no-noninteractive-element-interactions] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-noninteractive-element-interactions]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-interactions.md

The following is a partial excerpt from the [jsx-a11y/no-noninteractive-element-interactions] rule documentation. See [original documentation][jsx-a11y/no-noninteractive-element-interactions] for more details.

> Non-interactive HTML elements and non-interactive ARIA roles indicate _content_ and _containers_ in the user interface. A non-interactive element does not support event handlers (mouse and key handlers). Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<p>`, `<img>`, `<li>`, `<ul>` and `<ol>`. Non-interactive [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

## :books: Further Reading

- [jsx-a11y/no-noninteractive-element-interactions]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-noninteractive-element-interactions.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-noninteractive-element-interactions.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-interactions.md)</sup>
