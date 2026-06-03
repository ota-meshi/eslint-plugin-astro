---
title: "astro/prefer-astro-zod-import"
description: "enforce importing Zod from `astro/zod` to stay in sync with the version bundled with Astro"
---

# astro/prefer-astro-zod-import

> enforce importing Zod from `astro/zod` to stay in sync with the version bundled with Astro

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.
- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## 📖 Rule Details

The [Astro documentation for `astro/zod`](https://docs.astro.build/en/reference/modules/astro-zod/#imports-from-astrozod) recommends importing Zod from `astro/zod` rather than from `zod` directly. Doing so:

- Removes the need to install `zod` as a separate dependency.
- Ensures your code uses the same Zod version as Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) and [Actions](https://docs.astro.build/en/guides/actions/).

This rule reports `import` and re-`export` declarations whose source is `zod` or any `zod/*` subpath, and offers an auto-fix when the replacement with `astro/zod` is API-compatible.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/prefer-astro-zod-import: "error" */

/* ✓ GOOD */
import { z } from "astro/zod"

/* ✗ BAD */
import { z } from "zod"
import { z } from "zod/v4"
---
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## ⚠️ Notes on auto-fixing

`astro/zod` re-exports Zod v4. The auto-fix is therefore only applied for sources that are API-compatible:

- `zod` → `astro/zod` (fixed)
- `zod/v4` → `astro/zod` (fixed)
- `zod/v4-mini` → `astro/zod` (fixed)
- `zod/v3`, `zod/locales/*`, etc. → reported only (no auto-fix), since the API differs from v4 or the subpath is not re-exported by `astro/zod`.

## 📚 Further Reading

- [Astro Documentation | The `astro/zod` module](https://docs.astro.build/en/reference/modules/astro-zod/)
- [Astro Documentation | Imports from `astro/zod`](https://docs.astro.build/en/reference/modules/astro-zod/#imports-from-astrozod)



## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/prefer-astro-zod-import.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/prefer-astro-zod-import.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/prefer-astro-zod-import)
