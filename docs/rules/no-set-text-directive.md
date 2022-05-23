---
title: "astro/no-set-text-directive"
description: "disallow use of `set:text`"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-set-text-directive

> disallow use of `set:text`

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule reports all uses of `set:text` directive.

The documentation says about the `set:text` directive as follows:

> This is equivalent to just passing a variable into a template expression directly (ex: `<div>{someText}</div>`) and therefore this directive is not commonly used.

See [Astro Documentation | Template Directives Reference > set:text](https://docs.astro.build/en/reference/directives-reference/#settext).

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-set-text-directive: "error" */
---

<!-- ✓ GOOD -->
<p>{foo}</p>

<!-- ✗ BAD -->
<p set:text={foo} />

```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | Template Directives Reference > set:text](https://docs.astro.build/en/reference/directives-reference/#settext)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-set-text-directive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-set-text-directive.ts)
