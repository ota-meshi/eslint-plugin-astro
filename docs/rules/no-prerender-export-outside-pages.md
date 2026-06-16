---
title: "astro/no-prerender-export-outside-pages"
description: "disallow `prerender` export outside of pages/ directory"
since: "v1.7.0"
---

# astro/no-prerender-export-outside-pages

> disallow `prerender` export outside of pages/ directory

## 📖 Rule Details

This rule reports `prerender` exports from Astro files that are not inside a `pages/` directory.

The `prerender` directive only has an effect on page files (files under `src/pages/`). Exporting it from components or layouts has no effect.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-prerender-export-outside-pages: "error" */

/* ✓ GOOD — in src/pages/index.astro */
export const prerender = true

/* ✗ BAD — in src/components/MyComponent.astro */
export const prerender = true
---
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 🔇 When Not To Use It

If your project doesn't use hybrid rendering or if all files under `src/pages/` don't need prerender exports, you may disable this rule.

## 📚 Further Reading

- [Astro Docs: On-demand Rendering](https://docs.astro.build/en/guides/on-demand-rendering/)
- [Astro Docs: `prerender` export](https://docs.astro.build/en/reference/routing-reference/#prerender)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v1.7.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-prerender-export-outside-pages.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-prerender-export-outside-pages.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-prerender-export-outside-pages)
