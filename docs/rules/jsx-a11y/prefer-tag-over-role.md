---
title: "astro/jsx-a11y/prefer-tag-over-role"
description: "apply `jsx-a11y/prefer-tag-over-role` rule to Astro components"
---

# astro/jsx-a11y/prefer-tag-over-role

> apply `jsx-a11y/prefer-tag-over-role` rule to Astro components

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

This rule is the same rule as [jsx-a11y/prefer-tag-over-role] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] >=v6.7.0 installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/prefer-tag-over-role]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/prefer-tag-over-role.md

The following is a partial excerpt from the [jsx-a11y/prefer-tag-over-role] rule documentation. See [original documentation][jsx-a11y/prefer-tag-over-role] for more details.

> Enforces using semantic DOM elements over the ARIA `role` property.

## :books: Further Reading

- [jsx-a11y/prefer-tag-over-role]

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/prefer-tag-over-role.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/prefer-tag-over-role.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/prefer-tag-over-role)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/prefer-tag-over-role.md)</sup>
