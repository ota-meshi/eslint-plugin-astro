---
title: "astro/no-client-directive-on-astro-component"
description: "disallow using `client:` directives on Astro components since they are server-only"
---

# astro/no-client-directive-on-astro-component

> disallow using `client:` directives on Astro components since they are server-only

- ⚙ This rule is included in the `recommended` config.
- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## 📖 Rule Details

Astro components render on the server and cannot be hydrated in the browser. This rule reports `client:` directives on components imported from `.astro` files, which would otherwise make the Astro build fail.

<ESLintCodeBlock>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-client-directive-on-astro-component: "error" */
import AstroComponent from "./AstroComponent.astro"
import ReactComponent from "./ReactComponent.tsx"
---

{/* ✓ GOOD */}
<AstroComponent />
<ReactComponent client:load />

{/* ✗ BAD */}
<AstroComponent client:load />
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 📚 Further Reading

- [Astro Documentation | Client Directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)



## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-client-directive-on-astro-component.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-client-directive-on-astro-component.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-client-directive-on-astro-component)
