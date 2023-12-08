---
title: "astro/jsx-a11y/aria-activedescendant-has-tabindex"
description: "apply `jsx-a11y/aria-activedescendant-has-tabindex` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/aria-activedescendant-has-tabindex

> apply `jsx-a11y/aria-activedescendant-has-tabindex` rule to Astro components

This rule is the same rule as [jsx-a11y/aria-activedescendant-has-tabindex] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/aria-activedescendant-has-tabindex]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-activedescendant-has-tabindex.md

The following is a partial excerpt from the [jsx-a11y/aria-activedescendant-has-tabindex] rule documentation. See [original documentation][jsx-a11y/aria-activedescendant-has-tabindex] for more details.

> `aria-activedescendant` is used to manage focus within a [composite widget](https://www.w3.org/TR/wai-aria/#composite).
The element with the attribute `aria-activedescendant` retains the active document
focus; it indicates which of its child elements has secondary focus by assigning
the ID of that element to the value of `aria-activedescendant`. This pattern is
used to build a widget like a search typeahead select list. The search input box
retains document focus so that the user can type in the input. If the down arrow
key is pressed and a search suggestion is highlighted, the ID of the suggestion
element will be applied as the value of `aria-activedescendant` on the input
element.
>
> Because an element with `aria-activedescendant` must be tabbable, it must either
have an inherent `tabIndex` of zero or declare a `tabIndex` of zero with the `tabIndex`
attribute.

## 📚 Further Reading

- [jsx-a11y/aria-activedescendant-has-tabindex]

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.11.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/aria-activedescendant-has-tabindex.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/aria-activedescendant-has-tabindex.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/aria-activedescendant-has-tabindex)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/aria-activedescendant-has-tabindex.md)</sup>
