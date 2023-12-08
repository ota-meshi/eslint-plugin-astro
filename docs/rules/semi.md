---
title: "astro/semi"
description: "Require or disallow semicolons instead of ASI"
since: "v0.19.0"
---

# astro/semi

> Require or disallow semicolons instead of ASI

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## 📖 Rule Details

This rule enforces consistent use of semicolons.

This rule extends the base ESLint's [semi] rule. The [semi] rule does not understand frontmatter fence tokens (`---`), so using the `never` option in the [semi] rule will result in a false negative.
This rule supports [astro-eslint-parser]'s AST and tokens.

[astro-eslint-parser]: https://github.com/ota-meshi/astro-eslint-parser

Default:

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/semi: ["error"] */
/* ✓ GOOD */
fn();
/* ✗ BAD */
fn()
---

{() => {
  /* ✓ GOOD */
  fn();
  /* ✗ BAD */
  fn()
}}
```

</ESLintCodeBlock>

with `"never"` option:

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/semi: ["error", "never"] */
/* ✓ GOOD */
fn()
/* ✗ BAD */
fn();
---

{() => {
  /* ✓ GOOD */
  fn()
  /* ✗ BAD */
  fn();
}}
```

</ESLintCodeBlock>

## 🔧 Options

```json
{
  "semi": "off", // Don't need ESLint's semi, so turn it off.
  "astro/semi": [
    "error", 
    "always", // or "never"
    { "omitLastInOneLineBlock": true }
    // or { "beforeStatementContinuationChars": "any" | "always" | "never" }
  ]
}
```

Same as [semi] rule option. See [here](https://eslint.org/docs/rules/semi#options) for details.

## 👫 Related rules

- [semi]

[semi]: https://eslint.org/docs/rules/semi

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.19.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/semi.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/semi.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/semi)

<sup>Taken with ❤️ [from ESLint core](https://eslint.org/docs/rules/semi)</sup>
