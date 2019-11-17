const fse = require('fs-extra');
const path = require('path');

const { getGitBranchName } = require('./getGitBranchName');

const getPackageJsonVersion = async repoPath =>
  fse
    .readFile(path.join(repoPath, 'package.json'))
    .then(file => file.toString())
    .then(JSON.parse)
    .then(({ version }) => version);

const getGitBranchVersion = async repoPath => {
  const branchName = await getGitBranchName(repoPath);

  const releaseBranchRegexp = /release\/(\d+\.?\d*\.?\d*)$/gi;

  const [, version] = releaseBranchRegexp.exec(branchName) || [null, null];

  return version || null;
};

const lintRelease = async repoPath => {
  const [packageVersion, brachVersion] = await Promise.all([
    getPackageJsonVersion(repoPath),
    getGitBranchVersion(repoPath),
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
