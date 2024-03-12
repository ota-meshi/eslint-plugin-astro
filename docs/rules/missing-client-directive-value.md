---
title: "astro/missing-client-directive-value"
description: "the client directive is missing the correct component's framework value"
since: "v0.31.4"
---

# astro/missing-client-directive-value

> the client directive is missing the correct component's framework value

- ⚙ This rule is included in `"plugin:astro/recommended"`.

## 📖 Rule Details

This rule reports not setting a value for the `client:only` directive.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/missing-client-directive-value: "error" */

---

{/* ✓ GOOD */}
<SomeSvelteComponent client:only="svelte" />

{/* ✗ BAD */}
<SomeSvelteComponent client:only />
```

</ESLintCodeBlock>

## 🔧 Options

```
<SomeReactComponent client:only="react" />
<SomePreactComponent client:only="preact" />
<SomeSvelteComponent client:only="svelte" />
<SomeVueComponent client:only="vue" />
<SomeSolidComponent client:only="solid-js" />
<SomeLitComponent client:only="lit" />
```


## 📚 Further Reading

- [Astro Documentation | Template Directives Reference > client:only](https://docs.astro.build/en/reference/directives-reference/#clientonly)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.31.4

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/missing-client-directive-value.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/missing-client-directive-value.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/missing-client-directive-value)
