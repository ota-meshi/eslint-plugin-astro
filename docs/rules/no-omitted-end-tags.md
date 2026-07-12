---
title: "astro/no-omitted-end-tags"
description: "disallow omitted end tags"
since: "v2.1.0"
---

# astro/no-omitted-end-tags

> disallow omitted end tags

- ⚠️ This rule was **deprecated**.

## 📖 Rule Details

This rule was a temporary migration aid for finding elements whose end tags
were omitted. It is now deprecated and no longer reports any problems.

Astro's Rust compiler (`@astrojs/compiler-rs`) does not infer HTML optional
end tags such as `<p>one<p>two`, `<li>one<li>two`, or
`<option>A<option>B`. Astro v7 made the Rust compiler the default compiler and
requires every non-void element to have a matching end tag. Files with omitted
end tags are rejected before ESLint rules can run, so this rule can no longer
report them.

Historically, the previous compiler documented
[unclosed HTML tags](https://github.com/withastro/compiler/blob/271eee2e499432015ab4c6dc510c5331e1961b84/SYNTAX_SPEC.md#unclosed-html-tags)
as accepted syntax. The explicit form required by the Rust compiler should be
used instead.

## 🔧 Options

Nothing.

## 📌 Note

This rule is kept as a deprecated no-op so existing ESLint configurations that
still mention `astro/no-omitted-end-tags` do not fail with an unknown-rule
configuration error.

If you still need the historical linting and autofix behavior while migrating a
codebase, keep using an earlier `eslint-plugin-astro` release from v2.1 onward
that still implements this rule. Once the source has been updated to use
explicit end tags, you can upgrade safely and remove this rule from your
configuration.

## 📚 Further Reading

- [Astro v7 Upgrade Guide > Rust compiler](https://docs.astro.build/en/guides/upgrade-to/v7/#rust-compiler)
- [`@astrojs/compiler-rs` issue #50: don't infer HTML optional end tags](https://github.com/withastro/compiler-rs/issues/50)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v2.1.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-omitted-end-tags.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-omitted-end-tags.ts)
