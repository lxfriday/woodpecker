/**
 * inject eslint 配置
 */

const { cfgFileInfo } = require('../path')
const { copyEslintCfg, successLog, readEslintCfg, writeEslintCfg } = require('../util')

function injectEslint() {
  if (cfgFileInfo.eslintCfgExist) {
    const eslintCfg = readEslintCfg()

    const newEslintCfg = {
      ...eslintCfg,
      extends: [...new Set([...eslintCfg.extends, 'airbnb'])],
      parser: 'babel-eslint',
    }
    writeEslintCfg(newEslintCfg)
    successLog('  ✔️ airbnb eslint style added')
  } else {
    copyEslintCfg()
    successLog('  ✔️ .eslintrc copy from template')
  }
}

module.exports = injectEslint
