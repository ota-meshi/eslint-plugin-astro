---
title: "astro/no-unused-define-vars-in-style"
description: "disallow unused `define:vars={...}` in `style` tag"
since: "v0.6.0"
---

# astro/no-unused-define-vars-in-style

> disallow unused `define:vars={...}` in `style` tag

- :gear: This rule is included in `"plugin:astro/recommended"`.

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

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.6.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-unused-define-vars-in-style.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-unused-define-vars-in-style.ts)
