---
title: "astro/no-omitted-end-tags"
description: "disallow omitted end tags"
---

# astro/no-omitted-end-tags

> disallow omitted end tags

- ⚙ This rule is included in the `recommended` config.
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.
- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## 📖 Rule Details

This rule reports elements whose end tags are omitted.

Astro's Rust compiler (`@astrojs/compiler-rs`) does not infer HTML optional
end tags such as `<p>one<p>two`, `<li>one<li>two`, or
`<option>A<option>B`. Astro v7 makes the Rust compiler the default compiler
and requires every non-void element to have a matching end tag. This rule helps
you find and fix templates that relied on omitted end tags before they fail to
parse with the Rust compiler.

Historically, the previous compiler documented
[unclosed HTML tags](https://github.com/withastro/compiler/blob/271eee2e499432015ab4c6dc510c5331e1961b84/SYNTAX_SPEC.md#unclosed-html-tags)
as accepted syntax. This rule intentionally prefers the explicit form now
required by the Rust compiler.

This rule is intended as a temporary migration aid. It will be deprecated in
the next version of eslint-plugin-astro because this plugin's parser will also
be replaced with the Rust compiler. Once that happens, files with omitted end
tags can no longer be parsed, so this rule will no longer be able to report
them. Enable this rule before upgrading to add the missing end tags while your
current parser can still read those files.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-omitted-end-tags: "error" */
---

{/* ✓ GOOD */}
<p>Hello</p>
<ul>
  <li>one</li>
  <li>two</li>
</ul>

{/* ✗ BAD */}
<p>Hello
<ul>
  <li>one
  <li>two
</ul>
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 📚 Further Reading

- [Astro v7 Upgrade Guide > Rust compiler](https://docs.astro.build/en/guides/upgrade-to/v7/#rust-compiler)
- [`@astrojs/compiler-rs` issue #50: don't infer HTML optional end tags](https://github.com/withastro/compiler-rs/issues/50)

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-omitted-end-tags.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-omitted-end-tags.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-omitted-end-tags)
