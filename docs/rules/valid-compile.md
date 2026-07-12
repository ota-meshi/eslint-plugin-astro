---
title: "astro/valid-compile"
description: "disallow warnings when compiling."
since: "v0.21.0"
---

# astro/valid-compile

> disallow warnings when compiling.

- ⚠️ This rule was **deprecated**.

## 📖 Rule Details

This rule uses compiler diagnostics exposed by `astro-eslint-parser` to report
warnings while ESLint processes individual `.astro` files. It is now deprecated
and is no longer included in the `recommended` config.

Use Astro's [`astro check`](https://docs.astro.build/en/reference/cli-reference/#astro-check)
command instead. It runs project-wide diagnostics, including type checking in
`.astro` files, reports errors to the console, and exits with status code `1`
when errors are found. The command is designed for use in CI workflows.

```sh
npx astro check
```

## 🔧 Options

Nothing.

## 📌 Note

Remove this rule from your ESLint configuration and run `astro check`
separately instead.

## 📚 Further Reading

- [Astro CLI Reference > `astro check`](https://docs.astro.build/en/reference/cli-reference/#astro-check)

## 👫 Related Rules

- [astro/no-conflict-set-directives]

[astro/no-conflict-set-directives]: ./no-conflict-set-directives.md

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.21.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/valid-compile.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/valid-compile.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/valid-compile)
