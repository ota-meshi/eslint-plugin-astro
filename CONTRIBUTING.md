# Contributing

Thanks for contributing!

## Installation

```sh
git clone https://github.com/ota-meshi/eslint-plugin-astro.git
cd eslint-plugin-astro
npm install
```

## Running the tests

```sh
npm test
```

This is an [ESLint](http://eslint.org) plugin. Documentation for the APIs that it uses can be found on ESLint's [Working with Plugins](http://eslint.org/docs/developer-guide/working-with-plugins) page.

This plugin is used to lint itself. The style is checked when `npm lint` is run, and the build will fail if there are any linting errors. You can use `npm eslint-fix` to fix some linting errors.

## Other Development Tools

- `npm test` runs tests.
- `npm cover` runs tests and measures coverage.
- `npm new [new-rule-name]` generate the files needed to implement the new rule.
- `npm update` runs in order to update readme and recommended configuration.
- `npm docs:dev` launch the document site in development mode.

## Test the Rule

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
npm test -g no-deprecated-astro-fetchcontent
```

Take <https://stackoverflow.com/questions/10832031/how-to-run-a-single-test-with-mocha> as reference for details.

If you want to test only `my-test-input.astro`, add `my-test-config.json` and save `{"only": true}`.  
(Note that `{"only": true}` must be removed before making a pull request.)

## Commit messages

Please view [commitlint](https://commitlint.js.org) and [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) for more details.

## Publishing

We're using [changesets](https://github.com/changesets/changesets) for version management, CHANGELOG and releasing automatically.

Please view [changesets-bot](https://github.com/apps/changeset-bot) and its [action](https://github.com/changesets/action) for more details.
