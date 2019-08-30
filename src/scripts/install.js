/**
 * 检查 yarn npm 并安装依赖
 */
const shell = require('shelljs')
const { successLog, errorLog } = require('./util')
const {
  cfgFileInfo: { yarnLockFileExist, pkgLockFileExist },
} = require('./path')

const npmExist = !!shell.which('npm')
const yarnExist = !!shell.which('yarn')

function install() {
  if (!npmExist && !yarnExist) {
    errorLog('请先安装 NodeJS')
    shell.exit(1)
  }

  // 优先使用 yarn 安装依赖
  if (yarnLockFileExist && yarnExist && !pkgLockFileExist) {
    successLog('-> 找到 yarn.lock, 使用 yarn 安装依赖')
    successLog('-> yarn install...')
    shell.exec('yarn install')
  } else {
    successLog('-> npm install...')
    shell.exec('npm install')
  }

  successLog('')
  successLog('-> 注入成功')
  shell.exit(0)
}

module.exports = install
