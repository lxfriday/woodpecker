/**
 * 注入 commitlint 配置文件
 */
const { cfgFileInfo } = require('../path')
const { copyCommitLintCfg, successLog } = require('../util')

function injectCommitLintConfig() {
  // commitlint.config.js 存在则不做任何操作
  if (!cfgFileInfo.commitlintCfgExist) {
    copyCommitLintCfg()
    successLog('  ✔️ commitlint.config.js copy from template')
  } else {
    successLog('  ✔️ commitlint.config.js exist, do not copy from template')
  }
}

module.exports = injectCommitLintConfig
