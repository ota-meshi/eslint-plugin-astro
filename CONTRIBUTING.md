# Contributing

Thanks for contributing!

## Reporting bugs

To report a bug, [open an issue][new-issue].

If you are unsure whether something is a bug or not, please [open an issue][new-issue]. Insufficient documentation is also a bug.

## Suggesting new features

New features can be a new rule, anew option for an existing rule, or new functionality for existing rules.

To suggest a new feature, [open an issue][new-issue].

## Making pull requests

(If this is your first pull request on GitHub, checkout [this guide](https://github.com/firstcontributions/first-contributions).)

### Installation

```sh
git clone https://github.com/ota-meshi/eslint-plugin-astro.git
cd eslint-plugin-astro
npm install
```

### Running the tests

```sh
npm run test
```

This is an [ESLint](http://eslint.org) plugin. Documentation for the APIs that it uses can be found on ESLint's [Working with Plugins](http://eslint.org/docs/developer-guide/working-with-plugins) page.

This plugin is used to lint itself. The style is checked when `npm run lint` is run, and the build will fail if there are any linting errors. You can use `npm run eslint-fix` to fix some linting errors.

### Other Development Tools

- `npm run test` runs tests.
- `npm run cover` runs tests and measures coverage.
- `npm run new -- [new-rule-name]` generate the files needed to implement the new rule.
- `npm run update` runs in order to update readme and recommended configuration.
- `npm run docs:dev` launch the document site in development mode.

### Test the Rule

Rule testing almost always uses fixtures.  
For example, for a `no-deprecated-astro-fetchcontent` rule, the `.ts` file that runs the test is `tests/src/rules/no-deprecated-astro-fetchcontent.ts` and the fixture is in `tests/fixtures/rules/no-deprecated-astro-fetchcontent`.  
The fixture directory has an `no-deprecated-astro-fetchcontent` directory and a `valid` directory.

- The `invalid` directory contains test cases where the rule reports problems.
- The `valid` directory contains test cases where the rule does not report a problem.

The fixture input file should be named `*-input.astro`. It is automatically collected and tested.  
If your test requires configuration, you need to add a json file with the configuration.

- If you want to apply a configuration to `my-test-input.astro`, add `my-test-config.json`.
- If you want to apply the same configuration to all the fixtures in that directory, add `_config.json`.

To verify the output of invalid test cases requires `*-errors.json`, and `*-output.astro` (for auto-fix). However, you don't have to add them yourself. If they do not exist, they will be automatically generated when you run the test. In other words, delete them manually when you want to recreate them.

**Tips**:

If you want to test only one rule, run the following command (for `no-deprecated-astro-fetchcontent` rule):

```sh
npm run test -- -g no-deprecated-astro-fetchcontent
```

Take <https://stackoverflow.com/questions/10832031/how-to-run-a-single-test-with-mocha> as reference for details.

If you want to test only `my-test-input.astro`, add `my-test-config.json` and save `{"only": true}`.  
(Note that `{"only": true}` must be removed before making a pull request.)

### Document for Rule

The documentation should contain a description of the rule and the problem it detects/solves, examples, all features, all options, and any additional information relevant to the rule.

**Tips**:

When you create a new rule, do not include `since` in the frontmatter of the document for the rule. Because it will be added automatically on release.

### Commit messages

Please view [commitlint](https://commitlint.js.org) and [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) for more details.

### Publishing

We're using [changesets](https://github.com/changesets/changesets) for version management, CHANGELOG and releasing automatically.

Please view [changesets-bot](https://github.com/apps/changeset-bot) and its [action](https://github.com/changesets/action) for more details.

[new-issue]: https://github.com/ota-meshi/eslint-plugin-astro/issues/new/choose
