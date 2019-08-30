/**
 * 注入 husky 到 package.json
 */
const { successLog } = require('../util')

function huskyConfigExist(pkgObj) {
  return !!pkgObj.husky
}

function injectHusky(pkgObj, commitlint = false, lintStaged = false) {
  if (huskyConfigExist(pkgObj)) {
    pkgObj.husky = {
      ...pkgObj.husky,
      hooks: {
        ...pkgObj.husky.hooks,
        'pre-commit': lintStaged ? 'lint-staged' : undefined,
        'commit-msg': commitlint ? 'commitlint -E HUSKY_GIT_PARAMS' : undefined,
      },
    }
  } else {
    pkgObj.husky = {
      hooks: {
        'pre-commit': lintStaged ? 'lint-staged' : undefined,
        'commit-msg': commitlint ? 'commitlint -E HUSKY_GIT_PARAMS' : undefined,
      },
    }
  }

  successLog('-> husky 配置成功')
}

module.exports = injectHusky
