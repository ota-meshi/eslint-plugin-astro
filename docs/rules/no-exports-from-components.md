---
title: "astro/no-exports-from-components"
description: "disallow value export"
since: "v1.1.0"
---

# astro/no-exports-from-components

> disallow value export

## 📖 Rule Details

This rule reports value exports from Astro components.
The use of typed exports are still allowed.

However, there are exceptions for specific named exports that are allowed:

- `getStaticPaths`: This function can be exported for dynamic routing purposes.
- `partial`: This constant can be exported to dynamically update a section of a page.
- `prerender`: This constant can be exported to opt-in to pre-rendering in server mode.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-exports-from-components: "error" */
/* ✓ GOOD */
export type A = number | boolean
export const getStaticPaths = () => {
  // logic here
}
export const prerender = true;
/* ✗ BAD */
export const x = 42
---
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 🚀 Version

This rule was introduced in eslint-plugin-astro v1.1.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-exports-from-components.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-exports-from-components.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-exports-from-components)
