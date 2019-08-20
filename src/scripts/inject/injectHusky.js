/**
 * 注入 husky 到 package.json
 */
const { successLog } = require('../util')

function huskyConfigExist(pkgObj) {
  return !!pkgObj.husky
}

function injectHusky(pkgObj, commitlint = false) {
  if (huskyConfigExist(pkgObj)) {
    pkgObj.husky = {
      ...pkgObj.husky,
      hooks: {
        ...pkgObj.husky.hooks,
        'pre-commit': 'lint-staged',
        'commit-msg': commitlint ? 'commitlint -E HUSKY_GIT_PARAMS' : undefined,
      },
    }
  } else {
    pkgObj.husky = {
      hooks: {
        'pre-commit': 'lint-staged',
        'commit-msg': commitlint ? 'commitlint -E HUSKY_GIT_PARAMS' : undefined,
      },
    }
  }

  successLog('  ✔️ husky config finished')
}

module.exports = injectHusky
