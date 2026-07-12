---
"eslint-plugin-astro": major
---

Deprecate `astro/no-omitted-end-tags`, make it a no-op, and remove it from the
recommended configuration. This rule can no longer report omitted end tags once
Astro's Rust compiler rejects them during parsing.
