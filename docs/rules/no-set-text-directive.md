---
title: "astro/no-set-text-directive"
description: "disallow use of `set:text`"
since: "v0.2.0"
---

# astro/no-set-text-directive

> disallow use of `set:text`

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## 📖 Rule Details

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

{/* ✓ GOOD */}
<p>{foo}</p>

{/* ✗ BAD */}
<p set:text={foo} />
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 📚 Further Reading

- [Astro Documentation | Template Directives Reference > set:text](https://docs.astro.build/en/reference/directives-reference/#settext)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.2.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-set-text-directive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-set-text-directive.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-set-text-directive)
