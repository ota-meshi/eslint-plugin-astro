---
title: "astro/jsx-a11y/mouse-events-have-key-events"
description: "apply `jsx-a11y/mouse-events-have-key-events` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/mouse-events-have-key-events

> apply `jsx-a11y/mouse-events-have-key-events` rule to Astro components

This rule is the same rule as [jsx-a11y/mouse-events-have-key-events] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/mouse-events-have-key-events]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/mouse-events-have-key-events.md

However, this rule probably doesn't work for Astro components because Astro components don't provide an event listener as syntax.

## :books: Further Reading

- [jsx-a11y/mouse-events-have-key-events]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/mouse-events-have-key-events.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/mouse-events-have-key-events.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/mouse-events-have-key-events.md)</sup>
