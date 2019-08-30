/**
 * 添加 .editorconfig 文件
 */
const { cfgFileInfo } = require('../path')
const { copyEditorCfg, successLog } = require('../util')

function injectEditorConfig() {
  // .editorconfig 存在则不做任何操作
  if (!cfgFileInfo.editorFileExist) {
    copyEditorCfg()
    successLog('-> .editorconfig 复制成功')
  } else {
    successLog('-> .editorconfig 已存在')
  }
}

module.exports = injectEditorConfig
