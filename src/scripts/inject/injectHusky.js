/**
 * 注入 husky 到 package.json
 */
const { successLog, warnLog } = require('../util')

function huskyConfigExist(pkgObj) {
  return !!pkgObj.husky
}

// 这个地方需要取舍，用户如果自己配置了 pre-commit 不是 `lint-staged`，相当于出现了意外的情况
// 这个地方需要取舍，用户如果自己配置了 commit-msg 不是 `commitlint -E HUSKY_GIT_PARAMS` ，相当于出现了意外的情况
function warnAboutConflict(pkgObj, commitlint, lintStaged) {
  if (lintStaged && pkgObj.husky.hooks['pre-commit']) {
    warnLog('-> package.json 中 husky.hooks.pre-commit 已经存在, 请自行决定配置')
    warnLog(`-> 推荐配置      "pre-commit": "lint-staged" `)
  }
  if (commitlint && pkgObj.husky.hooks['commit-msg']) {
    warnLog('-> package.json 中 husky.hooks.commit-msg 已经存在, 请自行决定配置')
    warnLog(`-> 推荐配置      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" `)
  }
}

function injectHusky(pkgObj, commitlint = false, lintStaged = false) {
  if (huskyConfigExist(pkgObj)) {
    warnAboutConflict(pkgObj, commitlint, lintStaged)
    pkgObj.husky = {
      ...pkgObj.husky,
      hooks: {
        'pre-commit': lintStaged ? 'lint-staged' : undefined,
        'commit-msg': commitlint ? 'commitlint -E HUSKY_GIT_PARAMS' : undefined,
        ...pkgObj.husky.hooks,
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
