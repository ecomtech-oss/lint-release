const spawn = require('cross-spawn');

const getGitBranchName = async repoPath => {
  const childProcess = spawn('git', ['symbolic-ref', '--short', 'HEAD'], {
    cwd: repoPath,
    stdio: ['pipe'],
  });

  return new Promise((resolve, reject) => {
    childProcess.stdout.on('data', data => {
      resolve(data.toString().trim());
    });

    childProcess.on('error', err => {
      reject(err);
    });
  });
};

module.exports = {
  getGitBranchName,
};
