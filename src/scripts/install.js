/**
 * 检查 yarn npm 并安装依赖
 */
const shell = require('shelljs')
const { successLog } = require('./util')
const {
  cfgFileInfo: { yarnLockFileExist, pkgLockFileExist },
} = require('./path')

const npmExist = !!shell.which('npm')
const yarnExist = !!shell.which('yarn')

function install() {
  if (!npmExist && !yarnExist) {
    shell.echo('please install node first')
    shell.exit(1)
  }

  // 优先使用 yarn 安装依赖
  if (yarnLockFileExist || (yarnExist && !pkgLockFileExist)) {
    successLog('  🍉 yarn bin find, using yarn install')
    successLog('  ✔️ yarn installing...')
    shell.exec('yarn install')
  } else {
    successLog('  🍉 npm bin find, using npm install')
    successLog('  ✔️ npm installing...')
    shell.exec('npm install')
  }

  successLog('\r\n  ✔️ installing success, enjoying!!!')
  shell.exit(0)
}

module.exports = install
