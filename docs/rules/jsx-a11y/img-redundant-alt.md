---
title: "astro/jsx-a11y/img-redundant-alt"
description: "apply `jsx-a11y/img-redundant-alt` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/img-redundant-alt

> apply `jsx-a11y/img-redundant-alt` rule to Astro components

This rule is the same rule as [jsx-a11y/img-redundant-alt] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/img-redundant-alt]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/img-redundant-alt.md

The following is a partial excerpt from the [jsx-a11y/img-redundant-alt] rule documentation. See [original documentation][jsx-a11y/img-redundant-alt] for more details.

> Enforce img alt attribute does not contain the word image, picture, or photo. Screenreaders already announce `img` elements as an image. There is no need to use words such as *image*, *photo*, and/or *picture*.

## :books: Further Reading

- [jsx-a11y/img-redundant-alt]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/img-redundant-alt.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/img-redundant-alt.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/img-redundant-alt)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/img-redundant-alt.md)</sup>
