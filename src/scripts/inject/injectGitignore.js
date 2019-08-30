/**
 * 添加 .gitignore 文件
 */
const { cfgFileInfo } = require('../path')
const { copyGitIgnore, successLog } = require('../util')

function injectGitignore() {
  if (!cfgFileInfo.gitIgnoreFileExist) {
    copyGitIgnore()
    successLog('-> .gitignore 复制成功')
  } else {
    successLog('-> .gitignore 已经存在')
  }
}

module.exports = injectGitignore
