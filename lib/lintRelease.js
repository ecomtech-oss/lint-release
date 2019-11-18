const fse = require('fs-extra');
const path = require('path');

const { getGitBranchName } = require('./getGitBranchName');

const getPackageJsonVersion = async repoPath =>
  fse
    .readFile(path.join(repoPath, 'package.json'))
    .then(file => file.toString())
    .then(JSON.parse)
    .then(({ version }) => version);

const getGitBranchVersion = async (repoPath, { branchName }) => {
  const getVersionFromBranchName = name => {
    const releaseBranchRegexp = /release\/(\d+\.?\d*\.?\d*)$/gi;

    const [, version] = releaseBranchRegexp.exec(name) || [null, null];

    return version || null;
  };

  // Okay, we can use external branch name
  if (branchName) {
    return getVersionFromBranchName(branchName);
  }

  return getGitBranchName(repoPath).then(getVersionFromBranchName);
};

const defaultOptions = {
  branchName: null,
};

const lintRelease = async (repoPath, options = defaultOptions) => {
  const [packageVersion, brachVersion] = await Promise.all([
    getPackageJsonVersion(repoPath),
    getGitBranchVersion(repoPath, options),
  ]);

  if (!brachVersion) {
    return {
      correct: true,
    };
  }

  return {
    correct: packageVersion === brachVersion,
    packageVersion,
    brachVersion,
  };
};

module.exports = {
  lintRelease,
};
