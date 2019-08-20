#!/usr/bin/env node
const chalk = require('chalk')
const fs = require('fs')
const shell = require('shelljs')
const fly = require('flyio')
const async = require('async')

const { pkgJSONPath } = require('./path')
const { readPkg, writePkg, successLog, errorLog } = require('./util')
const injectCommitLintConfig = require('./inject/injectCommitLintConfig')
const injectEditorConfig = require('./inject/injectEditorConfig')
const injectHusky = require('./inject/injectHusky')
const injectLintStaged = require('./inject/injectLintStaged')
const injectPrettier = require('./inject/injectPrettier')
const injectEslint = require('./inject/injectEslint')
const install = require('./install')

successLog('>  woodpecker')
successLog('>  start injecting')
successLog('\n')

function getPkgLatestVersion(pkg) {
  return fly.request(`https://registry.npm.taobao.org/${pkg}/latest`, null, { responseType: 'json', parseJson: true })
}

// package.json 文件不存在的时候提醒必须初始化项目
if (!fs.existsSync(pkgJSONPath)) {
  errorLog('package.json file not exist, please init project first')
  shell.exit(1)
}

const pkg = readPkg()

let newPkg = null
let showInstallDevDeps = []

const processArgs = {
  prettier: true,
  commit: true,
  eslint: true,
  editor: true,
}
processArgs.lintStaged = processArgs.eslint || processArgs.prettier

if (processArgs.eslint) {
  showInstallDevDeps = showInstallDevDeps.concat([
    'eslint-config-airbnb',
    'eslint',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ])
}
if (processArgs.prettier) {
  showInstallDevDeps = showInstallDevDeps.concat(['prettier', 'eslint-config-prettier', 'eslint-plugin-prettier'])
}
if (processArgs.eslint || processArgs.prettier) {
  showInstallDevDeps = showInstallDevDeps.concat(['babel-eslint'])
}
if (processArgs.lintStaged) {
  showInstallDevDeps = showInstallDevDeps.concat(['husky', 'lint-staged'])
}
if (processArgs.commit) {
  showInstallDevDeps = showInstallDevDeps.concat(['@commitlint/cli', '@commitlint/config-conventional'])
}

/**
 * 获取依赖的最新版本信息
 * @param {array} deps
 */
async function depInfo(deps) {
  const info = {}
  await async.eachLimit(deps, 3, async dep => {
    const {
      data: { name, version },
    } = await getPkgLatestVersion(dep)

    info[name] = `^${version}`
  })

  return info
}

;(async () => {
  const pkgsInfo = await depInfo(showInstallDevDeps)

  // print to terminal
  Object.keys(pkgsInfo).forEach(v => {
    console.log(chalk.green(`  + ${v} ${pkgsInfo[v]}`))
  })

  if (pkg.devDependencies) {
    newPkg = {
      ...pkg,
      devDependencies: {
        ...pkg.devDependencies,
        ...pkgsInfo,
      },
    }
  } else {
    newPkg = {
      ...pkg,
      devDependencies: pkgsInfo,
    }
  }

  successLog('\n')
  successLog('🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄')
  successLog('\n')

  if (processArgs.commit) {
    injectCommitLintConfig()
  }
  if (processArgs.editor) {
    injectEditorConfig()
  }
  // eslint 要在 prettier 之前
  if (processArgs.eslint) {
    injectEslint()
  }
  if (processArgs.prettier) {
    injectPrettier()
  }
  if (processArgs.lintStaged) {
    injectHusky(newPkg, processArgs.commit)
    injectLintStaged(newPkg, processArgs.eslint, processArgs.prettier)
  }
  writePkg(newPkg)

  successLog('\n')
  successLog('🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄')
  successLog('\n')

  install()
})()
