#!/usr/bin/env node

const commandLineArgs = require('command-line-args');

const { lintRelease } = require('../lib/lintRelease');

const optionDefinitions = [{ name: 'branch', alias: 'b', type: String }];

const args = commandLineArgs(optionDefinitions);

const execute = async () => {
  const { correct, packageVersion, brachVersion } = await lintRelease(
    process.cwd(),
    {
      branchName: args.branch,
    },
  );

  if (correct) {
    console.info(`Versions is OK`);

    process.exit(0);
  } else {
    console.error(
      'Package version does not match with the version in the git branch\n',
    );

    console.info(`Package version: ${packageVersion}`);
    console.info(`Version in git branch: ${brachVersion}`);

    console.info('\nPlease, fix this issue 🤓');
    process.exit(1);
  }
};

execute();
