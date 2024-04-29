---
title: "astro/no-exports-from-components"
description: "disallow value export"
---

# astro/no-exports-from-components

> disallow value export

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## 📖 Rule Details

This rule reports value exports from Astro components.
The use of typed exports are still allowed.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-exports-from-components: "error" */
/* ✓ GOOD */
export type A = number | boolean
/* ✗ BAD */
export const x = 42
---
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-exports-from-components.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-exports-from-components.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-exports-from-components)
