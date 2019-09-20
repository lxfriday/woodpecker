/**
 * vscode 地址相关
 */

const os = require('os')
const { resolve } = require('path')
const { getPlatform } = require('../../util')

const HOME = os.homedir()

// 系统上插件和工作目录的地址
const sysPath = {
  win32: {
    // 插件目录地址
    extensionsDir: resolve(HOME, '.vscode/extensions'),
    // setting 配置文件
    settingsPath: resolve(HOME, 'AppData/Roaming/Code/User/settings.json'),
  },
  linux: {
    // 插件目录地址
    extensionsDir: resolve(HOME, '.vscode/extensions'),
    // setting 配置文件
    settingsPath: resolve(HOME, '.config/Code/User/settings.json'),
  },
  darwin: {},
}

sysPath.darwin = sysPath.linux

const { extensionsDir, settingsPath } = sysPath[getPlatform()]

module.exports = {
  extensionsDir,
  settingsPath,
  getPlatform,
}
