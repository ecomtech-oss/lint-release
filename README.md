# lint-version

> Lint tool for compare version in git branch and package.json

## TL;DR

Just install and start using. 😎

```
yarn add @samokat/lint-release --dev

yarn lint-release
```

## What?

We store application version in `package.json` file and [create separate git branch for every release](https://trunkbaseddevelopment.com). This tool enforce similar versions in two source.

In allows branches with names satisfying pattern `release/X.X.X` and strictly compare it with a version in `package.json`.

## How?

You can use in tool on CI, or add git-hook for linting.

### Husky example

Never allow commit with different versions in branch and `package.json`.

```json
{
  // ...
  "husky": {
    "hooks": {
      "pre-commit": "yarn lint-release",
    }
  },
  // ...
}
```
