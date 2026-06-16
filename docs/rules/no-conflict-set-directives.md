---
title: "astro/no-conflict-set-directives"
description: "disallow conflicting set directives and child contents"
since: "v0.7.0"
---

# astro/no-conflict-set-directives

> disallow conflicting set directives and child contents

- ⚙ This rule is included in the `recommended` config.

## 📖 Rule Details

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

## 🔧 Options

Nothing.

## 📚 Further Reading

- [Astro Documentation | Template Directives Reference > set:html](https://docs.astro.build/en/reference/directives-reference/#sethtml)
- [Astro Documentation | Template Directives Reference > set:text](https://docs.astro.build/en/reference/directives-reference/#settext)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.7.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-conflict-set-directives.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-conflict-set-directives.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-conflict-set-directives)
