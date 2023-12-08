---
title: "astro/no-deprecated-astro-fetchcontent"
description: "disallow using deprecated `Astro.fetchContent()`"
since: "v0.12.0"
---

# astro/no-deprecated-astro-fetchcontent

> disallow using deprecated `Astro.fetchContent()`

- ⚙ This rule is included in `"plugin:astro/recommended"`.
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## 📖 Rule Details

This rule reports use of deprecated `Astro.fetchContent()`.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```astro
---
/* eslint astro/no-deprecated-astro-fetchcontent: "error" */

/* ✓ GOOD */
const posts = await Astro.glob('../pages/post/*.md');

/* ✗ BAD */
const posts_bad = await Astro.fetchContent('../pages/post/*.md');
---

<div>
  {posts.slice(0, 3).map((post) => (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.description}</p>
      <a href={post.frontmatter.url}>Read more</a>
    </article>
  ))}
</div>
```

</ESLintCodeBlock>

## 🔧 Options

Nothing.

## 📚 Further Reading

- [Astro Documentation | Migration Guide > Migrate to v0.26 - New Markdown API](https://docs.astro.build/en/migrate/#new-markdown-api)

## 🚀 Version

This rule was introduced in eslint-plugin-astro v0.12.0

## 🔍 Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/rules/no-deprecated-astro-fetchcontent.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/tests/src/rules/no-deprecated-astro-fetchcontent.ts)
- [Test fixture sources](https://github.com/ota-meshi/eslint-plugin-astro/tree/main/tests/fixtures/rules/no-deprecated-astro-fetchcontent)
