---
title: "astro/jsx-a11y/media-has-caption"
description: "apply `jsx-a11y/media-has-caption` rule to Astro components"
since: "v0.11.0"
---

# astro/jsx-a11y/media-has-caption

> apply `jsx-a11y/media-has-caption` rule to Astro components

This rule is the same rule as [jsx-a11y/media-has-caption] rule but it applies to the Astro components.  
You must have [eslint-plugin-jsx-a11y] installed to use this rule.

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[jsx-a11y/media-has-caption]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/media-has-caption.md

The following is a partial excerpt from the [jsx-a11y/media-has-caption] rule documentation. See [original documentation][jsx-a11y/media-has-caption] for more details.

> Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only is this important for accessibility, but can also be useful for all users in the case that the media is unavailable (similar to `alt` text on an image when an image is unable to load).
>
> The captions should contain all important and relevant information to understand the corresponding media. This may mean that the captions are not a 1:1 mapping of the dialogue in the media content. However, captions are *not* necessary for video components with the `muted` attribute.

## :books: Further Reading

- [jsx-a11y/media-has-caption]

## :rocket: Version

This rule was introduced in eslint-plugin-astro v0.11.0

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/jsx-a11y/media-has-caption.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/jsx-a11y/media-has-caption.ts)

<sup>Taken with ❤️ [from eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/media-has-caption.md)</sup>
