/**
 * 注入 lint-staged 到 package.json
 */
const { successLog } = require('../util')

function injectLintStaged(pkgObj, useEslint = false, usePrettier = false) {
  pkgObj['lint-staged'] = {
    '*.js': [useEslint && 'eslint --fix', usePrettier && 'prettier --write', 'git add'].filter(v => v),
  }
  successLog('  ✔️ lint-staged config finished')
}

module.exports = injectLintStaged
