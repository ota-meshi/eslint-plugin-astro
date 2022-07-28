---
title: "astro/no-deprecated-astro-canonicalurl"
description: "disallow using deprecated `Astro.canonicalURL`"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
---

# astro/no-deprecated-astro-canonicalurl

> disallow using deprecated `Astro.canonicalURL`

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :gear: This rule is included in `"plugin:astro/recommended"`.

## :book: Rule Details

This rule reports use of deprecated `Astro.canonicalURL`.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-deprecated-astro-canonicalurl: "error" */

/* ✓ GOOD */
const canonicalURL = new URL(Astro.url.pathname, Astro.site);

/* ✗ BAD */
const canonicalURL = Astro.canonicalURL;
---
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Astro Documentation | Migration Guide > Astro 1.0 Release Candidate - Deprecated: `Astro.canonicalURL`](https://docs.astro.build/en/migrate/#deprecated-astrocanonicalurl)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-deprecated-astro-canonicalurl.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-deprecated-astro-canonicalurl.ts)
