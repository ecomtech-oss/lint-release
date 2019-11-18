# lint-version

> Linting tool for comparing versions between git branch and package.json

## TL;DR

Just install and start using. 😎

```
yarn add @samokat/lint-release --dev

yarn lint-release
```

## What?

We store application version in `package.json` file and [create separate git branch for every release](https://trunkbaseddevelopment.com). This tool enforces using similar versions in both sources.

It allows branches with names satisfying pattern `release/X.X.X` and strictly compares it with a version in `package.json`.

### Examples

|package.json version|branch name    |result |
|:------------------ |:------------- |:-----:|
|1.0.0               |master         |✅     |
|2.2.0               |development    |✅     |
|1.0.0               |feature/tl-12  |✅     |
|2.2.0               |release/2.2.0  |✅     |
|3.1                 |release/3.1    |✅     |
|3                   |release/3      |✅     |
|2.2.0               |release/2.2.1  |🛑     |
|1.0.0               |release/2.2.0  |🛑     |

## How?

You can use this tool on CI, or add git-hook for linting.

### CI specific

In some cases, on CI we can't use `git` for retriving branch name and CI provide it in env variables. This tool supports specific args for that case.

**Example**
If your CI provide `BRANCH_NAME` variable, you can just pass it to linter:
```
yarn lint-release --branch=$BRANCH_NAME
```

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
