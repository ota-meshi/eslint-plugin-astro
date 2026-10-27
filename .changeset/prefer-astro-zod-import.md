---
"eslint-plugin-astro": minor
---

Add new rule `astro/prefer-astro-zod-import` that enforces importing Zod from `astro/zod` instead of the standalone `zod` package, keeping consumer code in sync with the Zod version bundled with Astro. Covers `import` / re-`export` declarations, dynamic `import()` expressions, and TypeScript `import(...)` type queries. Auto-fixes `zod`, `zod/v4`, and `zod/v4-mini` to `astro/zod`; reports without auto-fix for `zod/v3` and `zod/locales/*` because those subpaths are not re-exported.
