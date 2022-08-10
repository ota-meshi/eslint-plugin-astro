# User Guide

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

## :book: Usage

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

See [the rule list](./rules.md) to get the `rules` that this plugin provides.

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

## :question: FAQ

### Parsing the `.astro` file fails

You should check the [parser configuration](#parser-configuration).

[eslint-plugin-astro3]: https://github.com/astrojs/eslint-plugin-astro3
