# Introduction

`eslint-plugin-astro` is [ESLint] plugin for [Astro components].  
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
[![Coverage Status](https://coveralls.io/repos/github/ota-meshi/eslint-plugin-astro/badge.svg?branch=main)](https://coveralls.io/github/ota-meshi/eslint-plugin-astro?branch=main)

This plugin is in the **_experimental stages_** of development.

At least it works fine with a [withastro/docs](https://github.com/withastro/docs) repository.

## :name_badge: What is this plugin?

[ESLint] plugin for [Astro components].

- Linting Astro components using ESLint.
- Find problems with Astro components.
- Apply a consistent code style to Astro components.
- Linting targets include [Frontmatter], [HTML Template], [Dynamic JSX Expressions], [Client-Side Scripts], [Directives], and more.
- Check code in real time with the ESLint editor integrations.

[frontmatter]: https://docs.astro.build/ja/core-concepts/astro-components/#the-component-script
[html template]: https://docs.astro.build/ja/core-concepts/astro-components/#the-component-template
[dynamic jsx expressions]: https://docs.astro.build/ja/core-concepts/astro-components/#dynamic-jsx-expressions
[client-side scripts]: https://docs.astro.build/ja/core-concepts/astro-components/#client-side-scripts
[directives]: https://docs.astro.build/ja/reference/directives-reference/
[astro-eslint-parser]: https://github.com/ota-meshi/astro-eslint-parser

<!--DOCS_IGNORE_START-->

## :book: Documentation

See [documents](https://ota-meshi.github.io/eslint-plugin-astro/).

<!--INSTALL_GUIDE_START-->

## :cd: Installation

```bash
npm install --save-dev eslint eslint-plugin-astro
```

If you write TypeScript in Astro components, you also need to install the `@typescript-eslint/parser`:

```bash
npm install --save-dev @typescript-eslint/parser
```

If you want to use the rules for checking accessibility (A11Y), you also need to install [eslint-plugin-jsx-a11y] additionally:  
(It is used internally in the rules for A11Y.)

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y

> **Requirements**
>
> - ESLint v7.0.0 and above
> - Node.js v14.18.x, v16.x and above

<!--INSTALL_GUIDE_END-->

<!--DOCS_IGNORE_END-->

## :book: Usage

<!--USAGE_SECTION_START-->
<!--USAGE_GUIDE_START-->

### Configuration

Use `.eslintrc.*` file to configure rules. See also: [https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring).

Example **.eslintrc.js**. When using the shareable configuration provided by the plugin:

```js
module.exports = {
  // ...
  extends: [
    // ...
    "plugin:astro/recommended",
  ],
  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    // ...
  ],
}
```

If you do not use a shareable configuration, it is the same as the following configuration:

```js
module.exports = {
  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Enable this plugin
      plugins: ["astro"],
      env: {
        // Enables global variables available in Astro components.
        node: true,
        "astro/astro": true,
        es2020: true,
      },
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        // The script of Astro components uses ESM.
        sourceType: "module",
      },
      rules: {
        // Enable recommended rules
        "astro/no-conflict-set-directives": "error",
        "astro/no-unused-define-vars-in-style": "error",

        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      env: {
        browser: true,
        es2020: true,
      },
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        // override/add rules settings here, such as:
        // "no-unused-vars": "error"

        // If you are using "prettier/prettier" rule,
        // you don't need to format inside <script> as it will be formatted as a `.astro` file.
        "prettier/prettier": "off",
      },
    },
    // ...
  ],
}
```

The pull request diff [here](https://github.com/withastro/docs/pull/710/files) is an example of introducing `eslint-plugin-astro` to the [withastro/docs](https://github.com/withastro/docs) repository.

This plugin provides configs:

- `plugin:astro/base` ... Minimal configuration to enable correct Astro component linting.
- `plugin:astro/recommended` ... Above, plus rules to prevent errors or unintended behavior.
- `plugin:astro/all` ... Configuration enables all astro rules. It's meant for testing, not for production use because it changes with every minor and major version of the plugin. Use it at your own risk.
- Extension of sharable configuration provided by [eslint-plugin-jsx-a11y]. You need to install [eslint-plugin-jsx-a11y] to use it.
  - `plugin:astro/jsx-a11y-recommended` ... Similar to the [`"plugin:jsx-a11y/recommended"` configuration](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#rule-strictness-in-different-modes), but with the rules extended for Astro components enabled.
  - `plugin:astro/jsx-a11y-strict` ... Similar to the [`"plugin:jsx-a11y/strict"` configuration](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#rule-strictness-in-different-modes), but with the rules extended for Astro components enabled.

See [the rule list](https://ota-meshi.github.io/eslint-plugin-astro/rules/) to get the `rules` that this plugin provides.

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
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "astro", // Enable .astro
    "typescript", // Enable .ts
    "typescriptreact" // Enable .tsx
  ]
}
```

<!--USAGE_GUIDE_END-->
<!--USAGE_SECTION_END-->

## :white_check_mark: Rules

<!--RULES_SECTION_START-->

The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) automatically fixes problems reported by rules which have a wrench :wrench: below.  
The rules with the following star :star: are included in the `plugin:astro/recommended` configs.

> Doesn't the rule you want exist? [Share your idea of that rule with us](https://github.com/ota-meshi/eslint-plugin-astro/issues/new?template=new_rule_request.yml).

<!--RULES_TABLE_START-->

## Possible Errors

These rules relate to possible syntax or logic errors in Astro component code:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/no-conflict-set-directives](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-conflict-set-directives/) | disallow conflicting set directives and child contents | :star: |
| [astro/no-deprecated-astro-canonicalurl](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-deprecated-astro-canonicalurl/) | disallow using deprecated `Astro.canonicalURL` | :star: |
| [astro/no-deprecated-astro-fetchcontent](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-deprecated-astro-fetchcontent/) | disallow using deprecated `Astro.fetchContent()` | :star::wrench: |
| [astro/no-deprecated-astro-resolve](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-deprecated-astro-resolve/) | disallow using deprecated `Astro.resolve()` | :star: |
| [astro/no-unused-define-vars-in-style](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-unused-define-vars-in-style/) | disallow unused `define:vars={...}` in `style` tag | :star: |
| [astro/valid-compile](https://ota-meshi.github.io/eslint-plugin-astro/rules/valid-compile/) | disallow warnings when compiling. | :star: |

## Security Vulnerability

These rules relate to security vulnerabilities in Astro component code:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/no-set-html-directive](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-set-html-directive/) | disallow use of `set:html` to prevent XSS attack |  |

## Best Practices

These rules relate to better ways of doing things to help you avoid problems:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/no-set-text-directive](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-set-text-directive/) | disallow use of `set:text` | :wrench: |
| [astro/no-unused-css-selector](https://ota-meshi.github.io/eslint-plugin-astro/rules/no-unused-css-selector/) | disallow selectors defined in `style` tag that don't use in HTML |  |

## Stylistic Issues

These rules relate to style guidelines, and are therefore quite subjective:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/prefer-class-list-directive](https://ota-meshi.github.io/eslint-plugin-astro/rules/prefer-class-list-directive/) | require `class:list` directives instead of `class` with expressions | :wrench: |
| [astro/prefer-object-class-list](https://ota-meshi.github.io/eslint-plugin-astro/rules/prefer-object-class-list/) | require use object instead of ternary expression in `class:list` | :wrench: |
| [astro/prefer-split-class-list](https://ota-meshi.github.io/eslint-plugin-astro/rules/prefer-split-class-list/) | require use split array elements in `class:list` | :wrench: |

## A11Y Extension Rules

These rules extend the rules provided by [eslint-plugin-jsx-a11y] to work well in Astro component:  
(You need to install [eslint-plugin-jsx-a11y] to use the rules.)

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/jsx-a11y/alt-text](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/alt-text/) | apply `jsx-a11y/alt-text` rule to Astro components |  |
| [astro/jsx-a11y/anchor-ambiguous-text](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/anchor-ambiguous-text/) | apply `jsx-a11y/anchor-ambiguous-text` rule to Astro components |  |
| [astro/jsx-a11y/anchor-has-content](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/anchor-has-content/) | apply `jsx-a11y/anchor-has-content` rule to Astro components |  |
| [astro/jsx-a11y/anchor-is-valid](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/anchor-is-valid/) | apply `jsx-a11y/anchor-is-valid` rule to Astro components |  |
| [astro/jsx-a11y/aria-activedescendant-has-tabindex](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/aria-activedescendant-has-tabindex/) | apply `jsx-a11y/aria-activedescendant-has-tabindex` rule to Astro components |  |
| [astro/jsx-a11y/aria-props](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/aria-props/) | apply `jsx-a11y/aria-props` rule to Astro components |  |
| [astro/jsx-a11y/aria-proptypes](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/aria-proptypes/) | apply `jsx-a11y/aria-proptypes` rule to Astro components |  |
| [astro/jsx-a11y/aria-role](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/aria-role/) | apply `jsx-a11y/aria-role` rule to Astro components |  |
| [astro/jsx-a11y/aria-unsupported-elements](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/aria-unsupported-elements/) | apply `jsx-a11y/aria-unsupported-elements` rule to Astro components |  |
| [astro/jsx-a11y/autocomplete-valid](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/autocomplete-valid/) | apply `jsx-a11y/autocomplete-valid` rule to Astro components |  |
| [astro/jsx-a11y/click-events-have-key-events](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/click-events-have-key-events/) | apply `jsx-a11y/click-events-have-key-events` rule to Astro components |  |
| [astro/jsx-a11y/control-has-associated-label](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/control-has-associated-label/) | apply `jsx-a11y/control-has-associated-label` rule to Astro components |  |
| [astro/jsx-a11y/heading-has-content](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/heading-has-content/) | apply `jsx-a11y/heading-has-content` rule to Astro components |  |
| [astro/jsx-a11y/html-has-lang](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/html-has-lang/) | apply `jsx-a11y/html-has-lang` rule to Astro components |  |
| [astro/jsx-a11y/iframe-has-title](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/iframe-has-title/) | apply `jsx-a11y/iframe-has-title` rule to Astro components |  |
| [astro/jsx-a11y/img-redundant-alt](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/img-redundant-alt/) | apply `jsx-a11y/img-redundant-alt` rule to Astro components |  |
| [astro/jsx-a11y/interactive-supports-focus](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/interactive-supports-focus/) | apply `jsx-a11y/interactive-supports-focus` rule to Astro components |  |
| [astro/jsx-a11y/label-has-associated-control](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/label-has-associated-control/) | apply `jsx-a11y/label-has-associated-control` rule to Astro components |  |
| [astro/jsx-a11y/lang](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/lang/) | apply `jsx-a11y/lang` rule to Astro components |  |
| [astro/jsx-a11y/media-has-caption](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/media-has-caption/) | apply `jsx-a11y/media-has-caption` rule to Astro components |  |
| [astro/jsx-a11y/mouse-events-have-key-events](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/mouse-events-have-key-events/) | apply `jsx-a11y/mouse-events-have-key-events` rule to Astro components |  |
| [astro/jsx-a11y/no-access-key](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-access-key/) | apply `jsx-a11y/no-access-key` rule to Astro components |  |
| [astro/jsx-a11y/no-aria-hidden-on-focusable](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-aria-hidden-on-focusable/) | apply `jsx-a11y/no-aria-hidden-on-focusable` rule to Astro components |  |
| [astro/jsx-a11y/no-autofocus](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-autofocus/) | apply `jsx-a11y/no-autofocus` rule to Astro components |  |
| [astro/jsx-a11y/no-distracting-elements](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-distracting-elements/) | apply `jsx-a11y/no-distracting-elements` rule to Astro components |  |
| [astro/jsx-a11y/no-interactive-element-to-noninteractive-role](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-interactive-element-to-noninteractive-role/) | apply `jsx-a11y/no-interactive-element-to-noninteractive-role` rule to Astro components |  |
| [astro/jsx-a11y/no-noninteractive-element-interactions](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-noninteractive-element-interactions/) | apply `jsx-a11y/no-noninteractive-element-interactions` rule to Astro components |  |
| [astro/jsx-a11y/no-noninteractive-element-to-interactive-role](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-noninteractive-element-to-interactive-role/) | apply `jsx-a11y/no-noninteractive-element-to-interactive-role` rule to Astro components |  |
| [astro/jsx-a11y/no-noninteractive-tabindex](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-noninteractive-tabindex/) | apply `jsx-a11y/no-noninteractive-tabindex` rule to Astro components |  |
| [astro/jsx-a11y/no-redundant-roles](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-redundant-roles/) | apply `jsx-a11y/no-redundant-roles` rule to Astro components |  |
| [astro/jsx-a11y/no-static-element-interactions](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/no-static-element-interactions/) | apply `jsx-a11y/no-static-element-interactions` rule to Astro components |  |
| [astro/jsx-a11y/prefer-tag-over-role](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/prefer-tag-over-role/) | apply `jsx-a11y/prefer-tag-over-role` rule to Astro components |  |
| [astro/jsx-a11y/role-has-required-aria-props](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/role-has-required-aria-props/) | apply `jsx-a11y/role-has-required-aria-props` rule to Astro components |  |
| [astro/jsx-a11y/role-supports-aria-props](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/role-supports-aria-props/) | apply `jsx-a11y/role-supports-aria-props` rule to Astro components |  |
| [astro/jsx-a11y/scope](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/scope/) | apply `jsx-a11y/scope` rule to Astro components |  |
| [astro/jsx-a11y/tabindex-no-positive](https://ota-meshi.github.io/eslint-plugin-astro/rules/jsx-a11y/tabindex-no-positive/) | apply `jsx-a11y/tabindex-no-positive` rule to Astro components |  |

## Extension Rules

These rules extend the rules provided by ESLint itself to work well in Astro component:

| Rule ID | Description |    |
|:--------|:------------|:---|
| [astro/semi](https://ota-meshi.github.io/eslint-plugin-astro/rules/semi/) | Require or disallow semicolons instead of ASI | :wrench: |

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
[astro components]: https://docs.astro.build/en/core-concepts/astro-components/
[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
