---
title: "astro/valid-compile"
description: "disallow warnings when compiling."
since: "v0.21.0"
---

# astro/valid-compile

> disallow warnings when compiling.

- ⚙ This rule is included in `"plugin:astro/recommended"`.

## 📖 Rule Details

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

## 🔧 Options

Nothing.

## 📚 Further Reading

## 👫 Related Rules

- [astro/no-conflict-set-directives]

[astro/no-conflict-set-directives]: ./no-conflict-set-directives.md

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.21.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/valid-compile.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/valid-compile.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/valid-compile)
