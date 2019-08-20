/**
 * 工具函数
 */
const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs')
const { pkgJSONPath, cfgFileInfo, cwd, tempDir } = require('./path')

function successLog(message) {
  console.log(chalk.green(message))
}

function errorLog(message) {
  console.log(chalk.red(message))
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
    errorLog('  eslint config file is not valid')
    shell.exit(1)
  }
}

function writeEslintCfg(newEslintCfg) {
  fs.writeFileSync(cfgFileInfo.eslintCfgPath, JSON.stringify(newEslintCfg, null, 2))
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

// 从模板复制 prettier 配置文件
function copyPrettierCfg() {
  shell.cp(`${tempDir}/prettier/.prettierrc`, cwd)
}

// 从模板复制 commitlint 配置文件
function copyCommitLintCfg() {
  shell.cp(`${tempDir}/commitlint/commitlint.config.js`, cwd)
}

// 从模板复制 .editorconfig 配置文件
function copyEditorCfg() {
  shell.cp(`${tempDir}/editorconfig/.editorconfig`, cwd)
}

module.exports = {
  readPkg,
  writePkg,
  readEslintCfg,
  writeEslintCfg,
  readPrettierCfg,
  writePrettierCfg,
  copyPrettierCfg,
  copyEditorCfg,
  copyEslintCfg,
  copyCommitLintCfg,
  successLog,
  errorLog,
}
