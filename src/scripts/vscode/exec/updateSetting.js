/**
 * 修改 VSC  配置项
 */
const { successLog, warnLog, errorLog, getPlatform } = require('../../util')
const { readVSCSettings, writeVSCSettings } = require('../util/util')

// prettier format 相关的配置项目
const prettierFormatConfig = {
  'editor.formatOnSave': true,
  'editor.formatOnPaste': true,
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
}

function updateSettings() {
  successLog('VSCode 注入开始 -------------')
  successLog(`操作系统 ${getPlatform()}`)
  successLog('-> 开始配置 VSCode settings.json 文件')
  successLog('-> 注入配置项: ')
  warnLog(`  'editor.formatOnSave': true,`)
  warnLog(`  'editor.formatOnPaste': true,`)
  warnLog(`  'editor.defaultFormatter': 'esbenp.prettier-vscode',`)
  try {
    const settings = readVSCSettings()
    const newSettings = {
      ...settings,
      ...prettierFormatConfig,
    }
    writeVSCSettings(newSettings)
    successLog('-> VSCode settings.json 配置注入成功')
  } catch (e) {
    errorLog('-> VSCode settings.json 配置注入失败')
  }
}

module.exports = updateSettings
