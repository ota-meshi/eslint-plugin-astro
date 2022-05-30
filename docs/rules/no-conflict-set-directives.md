---
title: "astro/no-conflict-set-directives"
description: "disallow conflicting set directives and child contents"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.7.0"
---

# astro/no-conflict-set-directives

> disallow conflicting set directives and child contents

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

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.7.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-conflict-set-directives.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-conflict-set-directives.ts)
