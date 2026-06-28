---
"eslint-plugin-astro": minor
---

Add new rule `astro/prefer-astro-zod-import` that enforces importing Zod from `astro/zod` instead of the standalone `zod` package, keeping consumer code in sync with the Zod version bundled with Astro. Auto-fixes `zod`, `zod/v4`, and `zod/v4-mini` to `astro/zod`; reports without auto-fix for `zod/v3` and `zod/locales/*` because those subpaths are not re-exported.
