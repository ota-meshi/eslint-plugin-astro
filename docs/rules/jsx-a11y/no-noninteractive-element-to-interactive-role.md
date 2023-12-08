---
title: "astro/jsx-a11y/no-noninteractive-element-to-interactive-role"
description: "apply `jsx-a11y/no-noninteractive-element-to-interactive-role` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/no-noninteractive-element-to-interactive-role

> apply `jsx-a11y/no-noninteractive-element-to-interactive-role` rule to Astro components

This rule is the same rule as [jsx-a11y/no-noninteractive-element-to-interactive-role] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/no-noninteractive-element-to-interactive-role]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-to-interactive-role.md

The following is a partial excerpt from the [jsx-a11y/no-noninteractive-element-to-interactive-role] rule documentation. See [original documentation][jsx-a11y/no-noninteractive-element-to-interactive-role] for more details.

> Non-interactive HTML elements indicate _content_ and _containers_ in the user interface. Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.
>
> Interactive HTML elements indicate _controls_ in the user interface. Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.
>
>
> [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert a non-interactive element to an interactive element. Interactive ARIA roles include `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` and `textbox`.

## 📚 Further Reading

- [jsx-a11y/no-noninteractive-element-to-interactive-role]

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.11.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/no-noninteractive-element-to-interactive-role.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/no-noninteractive-element-to-interactive-role.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/no-noninteractive-element-to-interactive-role)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-to-interactive-role.md)</sup>
