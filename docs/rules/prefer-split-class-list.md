---
title: "astro/prefer-split-class-list"
description: "require use split array elements in `class:list`"
since: "v0.4.0"
---

# astro/prefer-split-class-list

> require use split array elements in `class:list`

- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule aims to use split array elements than string concatenation in `class:list`.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/prefer-split-class-list: "error" */
import clsx from "clsx"
---

{/* ✓ GOOD */}
<div class:list={["a", "b", c]}></div>

{/* ✗ BAD */}
<div class:list={"a b " + c}></div>
<div class:list={`a ${b} c`}></div>
<div class:list={clsx(["a", "b", c])}></div>
```

</ESLintCodeBlock>

## :wrench: Options

```json
{
  "astro/prefer-split-class-list": [
    "error",
    {
      "splitLiteral": false // or true
    }
  ]
}
```

- `splitLiteral` ... If `true`, it will also split string literals separated by whitespace. Default is `false`.

## :couple: Related Rules

- [astro/prefer-class-list-directive]
- [astro/prefer-object-class-list]

[astro/prefer-class-list-directive]: ./prefer-class-list-directive.md
[astro/prefer-object-class-list]: ./prefer-object-class-list.md

## :books: Further Reading

- [Astro Documentation | Template Directives Reference > class:list](https://docs.astro.build/en/reference/directives-reference/#classlist)

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.4.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/prefer-split-class-list.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/prefer-split-class-list.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/prefer-split-class-list)
