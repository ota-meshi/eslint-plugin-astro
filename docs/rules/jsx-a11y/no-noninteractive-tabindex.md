---
title: "astro/jsx-a11y/no-noninteractive-tabindex"
description: "apply `jsx-a11y/no-noninteractive-tabindex` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-noninteractive-tabindex

> apply `jsx-a11y/no-noninteractive-tabindex` rule to Astro components

This rule is the same rule as [jsx-a11y/no-noninteractive-tabindex] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-noninteractive-tabindex]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-tabindex.md

The following is a partial excerpt from the [jsx-a11y/no-noninteractive-tabindex] rule documentation. See [original documentation][jsx-a11y/no-noninteractive-tabindex] for more details.

> Tab key navigation should be limited to elements on the page that can be interacted with. Thus it is not necessary to add a tabindex to items in an unordered list, for example, to make them navigable through assistive technology. These applications already afford page traversal mechanisms based on the HTML of the page. Generally, we should try to reduce the size of the page's tab ring rather than increasing it.

## :books: Further Reading

- [jsx-a11y/no-noninteractive-tabindex]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-noninteractive-tabindex.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-noninteractive-tabindex.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-tabindex.md)</sup>
