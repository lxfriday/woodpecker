/**
 * 获取 woodpecker 最新的版本信息
 */
const fly = require('flyio')
const { successLog, errorLog, woodpeckerPkg } = require('../util')

async function latestVersion() {
  successLog('-> 检查更新')
  try {
    const {
      data: { version },
    } = await fly.request(`http://registry.npm.pt.mi.com/${woodpeckerPkg.name}/latest`, null, {
      responseType: 'json',
      parseJson: true,
    })
    successLog(`-> 最新版本 v${version}`)
    if (woodpeckerPkg.version < version) {
      successLog(`-> 安装最新版本 npm i -g @mi/woodpecker@latest`)
    }
    successLog('')
    return version
  } catch (e) {
    errorLog('\n-> 获取 @mi/woodpecker 版本信息失败')
  }
}

module.exports = latestVersion
