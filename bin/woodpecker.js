#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const fly = require('flyio')
const async = require('async')
const fJson = require('format-json')

const commandCwd = process.cwd()
const pkgJSONPath = path.resolve(process.cwd(), 'package.json')

async function getPkgLatestVersion(pkg) {
  return await fly.request(`https://registry.npm.taobao.org/${pkg}/latest`, null, { responseType: 'json', parseJson: true })
}

const pkg = JSON.parse(fs.readFileSync(pkgJSONPath))
const depsArr = [
  'husky',
  'prettier',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'eslint',
  'babel-eslint',
  '@commitlint/cli',
  '@commitlint/config-conventional',
]
let newPkg = null
const processArgs = {
  prettier: true,
  commit: false,
}
let showInstallDevDeps = []

if (processArgs.prettier) {
  showInstallDevDeps = showInstallDevDeps.concat(['husky', 'prettier', 'eslint-config-prettier', 'eslint-plugin-prettier', 'eslint', 'babel-eslint'])
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

    info[name] = version
  })

  return info
}

;(async () => {
  const pkgsInfo = await depInfo(showInstallDevDeps)
  console.log(pkgsInfo)
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

  fs.writeFileSync(pkgJSONPath, JSON.stringify(newPkg, null, 2))
})()

// inject husky

// inject prettier

// inject eslint

// install dependencies
