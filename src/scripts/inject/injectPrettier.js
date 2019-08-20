/**
 * 注入 prettier 配置文件
 */
const { cfgFileInfo } = require('../path')
const { copyPrettierCfg, successLog, readEslintCfg, writeEslintCfg } = require('../util')

function injectPrettier() {
  // .pretteirrc 存在则不做任何操作
  if (!cfgFileInfo.prettierCfgExist) {
    copyPrettierCfg()
    successLog('  ✔️ .pretteirrc copy from template')
  } else {
    successLog('  ✔️ .pretteirrc exist, do not copy from template')
  }

  // prettier eslint 插件
  if (cfgFileInfo.eslintCfgExist) {
    const eslintCfg = readEslintCfg()

    const newEslintCfg = {
      ...eslintCfg,
      extends: [...new Set([...eslintCfg.extends, 'prettier', 'prettier/react'])],
      plugins: [...new Set([...eslintCfg.plugins, 'prettier'])],
      parser: 'babel-eslint',
      rules: {
        ...eslintCfg.rules,
        'prettier/prettier': 'error',
      },
    }

    writeEslintCfg(newEslintCfg)
    successLog('  ✔️ prettier in eslint enabled')
  } else {
    successLog('  ✔️ eslint config file not exist, prettier in eslint disabled')
  }
}

module.exports = injectPrettier
