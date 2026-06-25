---
"eslint-plugin-astro": patch
---

Fix false positives in `astro/no-omitted-end-tags` for component names that overlap with HTML tag names, such as `<Head>`, while preserving reported source offsets.
