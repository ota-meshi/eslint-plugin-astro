# Introduction

`eslint-plugin-astro` is [ESLint] plugin for [Astro] components.  
You can check on the [Online DEMO](https://ota-meshi.github.io/eslint-plugin-astro/playground/).

[![sponsors](https://img.shields.io/badge/-Sponsor-fafbfc?logo=GitHub%20Sponsors)](https://github.com/sponsors/ota-meshi)

[![NPM license](https://img.shields.io/npm/l/eslint-plugin-astro.svg)](https://www.npmjs.com/package/eslint-plugin-astro)
[![NPM version](https://img.shields.io/npm/v/eslint-plugin-astro.svg)](https://www.npmjs.com/package/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/badge/dynamic/json.svg?label=downloads&colorB=green&suffix=/day&query=$.downloads&uri=https://api.npmjs.org//downloads/point/last-day/eslint-plugin-astro&maxAge=3600)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dw/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dy/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![NPM downloads](https://img.shields.io/npm/dt/eslint-plugin-astro.svg)](http://www.npmtrends.com/eslint-plugin-astro)
[![Build Status](https://github.com/ota-meshi/eslint-plugin-astro/workflows/CI/badge.svg?branch=main)](https://github.com/ota-meshi/eslint-plugin-astro/actions?query=workflow%3ACI)

This parser is in the **_experimental stages_** of development.

## :name_badge: What is this plugin?

[ESLint] plugin for [Astro] components.

[astro-eslint-parser]: https://github.com/ota-meshi/astro-eslint-parser

<!--DOCS_IGNORE_START-->

## :book: Documentation

See [documents](https://ota-meshi.github.io/eslint-plugin-astro/).

<!--INSTALL_GUIDE_START-->

## :cd: Installation

```bash
npm install --save-dev eslint eslint-plugin-astro astro-eslint-parser @typescript-eslint/parser
```

> **Requirements**
>
> - ESLint v7.0.0 and above
> - Node.js v14.17.x, v16.x and above

<!--INSTALL_GUIDE_END-->

<!--DOCS_IGNORE_END-->

## :book: Usage

<!--USAGE_SECTION_START-->
<!--USAGE_GUIDE_START-->

### Configuration

Use `.eslintrc.*` file to configure rules. See also: [https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring).

Example **.eslintrc.js**:

```js
module.exports = {
  // ...
  overrides: [
    {
      files: ["*.astro"],
      // Enable this plugin
      plugins: ["astro"],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        "astro/astro": true,
      },
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // 'astro/rule-name': 'error'
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
      },
    },
    // ...
  ],
}
```

<!-- This plugin provides configs:

- `plugin:astro/base` ... Configuration to enable correct Astro component parsing.
- `plugin:astro/recommended` ... Above, plus rules to prevent errors or unintended behavior.

See [the rule list](https://ota-meshi.github.io/eslint-plugin-astro/rules/) to get the `rules` that this plugin provides. -->

#### Parser Configuration

See [https://github.com/ota-meshi/astro-eslint-parser#readme](https://github.com/ota-meshi/astro-eslint-parser#readme).

### Running ESLint from the command line

If you want to run `eslint` from the command line, make sure you include the `.astro` extension using [the `--ext` option](https://eslint.org/docs/user-guide/configuring#specifying-file-extensions-to-lint) or a glob pattern, because ESLint targets only `.js` files by default.

Examples:

```bash
eslint --ext .js,.astro src
eslint "src/**/*.{js,astro}"
```

## :computer: Editor Integrations

### Visual Studio Code

Use the [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension that Microsoft provides officially.

You have to configure the `eslint.validate` option of the extension to check `.astro` files, because the extension targets only `*.js` or `*.jsx` files by default.

Example **.vscode/settings.json**:

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "astro"]
}
```

<!--USAGE_GUIDE_END-->
<!--USAGE_SECTION_END-->

## :white_check_mark: Rules

<!--RULES_SECTION_START-->

The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) automatically fixes problems reported by rules which have a wrench :wrench: below.

<!-- The rules with the following star :star: are included in the configs. -->

<!--RULES_TABLE_START-->

## Security Vulnerability

These rules relate to security vulnerabilities in Astro component code:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/no-set-html-directive](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-set-html-directive/) | disallow use of `set:html` to prevent XSS attack |  |

<!--RULES_TABLE_END-->
<!--RULES_SECTION_END-->

<!--DOCS_IGNORE_START-->

## :beers: Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm run update` runs in order to update readme and recommended configuration.

### Working With Rules

This plugin uses [astro-eslint-parser](https://github.com/ota-meshi/astro-eslint-parser) for the parser. Check [here](https://ota-meshi.github.io/astro-eslint-parser/) to find out about AST.

<!--DOCS_IGNORE_END-->

## :heart: Supporting

If you are willing to see that this package continues to be maintained, please consider sponsoring me.

[![sponsors](https://img.shields.io/badge/-Sponsor-fafbfc?logo=GitHub%20Sponsors)](https://github.com/sponsors/ota-meshi)

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[astro]: https://astro.build/
[eslint]: https://eslint.org/
