---
title: "astro/no-unused-css-selector"
description: "disallow selectors defined in `style` tag that don't use in HTML"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-unused-css-selector

> disallow selectors defined in `style` tag that don't use in HTML

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## :book: Rule Details

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

## :wrench: Options

Nothing.

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-unused-css-selector.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-unused-css-selector.ts)
