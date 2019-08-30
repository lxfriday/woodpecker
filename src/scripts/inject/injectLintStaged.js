/**
 * 注入 lint-staged 到 package.json
 */
const { successLog } = require('../util')

function injectLintStaged(pkgObj, useEslint = false, usePrettier = false) {
  pkgObj['lint-staged'] = {
    '*.js': [useEslint && 'eslint --fix', usePrettier && 'prettier --write', 'git add'].filter(v => v),
  }
  successLog('-> lint-staged 配置完成')
}

module.exports = injectLintStaged
