---
title: "astro/no-deprecated-astro-resolve"
description: "disallow using deprecated `Astro.resolve()`"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-deprecated-astro-resolve

> disallow using deprecated `Astro.resolve()`

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :gear: This rule is included in `"plugin:astro/recommended"`.

## :book: Rule Details

This rule reports use of deprecated `Astro.resolve()`.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-deprecated-astro-resolve: "error" */
const { animal } = Astro.props;
---

{/* ✓ GOOD */}
<img src={await import(`../images/${animal}.png`)} />

{/* ✗ BAD */}
<img src={Astro.resolve(`../images/${animal}.png`)} />
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | Migration Guide > Migrate to v0.24 - Deprecated: Astro.resolve()](https://astro.build/deprecated/resolve)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-deprecated-astro-resolve.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-deprecated-astro-resolve.ts)
