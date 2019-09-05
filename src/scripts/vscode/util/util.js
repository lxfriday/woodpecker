/**
 * vscode 相关工具函数
 */
const fs = require('fs')
const { extensionsDir, settingsPath } = require('./path')

const configInfo = {
  prettierVSCodeInstalled: false, // esbenp.prettier-vscode 插件安装没有
}

const extensionList = fs.readdirSync(extensionsDir)

extensionList.forEach(file => {
  if (/^esbenp.prettier-vscode/.test(file)) {
    configInfo.prettierVSCodeInstalled = true
  }
})

function readVSCSettings() {
  return JSON.parse(fs.readFileSync(settingsPath))
}

function writeVSCSettings(data) {
  return fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2))
}

module.exports = {
  configInfo,
  readVSCSettings,
  writeVSCSettings,
}
