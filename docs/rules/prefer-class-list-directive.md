---
title: "astro/prefer-class-list-directive"
description: "require `class:list` directives instead of `class` with expressions"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/prefer-class-list-directive

> require `class:list` directives instead of `class` with expressions

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule aims to replace the `class` attribute with expression with the `class:list` directive.

<ESLintCodeBlock fix>

<!-- prettier-ignore-start -->

<!--eslint-skip-->

```astro
---
/* eslint astro/prefer-class-list-directive: "error" */
---

<!-- ✓ GOOD -->
<div class:list={[foo, bar]}></div>

<!-- ✗ BAD -->
<div class={foo + " " + bar}></div>
```

<!-- prettier-ignore-end -->

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | Template Directives Reference > class:list](https://docs.astro.build/en/reference/directives-reference/#classlist)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/prefer-class-list-directive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/prefer-class-list-directive.ts)
