---
title: "astro/valid-compile"
description: "disallow warnings when compiling."
---

# astro/valid-compile

> disallow warnings when compiling.

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :gear: This rule is included in `"plugin:astro/recommended"`.

## :book: Rule Details

This rule uses `@astrojs/compiler` to check the source code.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/valid-compile: "error" */
---

{/* ✗ BAD */}
<p set:html="string">string</p>
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

## :couple: Related Rules

- [astro/no-conflict-set-directives]

[astro/no-conflict-set-directives]: ./no-conflict-set-directives.md

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/valid-compile.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/valid-compile.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/valid-compile)
