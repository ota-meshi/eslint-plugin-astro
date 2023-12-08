---
title: "astro/prefer-object-class-list"
description: "require use object instead of ternary expression in `class:list`"
since: "v0.4.0"
---

# astro/prefer-object-class-list

> require use object instead of ternary expression in `class:list`

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## 📖 Rule Details

This rule aims to use object elements than ternary expression in `class:list`.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/prefer-object-class-list: "error" */
---

{/* ✓ GOOD */}
<div class:list={["a", { b: num > 0, c }]}></div>

{/* ✗ BAD */}
<div class:list={"a " + (num > 0 ? 'b' : '') + ' ' + (c ? 'c' : '')}></div>
<div class:list={`a ${num > 0 ? 'b' : ''} ${c ? 'c' : ''}`}></div>
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 👫 Related Rules

- [astro/prefer-class-list-directive]
- [astro/prefer-split-class-list]

[astro/prefer-class-list-directive]: ./prefer-class-list-directive.md
[astro/prefer-split-class-list]: ./prefer-split-class-list.md

## 📚 Further Reading

- [Astro Documentation | Template Directives Reference > class:list](https://docs.astro.build/en/reference/directives-reference/#classlist)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.4.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/prefer-object-class-list.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/prefer-object-class-list.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/prefer-object-class-list)
