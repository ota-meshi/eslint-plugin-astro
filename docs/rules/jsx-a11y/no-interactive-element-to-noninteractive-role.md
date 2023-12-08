---
title: "astro/jsx-a11y/no-interactive-element-to-noninteractive-role"
description: "apply `jsx-a11y/no-interactive-element-to-noninteractive-role` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-interactive-element-to-noninteractive-role

> apply `jsx-a11y/no-interactive-element-to-noninteractive-role` rule to Astro components

This rule is the same rule as [jsx-a11y/no-interactive-element-to-noninteractive-role] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-interactive-element-to-noninteractive-role]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-interactive-element-to-noninteractive-role.md

The following is a partial excerpt from the [jsx-a11y/no-interactive-element-to-noninteractive-role] rule documentation. See [original documentation][jsx-a11y/no-interactive-element-to-noninteractive-role] for more details.

> Interactive HTML elements indicate _controls_ in the user interface. Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.
>
> Non-interactive HTML elements and non-interactive ARIA roles indicate _content_ and _containers_ in the user interface. Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.
>
> [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert an interactive element to a non-interactive element. Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

## 📚 Further Reading

- [jsx-a11y/no-interactive-element-to-noninteractive-role]

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.11.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-interactive-element-to-noninteractive-role.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-interactive-element-to-noninteractive-role.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/no-interactive-element-to-noninteractive-role)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-interactive-element-to-noninteractive-role.md)</sup>
