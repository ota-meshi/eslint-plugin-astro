---
title: "astro/no-conflict-set-directives"
description: "disallow conflicting set directives and child contents"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-conflict-set-directives

> disallow conflicting set directives and child contents

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## :book: Rule Details

This rule reports conflicting `set:text`, `set:html`, and child content.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-conflict-set-directives: "error" */
const foo = "hello"
---

{/* ✓ GOOD */}
<p>{foo}</p>
<p set:text={foo}></p>
<p set:html={foo}></p>

{/* ✗ BAD */}
<p set:text={foo}>!</p>
<p set:html={foo}>!</p>
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | Template Directives Reference > set:html](https://docs.astro.build/en/reference/directives-reference/#sethtml)
- [Astro Documentation | Template Directives Reference > set:text](https://docs.astro.build/en/reference/directives-reference/#settext)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-conflict-set-directives.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-conflict-set-directives.ts)
