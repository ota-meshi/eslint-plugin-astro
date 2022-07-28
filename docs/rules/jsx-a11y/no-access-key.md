---
title: "astro/jsx-a11y/no-access-key"
description: "apply `jsx-a11y/no-access-key` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-access-key

> apply `jsx-a11y/no-access-key` rule to Astro components

This rule is the same rule as [jsx-a11y/no-access-key] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-access-key]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-access-key.md

The following is a partial excerpt from the [jsx-a11y/no-access-key] rule documentation. See [original documentation][jsx-a11y/no-access-key] for more details.

> Enforce no accessKey prop on element. Access keys are HTML attributes that allow web developers to assign keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by screenreaders and keyboard-only users create accessibility complications so to avoid complications, access keys should not be used.

## :books: Further Reading

- [jsx-a11y/no-access-key]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-access-key.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-access-key.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-access-key.md)</sup>
