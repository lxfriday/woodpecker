/**
 * 工具函数
 */
const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { pkgJSONPath, cfgFileInfo, cwd, tempDir } = require('./path')
const woodpeckerPkg = require('../../package.json')

function successLog(message) {
  console.log(chalk.green(message))
}

function warnLog(message) {
  console.log(chalk.yellow(message))
}

function errorLog(message) {
  console.log(chalk.red(message))
}

function getWoodpeckerVersion() {
  return woodpeckerPkg.version
}

function printWoodpeckerVersion() {
  successLog(`woodpecker v${getWoodpeckerVersion()}`)
  console.log()
}

function readPkg() {
  try {
    return JSON.parse(fs.readFileSync(pkgJSONPath))
  } catch (e) {
    errorLog('  package.json is not valid')
    shell.exit(1)
  }
}

function writePkg(newPkg) {
  fs.writeFileSync(pkgJSONPath, JSON.stringify(newPkg, null, 2))
}

function readEslintCfg() {
  try {
    return JSON.parse(fs.readFileSync(cfgFileInfo.eslintCfgPath))
  } catch (e) {
    errorLog('读取根目录 Eslint 配置文件失败')
    shell.exit(1)
  }
}

// 读取 woodpecker 模板 .eslintrc 文件
function readWoodpeckerEslintCfg() {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(tempDir, './eslint/.eslintrc')))
  } catch (e) {
    errorLog('读取模板 Eslint 配置文件失败')
    shell.exit(1)
  }
}

function writeEslintCfg(newEslintCfg) {
  if (cfgFileInfo.eslintCfgExist) {
    fs.writeFileSync(cfgFileInfo.eslintCfgPath, JSON.stringify(newEslintCfg, null, 2))
  } else {
    fs.writeFileSync(path.resolve(cwd, './.eslintrc'), JSON.stringify(newEslintCfg, null, 2))
  }
}

function readPrettierCfg() {
  return JSON.parse(fs.readFileSync(cfgFileInfo.prettierCfgPath))
}

function writePrettierCfg(newPrettierCfg) {
  fs.writeFileSync(cfgFileInfo.prettierCfgPath, JSON.stringify(newPrettierCfg, null, 2))
}

// 从模板复制 eslint 配置文件
function copyEslintCfg() {
  shell.cp(`${tempDir}/eslint/.eslintrc`, cwd)
}

// 从模板复制 eslint  ignore 文件
function copyEslintIgnore() {
  shell.cp(`${tempDir}/eslint/.eslintignore`, cwd)
}

// 从模板复制 prettier 配置文件
function copyPrettierCfg() {
  shell.cp(`${tempDir}/prettier/.prettierrc`, cwd)
}

// 从模板复制 prettier ignore 文件
function copyPrettierIgnore() {
  shell.cp(`${tempDir}/prettier/.prettierignore`, cwd)
}

// 从模板复制 commitlint 配置文件
function copyCommitLintCfg() {
  shell.cp(`${tempDir}/commitlint/commitlint.config.js`, cwd)
}

// 从模板复制 .editorconfig 配置文件
function copyEditorCfg() {
  shell.cp(`${tempDir}/editorconfig/.editorconfig`, cwd)
}

function copyGitIgnore() {
  shell.cp(`${tempDir}/gitignore/_gitignore`, path.relative(cwd, '.gitignore'))
}

function getPlatform() {
  return os.platform()
}

module.exports = {
  readPkg,
  writePkg,
  readEslintCfg,
  writeEslintCfg,
  readWoodpeckerEslintCfg,
  readPrettierCfg,
  writePrettierCfg,
  copyPrettierCfg,
  copyPrettierIgnore,
  copyEditorCfg,
  copyGitIgnore,
  copyEslintCfg,
  copyEslintIgnore,
  copyCommitLintCfg,
  successLog,
  warnLog,
  errorLog,
  getWoodpeckerVersion,
  printWoodpeckerVersion,
  woodpeckerPkg,
  getPlatform,
}
