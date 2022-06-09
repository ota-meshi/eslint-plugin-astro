---
title: "astro/jsx-a11y/no-redundant-roles"
description: "apply `jsx-a11y/no-redundant-roles` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/no-redundant-roles

> apply `jsx-a11y/no-redundant-roles` rule to Astro components

This rule is the same rule as [jsx-a11y/no-redundant-roles] rule but it applies to the Astro components.

[jsx-a11y/no-redundant-roles]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-redundant-roles.md

The following is a partial excerpt from the [jsx-a11y/no-redundant-roles] rule documentation. See [original documentation][jsx-a11y/no-redundant-roles] for more details.

> Some HTML elements have native semantics that are implemented by the browser. This includes default/implicit ARIA roles. Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.

## :books: Further Reading

- [jsx-a11y/no-redundant-roles]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-redundant-roles.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-redundant-roles.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-redundant-roles.md)</sup>
