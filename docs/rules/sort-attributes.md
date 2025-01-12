---
title: "astro/sort-attributes"
description: "enforce sorting of attributes"
since: "v1.3.0"
---

# astro/sort-attributes

> enforce sorting of attributes

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## 📖 Rule Details

Maintaining a consistent order of attributes in Astro elements is crucial for readability and maintainability. This rule ensures that attributes are sorted, making the structure of your elements more predictable and easier to manage.

Adopting this rule helps standardize code formatting across your project, facilitating better collaboration and reducing cognitive load for developers.

It’s safe. The rule considers spread elements in an attributes list and does not break component functionality.

Default:

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/sort-attributes: "error" */
---

{/* ✓ GOOD */}
<Element a="a" b="b" c="c" />

{/* ✓ BAD */}
<Element c="c" b="b" a="a" />
```

</ESLintCodeBlock>

## 🔧 Options

```json
{
  "astro/sort-attributes": [
    "error", 
    { "type": "alphabetical", "order": "asc", "ignoreCase": true }
  ]
}
```

## 🚀 Version

This rule was introduced in eslint-plugin-astro v1.3.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/sort-attributes.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/sort-attributes.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/sort-attributes)
