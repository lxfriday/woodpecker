/**
 * 处理需要的依赖
 */

/**
 * 获取依赖的最新版本信息
 * @param {array} deps
 */
const shell = require('shelljs')
const async = require('async')
const fly = require('flyio')
const { successLog, errorLog } = require('./util')
const eslintSelector = require('./opts/eslintSelect')

function isMIPkg(pkg) {
  return pkg.indexOf('@mi/') === 0
}

async function getPkgLatestVersion(pkg) {
  try {
    if (isMIPkg(pkg)) {
      successLog(`-> ${pkg} 使用 http://registry.npm.pt.mi.com/${pkg}/latest , 请注意连接内部网络`)
      return await fly.request(`http://registry.npm.pt.mi.com/${pkg}/latest`, null, {
        responseType: 'json',
        parseJson: true,
      })
    }
    return await fly.request(`https://registry.npm.taobao.org/${pkg}/latest`, null, { responseType: 'json', parseJson: true })
  } catch (e) {
    errorLog('')
    errorLog(`-> ${pkg} 获取依赖版本信息失败, 请检查网络`)
    shell.exit(1)
  }
}

async function depInfo(deps) {
  successLog('')
  successLog('开始获取依赖版本')
  const info = {}
  await async.eachLimit(deps, 3, async dep => {
    const {
      data: { name, version },
    } = await getPkgLatestVersion(dep)
    info[name] = `^${version}`
  })
  return info
}

module.exports = async (features, eslintConfig) => {
  let needInstall = false
  let showInstallDevDeps = []
  const processArgs = {
    prettier: false,
    commit: false,
    eslint: false,
    lintStaged: false,
    husky: false,
    editor: false,
    gitignore: false,
  }

  Object.keys(processArgs).map(k => {
    processArgs[k] = features.includes(k)
  })

  if (processArgs.prettier || processArgs.commit || processArgs.eslint || processArgs.lintStaged || processArgs.husky) {
    needInstall = true
  }

  processArgs.lintStaged = processArgs.eslint || processArgs.prettier
  processArgs.husky = processArgs.lintStaged || processArgs.commit

  if (processArgs.eslint) {
    showInstallDevDeps = showInstallDevDeps.concat(['eslint', ...eslintSelector[eslintConfig].deps])
  }
  if (processArgs.prettier) {
    showInstallDevDeps = showInstallDevDeps.concat(['prettier', 'eslint-config-prettier', 'eslint-plugin-prettier'])
  }
  if (processArgs.eslint || processArgs.prettier) {
    showInstallDevDeps = showInstallDevDeps.concat(['babel-eslint'])
  }
  if (processArgs.lintStaged) {
    showInstallDevDeps = showInstallDevDeps.concat(['lint-staged'])
  }
  if (processArgs.husky) {
    showInstallDevDeps = showInstallDevDeps.concat(['husky'])
  }
  if (processArgs.commit) {
    showInstallDevDeps = showInstallDevDeps.concat(['@commitlint/cli', '@commitlint/config-angular'])
  }
  const pkgsInfo = await depInfo(showInstallDevDeps)
  // print to terminal
  successLog('')
  successLog('依赖准备就绪')
  Object.keys(pkgsInfo).forEach(v => {
    successLog(`+ ${v} ${pkgsInfo[v]}`)
  })

  return { processArgs, pkgsInfo, needInstall }
}
