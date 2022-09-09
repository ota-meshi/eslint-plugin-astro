---
title: "astro/jsx-a11y/anchor-is-valid"
description: "apply `jsx-a11y/anchor-is-valid` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/anchor-is-valid

> apply `jsx-a11y/anchor-is-valid` rule to Astro components

This rule is the same rule as [jsx-a11y/anchor-is-valid] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/anchor-is-valid]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-is-valid.md

The following is a partial excerpt from the [jsx-a11y/anchor-is-valid] rule documentation. See [original documentation][jsx-a11y/anchor-is-valid] for more details.

> The HTML `<a>` element, with a valid `href` attribute, is formally defined as representing a **hyperlink**. That is, a link between one HTML document and another, or between one location inside an HTML document and another location inside the same document.
>
> In fact, the interactive, underlined `<a>` element has become so synonymous with web navigation that this expectation has become entrenched inside browsers, assistive technologies such as screen readers and in how people generally expect the internet to behave. In short, anchors should navigate.
>
> The use of JavaScript frameworks and libraries, like _React_, has made it very easy to add or subtract functionality from the standard HTML elements. This has led to _anchors_ often being used in applications based on how they look and function instead of what they represent.
>
> Whilst it is possible, for example, to turn the `<a>` element into a fully functional `<button>` element with ARIA, the native user agent implementations of HTML elements are to be preferred over custom ARIA solutions.

## :books: Further Reading

- [jsx-a11y/anchor-is-valid]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/anchor-is-valid.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/anchor-is-valid.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/anchor-is-valid)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-is-valid.md)</sup>
