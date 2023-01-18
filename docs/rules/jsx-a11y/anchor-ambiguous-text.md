---
title: "astro/jsx-a11y/anchor-ambiguous-text"
description: "apply `jsx-a11y/anchor-ambiguous-text` rule to Astro components"
since: "v0.22.0"
---

# astro/jsx-a11y/anchor-ambiguous-text

> apply `jsx-a11y/anchor-ambiguous-text` rule to Astro components

This rule is the same rule as [jsx-a11y/anchor-ambiguous-text] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] >=v6.7.0 installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/anchor-ambiguous-text]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-ambiguous-text.md

The following is a partial excerpt from the [jsx-a11y/anchor-ambiguous-text] rule documentation. See [original documentation][jsx-a11y/anchor-ambiguous-text] for more details.

> Enforces `<a>` values are not exact matches for the phrases "click here", "here", "link", "a link", or "learn more". Screenreaders announce tags as links/interactive, but rely on values for context. Ambiguous anchor descriptions do not provide sufficient context for users.

## :books: Further Reading

- [jsx-a11y/anchor-ambiguous-text]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.22.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/anchor-ambiguous-text.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/anchor-ambiguous-text.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/anchor-ambiguous-text)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-ambiguous-text.md)</sup>
