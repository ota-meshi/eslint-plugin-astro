---
title: "astro/jsx-a11y/label-has-associated-control"
description: "apply `jsx-a11y/label-has-associated-control` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/label-has-associated-control

> apply `jsx-a11y/label-has-associated-control` rule to Astro components

This rule is the same rule as [jsx-a11y/label-has-associated-control] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/label-has-associated-control]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/label-has-associated-control.md

The following is a partial excerpt from the [jsx-a11y/label-has-associated-control] rule documentation. See [original documentation][jsx-a11y/label-has-associated-control] for more details.

> Enforce that a label tag has a text label and an associated control.
>
> There are two supported ways to associate a label with a control:
>
> - Wrapping a control in a label tag.
> - Adding `htmlFor` to a label and assigning it a DOM ID string that indicates an input on the page.
>
> This rule checks that any `label` tag (or an indicated custom component that will output a `label` tag) either (1) wraps an `input` element (or an indicated custom component that will output an `input` tag) or (2) has an `htmlFor` attribute and that the `label` tag has text content.

## :books: Further Reading

- [jsx-a11y/label-has-associated-control]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/label-has-associated-control.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/label-has-associated-control.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/jsx-a11y/label-has-associated-control)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md)</sup>
