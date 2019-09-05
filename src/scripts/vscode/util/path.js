/**
 * vscode 地址相关
 */

const { resolve } = require('path')
const os = require('os')

const HOME = os.homedir()
const platform = os.platform()

// 系统上插件和工作目录的地址
const sysPath = {
  win32: {
    // 插件目录地址
    extensionsDir: resolve(HOME, '.vscode/extensions'),
    // setting 配置文件
    settingsPath: resolve(HOME, 'AppData/Roaming/Code/User/settings.json'),
  },
  linux: {},
  darwin: {},
}

const { extensionsDir, settingsPath } = sysPath[platform]

module.exports = {
  extensionsDir,
  settingsPath,
}
