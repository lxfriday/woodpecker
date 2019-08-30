/**
 * 注入 prettier 配置文件
 */
const { cfgFileInfo } = require('../path')
const { copyPrettierCfg, successLog, readEslintCfg, writeEslintCfg } = require('../util')

function injectPrettier() {
  // .pretteirrc 存在则不做任何操作
  if (!cfgFileInfo.prettierCfgExist) {
    copyPrettierCfg()
    successLog('-> .prettierrc 复制成功')
  } else {
    successLog('-> .prettierrc 已经存在，跳过复制')
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
    successLog('-> Prettier 在 Eslint 中配置成功')
  }
}

module.exports = injectPrettier
