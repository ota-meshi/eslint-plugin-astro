---
title: "astro/no-unused-css-selector"
description: "disallow selectors defined in `style` tag that don't use in HTML"
since: "v0.10.0"
---

# astro/no-unused-css-selector

> disallow selectors defined in `style` tag that don't use in HTML

## 📖 Rule Details

This rule aims to remove unused  CSS selectors.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-unused-css-selector: "error" */
---

<div class="foo">
  <div class="bar">
  </div>
</div>

<style>
  /* ✓ GOOD */
  .foo,
  .bar,
  .foo > .bar {
    color: red;
  }

  /* ✗ BAD */
  .unused,
  .bar > .foo {
    color: red;
  }
</style>
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.10.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-unused-css-selector.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-unused-css-selector.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-unused-css-selector)
