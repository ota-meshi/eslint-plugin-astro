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
  extends: [
    // add more generic rule sets here, such as:
    // 'eslint:recommended',
    "plugin:astro/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'astro/rule-name': 'error'
  },
}
```

This plugin provides configs:

- `plugin:astro/base` ... Configuration to enable correct Astro component parsing.
- `plugin:astro/recommended` ... Above, plus rules to prevent errors or unintended behavior.

See [the rule list](./rules.md) to get the `rules` that this plugin provides.

#### Parser Configuration

If you have specified a parser, you need to configure a parser for `.astro`.

For example, if you are using the `"@typescript-eslint/parser"`, and if you want to use TypeScript in frontmatter of `.astro`, you need to add more `parserOptions` configuration.

```js
module.exports = {
  // ...
  extends: ["plugin:astro/recommended"],
  // ...
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ...
    project: "path/to/your/tsconfig.json",
    extraFileExtensions: [".astro"],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    // ...
  ],
  // ...
}
```

See also [https://github.com/ota-meshi/astro-eslint-parser#readme](https://github.com/ota-meshi/astro-eslint-parser#readme).

#### settings["astro"]

You can change the behavior of this plugin with some settings.

- `ignoreWarnings` (optional) ... Specifies an array of rules that ignore reports in the template.  
  For example, set rules on the template that cannot avoid false positives.

e.g.

```js
module.exports = {
  // ...
  settings: {
    astro: {
      ignoreWarnings: [
        "@typescript-eslint/no-unsafe-assignment",
        "@typescript-eslint/no-unsafe-member-access",
      ],
    },
  },
  // ...
}
```

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
