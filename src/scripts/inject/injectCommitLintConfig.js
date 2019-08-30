/**
 * 注入 commitlint 配置文件
 */
const { cfgFileInfo } = require('../path')
const { copyCommitLintCfg, successLog } = require('../util')

function injectCommitLintConfig() {
  // commitlint.config.js 存在则不做任何操作
  if (!cfgFileInfo.commitlintCfgExist) {
    copyCommitLintCfg()
    successLog('-> commitlint.config.js 复制成功')
  } else {
    successLog('-> commitlint.config.js 已存在')
  }
}

module.exports = injectCommitLintConfig
