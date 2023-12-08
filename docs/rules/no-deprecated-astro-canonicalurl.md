---
title: "astro/no-deprecated-astro-canonicalurl"
description: "disallow using deprecated `Astro.canonicalURL`"
since: "v0.16.0"
---

# astro/no-deprecated-astro-canonicalurl

> disallow using deprecated `Astro.canonicalURL`

- ⚙ This rule is included in `"plugin:astro/recommended"`.

## 📖 Rule Details

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

{canonicalURL}
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 📚 Further Reading

- [Astro Documentation | Migration Guide > Astro 1.0 Release Candidate - Deprecated: `Astro.canonicalURL`](https://docs.astro.build/en/migrate/#deprecated-astrocanonicalurl)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.16.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-deprecated-astro-canonicalurl.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-deprecated-astro-canonicalurl.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-deprecated-astro-canonicalurl)
