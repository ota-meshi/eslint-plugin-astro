---
title: "astro/jsx-a11y/no-distracting-elements"
description: "apply `jsx-a11y/no-distracting-elements` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-distracting-elements

> apply `jsx-a11y/no-distracting-elements` rule to Astro components

This rule is the same rule as [jsx-a11y/no-distracting-elements] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-distracting-elements]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-distracting-elements.md

The following is a partial excerpt from the [jsx-a11y/no-distracting-elements] rule documentation. See [original documentation][jsx-a11y/no-distracting-elements] for more details.

> Enforces that no distracting elements are used. Elements that can be visually distracting can cause accessibility issues with visually impaired users. Such elements are most likely deprecated, and should be avoided. By default, the following elements are visually distracting: `<marquee>` and `<blink>`.

## :books: Further Reading

- [jsx-a11y/no-distracting-elements]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-distracting-elements.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-distracting-elements.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/no-distracting-elements)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-distracting-elements.md)</sup>
