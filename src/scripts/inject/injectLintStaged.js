/**
 * 注入 lint-staged 到 package.json
 */
const { successLog, warnLog, copyEslintIgnore } = require('../util')
const { cfgFileInfo } = require('../path')

function injectLintStaged(pkgObj, useEslint = false, usePrettier = false) {
  pkgObj['lint-staged'] = {
    '*.js': [useEslint && 'eslint --fix', usePrettier && 'prettier --write', 'git add'].filter(v => v),
  }
  successLog('-> lint-staged 配置完成')
  if (!cfgFileInfo.eslintIgnoreExist) {
    copyEslintIgnore()
    warnLog('-> .eslintignore 复制成功, 请将编译生成的静态文件目录添加到 .eslintignore 中')
  }
}

module.exports = injectLintStaged
