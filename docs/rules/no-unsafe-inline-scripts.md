---
title: "astro/no-unsafe-inline-scripts"
description: "disallow inline `<script>` without `src` to encourage CSP-safe patterns"
---

# astro/no-unsafe-inline-scripts

> disallow inline `<script>` without `src` to encourage CSP-safe patterns

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## 📖 Rule Details

Inline scripts typically require `script-src 'unsafe-inline'` in your Content Security Policy, increasing XSS risk. Prefer external scripts (`src`) or safer patterns.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro

---
/* eslint astro/no-unsafe-inline-scripts: "error" */
---

  {/* ✗ BAD */}
  <button id="btn">Click</button>
  <script>
    console.log('inline')
  </script>

  {/* ✗ BAD */}
  <script type="module">
    console.log('inline module')
  </script>

  {/* ✓ GOOD */}
  <script src="/assets/app.js"></script>

  {/* ✓ GOOD */}
  <script type="application/ld+json">
    {JSON.stringify({"@context": "https://schema.org", "@type": "Thing"})}
  </script>

```

</ESLintCodeBlock>

## 🔧 Options

```json
{
  "astro/no-unsafe-inline-scripts": [
    "warn",
    {
      "allowDefineVars": false,
      "allowModuleScripts": false,
      "allowNonExecutingTypes": ["application/ld+json", "application/json"],
      "allowNonce": false
    }
  ]
}
```

- `allowDefineVars` (default: `false`): allows inline `<script define:vars={...}>`. Set to `true` to allow scripts with `define:vars`.
- `allowModuleScripts` (default: `false`): allows inline `<script type="module">`.
- `allowNonExecutingTypes` (default includes JSON/JSON-LD): allows non-executing types.
- `allowNonce` (default: `false`): allows inline scripts with a `nonce` attribute (for CSP nonce deployments).


## 🔇 When Not To Use It

If your project allows inline scripts (e.g., CSP with nonces), you may disable this rule or adjust options.

## 📚 Further Reading

- [OWASP: Cross Site Scripting (XSS) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) <!-- Official OWASP reference -->
- [Astro Docs: Client-Side Scripts](https://docs.astro.build/en/guides/client-side-scripts/) <!-- Official Astro docs -->
- [CSP Guide: `unsafe-inline` explanation](https://content-security-policy.com/unsafe-inline/) <!-- CSP reference -->





## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-unsafe-inline-scripts.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-unsafe-inline-scripts.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-unsafe-inline-scripts)
