# User Guide

## :cd: Installation

```bash
npm install --save-dev eslint eslint-plugin-astro astro-eslint-parser
```

::: tip Requirements

- ESLint v7.0.0 and above
- Node.js v14.17.x, v16.x and above

:::

## :book: Usage

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
    // ...
  ],
}
```

<!-- This plugin provides configs:

- `plugin:astro/base` ... Configuration to enable correct Astro component parsing.
- `plugin:astro/recommended` ... Above, plus rules to prevent errors or unintended behavior.

See [the rule list](./rules.md) to get the `rules` that this plugin provides. -->

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

## :question: FAQ

### Parsing the `.astro` file fails

You should check the [parser configuration](#parser-configuration).

[eslint-plugin-astro3]: https://github.com/astrojs/eslint-plugin-astro3
