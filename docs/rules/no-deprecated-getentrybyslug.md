---
title: "astro/no-deprecated-getentrybyslug"
description: "disallow using deprecated `getEntryBySlug()`"
---

# astro/no-deprecated-getentrybyslug

> disallow using deprecated `getEntryBySlug()`

- :gear: This rule is included in `"plugin:astro/recommended"`.

## :book: Rule Details

This rule reports use of deprecated `getEntryBySlug()`.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-deprecated-getentrybyslug: "error" */

/* ✓ GOOD */
import { getEntry } from "astro:content";

/* ✗ BAD */
import { getEntryBySlug } from "astro:content";
---
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | API Reference - getEntryBySlug()](https://docs.astro.build/en/reference/api-reference/#getentrybyslug)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-deprecated-getentrybyslug.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-deprecated-getentrybyslug.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-deprecated-getentrybyslug)

