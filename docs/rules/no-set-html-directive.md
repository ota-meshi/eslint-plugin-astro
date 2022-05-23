---
title: "astro/no-set-html-directive"
description: "disallow use of `set:html` to prevent XSS attack"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-set-html-directive

> disallow use of `set:html` to prevent XSS attack

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## :book: Rule Details

This rule reports all uses of `set:html` in order to reduce the risk of injecting potentially unsafe / unescaped html into the browser leading to Cross-Site Scripting (XSS) attacks.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-set-html-directive: "error" */
---

<!-- ✓ GOOD -->
<p set:text={foo} />

<!-- ✗ BAD -->
<p set:html={foo} />
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :mute: When Not To Use It

If you are certain the content passed to `set:html` is sanitized HTML you can disable this rule.

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-set-html-directive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-set-html-directive.ts)
