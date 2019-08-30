/**
 * 导出一些常用的路径
 */

const fs = require('fs')
const path = require('path')

const cwd = process.cwd()
const src = path.resolve(__dirname, '../')
const tempDir = path.resolve(__dirname, 'template')
const files = fs.readdirSync(path.resolve(cwd))
const pkgJSONPath = path.resolve(cwd, 'package.json')

// 更改文件只更改
const cfgFileInfo = {
  prettierCfgExist: false,
  prettierCfgPath: '',
  eslintCfgExist: false,
  eslintCfgPath: '',
  commitlintCfgExist: false,
  commitlintCfgPath: '',
  yarnLockFileExist: false,
  pkgLockFileExist: false,
  editorFileExist: false,
  gitIgnoreFileExist: false,
  gitFolderExist: false,
}

files.forEach(file => {
  if (/.prettierrc(.json)?/.test(file)) {
    cfgFileInfo.prettierCfgExist = true
    cfgFileInfo.prettierCfgPath = path.resolve(cwd, file)
  }
  if (/.eslintrc(.json)?/.test(file)) {
    cfgFileInfo.eslintCfgExist = true
    cfgFileInfo.eslintCfgPath = path.resolve(cwd, file)
  }
  if (/commitlint.config.js$/.test(file)) {
    cfgFileInfo.commitlintCfgExist = true
    cfgFileInfo.commitlintCfgPath = path.resolve(cwd, file)
  }
  if (/yarn.lock$/.test(file)) {
    cfgFileInfo.yarnLockFileExist = true
  }
  if (/package-lock.json$/.test(file)) {
    cfgFileInfo.pkgLockFileExist = true
  }
  if (/.editorconfig$/.test(file)) {
    cfgFileInfo.editorFileExist = true
  }
  if (/.gitignore$/.test(file)) {
    cfgFileInfo.gitIgnoreFileExist = true
  }
  if (/.git$/.test(file)) {
    cfgFileInfo.gitFolderExist = true
  }
})

module.exports = {
  tempDir,
  src,
  cwd,
  files,
  cfgFileInfo,
  pkgJSONPath,
}
