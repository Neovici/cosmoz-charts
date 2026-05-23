[![Build Status](https://github.com/Neovici/cosmoz-charts/workflows/Github%20CI/badge.svg)](https://github.com/Neovici/cosmoz-charts/actions?workflow=Github+CI)
[![pnpm](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-changesets-e10079.svg)](https://github.com/changesets/changesets)

# \<cosmoz-charts\>

Create beautiful charts using billboard.js

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

## Releasing

This project uses [changesets](https://github.com/changesets/changesets) for versioning and releases.

### Creating a changeset

To document a change that should be included in the next release, run:

```bash
npm run changeset
```

This will prompt you to select the type of version bump (major, minor, or patch) and describe the change.

### Publishing

When changes are merged to the main branch, the CI will automatically:

1. Create a version bump based on the changesets
2. Update the changelog
3. Publish to npm
