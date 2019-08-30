/**
 * 处理 inject 过程
 */
const injectCommitLintConfig = require('./inject/injectCommitLintConfig')
const injectEditorConfig = require('./inject/injectEditorConfig')
const injectGitignore = require('./inject/injectGitignore')
const injectHusky = require('./inject/injectHusky')
const injectLintStaged = require('./inject/injectLintStaged')
const injectPrettier = require('./inject/injectPrettier')
const injectEslint = require('./inject/injectEslint')
const { successLog } = require('./util')

module.exports = (processArgs, newPkg, { eslintConfig }) => {
  successLog('开始进行配置')
  if (processArgs.husky) {
    injectHusky(newPkg, processArgs.commit, processArgs.lintStaged)
  }
  if (processArgs.commit) {
    injectCommitLintConfig()
  }
  if (processArgs.lintStaged) {
    injectLintStaged(newPkg, processArgs.eslint, processArgs.prettier)
  }
  if (processArgs.editor) {
    injectEditorConfig()
  }
  if (processArgs.gitignore) {
    injectGitignore()
  }
  // eslint 要在 prettier 之前
  if (processArgs.eslint) {
    injectEslint(eslintConfig, processArgs)
  }
  if (processArgs.prettier) {
    injectPrettier(processArgs)
  }
}
