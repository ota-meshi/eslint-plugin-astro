---
title: "astro/jsx-a11y/control-has-associated-label"
description: "apply `jsx-a11y/control-has-associated-label` rule to Astro components"
setup: "import ESLintCodeBlock from '../docs-build/src/components/ESLintCodeBlockWrap.astro'"
since: "v0.11.0"
---

# astro/jsx-a11y/control-has-associated-label

> apply `jsx-a11y/control-has-associated-label` rule to Astro components

This rule is the same rule as [jsx-a11y/control-has-associated-label] rule but it applies to the Astro components.

[jsx-a11y/control-has-associated-label]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/control-has-associated-label.md

The following is a partial excerpt from the [jsx-a11y/control-has-associated-label] rule documentation. See [original documentation][jsx-a11y/control-has-associated-label] for more details.

> Enforce that a control (an interactive element) has a text label.
>
> There are two supported ways to supply a control with a text label:
>
> - Provide text content inside the element.
> - Use the `aria-label` attribute on the element, with a text value.
> - Use the `aria-labelledby` attribute on the element, and point the IDREF value to an element with an accessible label.
> - Alternatively, with an `img` tag, you may use the `alt` attribute to supply a text description of the image.
>
> The rule is permissive in the sense that it will assume that expressions will eventually provide a label. So an element like this will pass.
>
> ```jsx
> <button type="button">{maybeSomethingThatContainsALabel}</button>
> ```

## :books: Further Reading

- [jsx-a11y/control-has-associated-label]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/control-has-associated-label.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/control-has-associated-label.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md)</sup>
