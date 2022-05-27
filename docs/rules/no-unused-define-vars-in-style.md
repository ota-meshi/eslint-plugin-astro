---
title: "astro/no-unused-define-vars-in-style"
description: "disallow unused `define:vars={...}` in `style` tag"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-unused-define-vars-in-style

> disallow unused `define:vars={...}` in `style` tag

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## :book: Rule Details

This rule is aimed at eliminating unused defined variables in `define:vars={...}` in `style` tag.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-unused-define-vars-in-style: "error" */
---

{/* ✓ GOOD */}
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--foregroundColor);
  }
</style>

{/* ✗ BAD */}
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--background);
    color: var(--foreground);
  }
</style>
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | Template Directives Reference > define:vars](https://docs.astro.build/en/reference/directives-reference/#definevars)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-unused-define-vars-in-style.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-unused-define-vars-in-style.ts)
