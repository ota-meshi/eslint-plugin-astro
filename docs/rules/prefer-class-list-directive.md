---
title: "astro/prefer-class-list-directive"
description: "require `class:list` directives instead of `class` with expressions"
since: "v0.4.0"
---

# astro/prefer-class-list-directive

> require `class:list` directives instead of `class` with expressions

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## 📖 Rule Details

This rule aims to replace the `class` attribute with expression with the `class:list` directive.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/prefer-class-list-directive: "error" */
---

{/* ✓ GOOD */}
<div class:list={[foo, bar]}></div>

{/* ✗ BAD */}
<div class={foo + " " + bar}></div>
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 👫 Related Rules

- [astro/prefer-split-class-list]
- [astro/prefer-object-class-list]

[astro/prefer-split-class-list]: ./prefer-split-class-list.md
[astro/prefer-object-class-list]: ./prefer-object-class-list.md

## 📚 Further Reading

- [Astro Documentation | Template Directives Reference > class:list](https://docs.astro.build/en/reference/directives-reference/#classlist)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.4.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/prefer-class-list-directive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/prefer-class-list-directive.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/prefer-class-list-directive)
