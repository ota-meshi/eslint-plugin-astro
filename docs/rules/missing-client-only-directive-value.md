---
title: "astro/missing-client-only-directive-value"
description: "the client:only directive is missing the correct component's framework value"
---

# astro/missing-client-only-directive-value

> the client:only directive is missing the correct component's framework value

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- ⚙ This rule is included in `"plugin:astro/recommended"`.

## 📖 Rule Details

This rule reports not setting a value for the `client:only` directive.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/missing-client-only-directive-value: "error" */

---

{/* ✓ GOOD */}
<SomeSvelteComponent client:only="svelte" />

{/* ✗ BAD */}
<SomeSvelteComponent client:only />
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.


## 📚 Further Reading

- [Astro Documentation | Template Directives Reference > client:only](https://docs.astro.build/en/reference/directives-reference/#clientonly)

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/missing-client-only-directive-value.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/missing-client-only-directive-value.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/missing-client-only-directive-value)
