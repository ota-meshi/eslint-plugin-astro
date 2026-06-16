# User Guide

<!--INSTALL_GUIDE_START-->

## 💿 Installation

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
> - ESLint v10.0.0 and above
> - Node.js v22.22.3, v24.16.0, v26.3.0 and above

<!--INSTALL_GUIDE_END-->

## 📖 Usage

<!--USAGE_GUIDE_START-->

### Configuration

#### Flat Config \(`eslint.config.js`\)

This package is ESM-only. Use `eslint.config.js` or `eslint.config.mjs` to configure rules. See also: [https://eslint.org/docs/latest/use/configure/configuration-files](https://eslint.org/docs/latest/use/configure/configuration-files).

Example **eslint.config.js**:

```js
import eslintPluginAstro from "eslint-plugin-astro"

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
```

This plugin provides configs:

- `base` ... Minimal configuration to enable correct Astro component linting.
- `recommended` ... Above, plus rules to prevent errors or unintended behavior.
- `all` ... Configuration enables all astro rules. It's meant for testing, not for production use because it changes with every minor and major version of the plugin. Use it at your own risk.
- Extension of sharable configuration provided by [eslint-plugin-jsx-a11y]. You need to install [eslint-plugin-jsx-a11y] to use it.
  - `jsx-a11y-recommended` ... Similar to the [`jsx-a11y` recommended configuration](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#rule-strictness-in-different-modes), but with the rules extended for Astro components enabled.
  - `jsx-a11y-strict` ... Similar to the [`jsx-a11y` strict configuration](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#rule-strictness-in-different-modes), but with the rules extended for Astro components enabled.

See [the rule list](./rules.md) to get the `rules` that this plugin provides.

The pull request diff [here](https://github.com/withastro/docs/pull/710/files) is an example of introducing `eslint-plugin-astro` to the [withastro/docs](https://github.com/withastro/docs) repository.

#### Parser Configuration

See [https://github.com/ota-meshi/astro-eslint-parser#readme](https://github.com/ota-meshi/astro-eslint-parser#readme).

### Resolving Error in JSX: Unsafe return of an `any` typed value

Astro supports JSX from multiple frameworks such as **React**, **Preact**, and **Solid.js** by defining JSX Elements as `HTMLElement | any;`. When a framework with a JSX type definition is not present in your project this **any** can cause the ESLint error `@typescript-eslint/no-unsafe-return`.

This can be resolved by overriding the astroHTML.JSX.Element definition with a `*.d.ts` file such as `jsx.d.ts` in your project root directory:

```typescript
import "astro/astro-jsx";

declare global {
  namespace JSX {
    // type Element = astroHTML.JSX.Element // We want to use this, but it is defined as any.
    type Element = HTMLElement;
  }
}
```

Add this `*.d.ts` to your `tsconfig.eslint.json`:

```json
{
  "extends": "./tsconfig.json",
  "include": [
    // ...
    "jsx.d.ts"
  ]
}

```

If you use typed linting for Astro files, point `languageOptions.parserOptions.project` at this config:

```js
import eslintPluginAstro from "eslint-plugin-astro"

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["*.astro", "**/*.astro"],
    languageOptions: {
      parserOptions: {
        // add this line
        project: "./tsconfig.eslint.json",
      },
    },
  },
]
```

Alternatively, add the `project` option to an existing Astro config entry:

```js
export default [
  // ...
  {
    files: ["*.astro", "**/*.astro"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
]
```

### Running ESLint from the command line

If you want to run `eslint` from the command line, make sure you include the `.astro` extension using a glob pattern, because ESLint targets only `.js` files by default.

Examples:

```bash
eslint "src/**/*.{js,astro}"
```

## 💻 Editor Integrations

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

### Zed

Zed has built-in support for ESLint. However, you need to configure ESLint to work with Astro files.

Example **.zed/settings.json**:

```json
{
  "languages": {
    "Astro": {
      "language_servers": ["eslint", "..."]
    }
  }
}
```

<!--USAGE_GUIDE_END-->

## ❓ FAQ

### Parsing the `.astro` file fails

You should check the [parser configuration](#parser-configuration).
