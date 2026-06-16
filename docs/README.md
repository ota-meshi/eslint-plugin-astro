---
title: "eslint-plugin-astro"
---

# Introduction

`eslint-plugin-astro` is [ESLint] plugin for [Astro components].  
You can check on the [Online DEMO](./playground.md).

[![sponsors](https://img.shields.io/badge/-Sponsor-fafbfc?logo=GitHub%20Sponsors)](https://github.com/sponsors/ota-meshi)

[![NPM license](https://img.shields.io/npm/l/eslint-plugin-astro.svg)](https://www.npmjs.com/package/eslint-plugin-astro)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-astro.svg)](https://www.npmjs.com/package/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/badge/dynamic/json.svg?label=downloads&colorB=green&suffix=/day&query=$.downloads&uri=https://api.npmjs.org//downloads/point/last-day/eslint-plugin-astro&maxAge=3600)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dw/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dy/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dt/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![Build Status](https://github.com/ota-meshi/eslint-plugin-astro/workflows/CI/badge.svg?branch=main)](https://github.com/ota-meshi/eslint-plugin-astro/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/ota-meshi/eslint-plugin-astro/badge.svg?branch=main)](https://coveralls.io/github/ota-meshi/eslint-plugin-astro?branch=main)

This plugin is in the **_experimental stages_** of development.

At least it works fine with a [withastro/docs](https://github.com/withastro/docs) repository.

## 📛 What is this plugin?

[ESLint] plugin for [Astro components].

- Linting Astro components using ESLint.
- Find problems with Astro components.
- Apply a consistent code style to Astro components.
- Linting targets include [Frontmatter], [HTML Template], [JSX-like Expressions], [Client-Side Scripts], [Directives], and more.
- Check code in real time with the ESLint editor integrations.

[frontmatter]: https://docs.astro.build/en/core-concepts/astro-components/#the-component-script
[html template]: https://docs.astro.build/en/core-concepts/astro-components/#the-component-template
[JSX-like Expressions]: https://docs.astro.build/en/core-concepts/astro-syntax/#jsx-like-expressions
[client-side scripts]: https://docs.astro.build/en/guides/client-side-scripts/
[directives]: https://docs.astro.build/en/reference/directives-reference/

## 📖 Usage

See [User Guide](./user-guide.md).

## ✅ Rules

See [Available Rules](./rules.md).

## 🚥 Versioning policy

This plugin follows [Semantic Versioning].
However, please note that we do not follow [ESLint's Semantic Versioning Policy].
In minor version releases, this plugin may change the sharable configs provided by the plugin or the default behavior of the plugin's rules in order to add features to the plugin. Because we want to add many features to the plugin soon, so that users can easily take advantage of new features in Astro.

According to our policy, any minor update may report more linting errors than the previous release. As such, we recommend using the [tilde (`~`)](https://semver.npmjs.com/#syntax-examples) in `package.json` to guarantee the results of your builds.

[Semantic Versioning]: https://semver.org/
[ESLint's Semantic Versioning Policy]: https://github.com/eslint/eslint#semantic-versioning-policy

## ❤️ Supporting

If you are willing to see that this package continues to be maintained, please consider sponsoring me.

[![sponsors](https://img.shields.io/badge/-Sponsor-fafbfc?logo=GitHub%20Sponsors)](https://github.com/sponsors/ota-meshi)

## 🔒 License

See the [LICENSE](https://github.com/ota-meshi/eslint-plugin-astro/blob/main/LICENSE) file for license rights and limitations (MIT).

[eslint]: https://eslint.org/
[astro components]: https://docs.astro.build/en/core-concepts/astro-components/
