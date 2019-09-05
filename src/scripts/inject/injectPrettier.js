/**
 * 注入 prettier 配置文件
 */
const { cfgFileInfo } = require('../path')
const { copyPrettierCfg, copyPrettierIgnore, successLog, readEslintCfg, writeEslintCfg } = require('../util')

function injectPrettier() {
  // .pretteirrc 存在则不做任何操作
  if (!cfgFileInfo.prettierCfgExist) {
    copyPrettierCfg()
    successLog('-> .prettierrc 复制成功')
  } else {
    successLog('-> .prettierrc 已经存在，跳过复制')
  }
  if (!cfgFileInfo.prettierIgnoreExist) {
    copyPrettierIgnore()
    successLog('-> .prettierignore 复制成功, 若有大量静态文件, 可配置在 .prettierignore, 忽略静态文件格式化')
  } else {
    successLog('-> .prettierignore 已经存在，跳过复制')
  }

  // prettier eslint 插件
  if (cfgFileInfo.eslintCfgExist) {
    const eslintCfg = readEslintCfg()
    let eslintExtends = []
    if (eslintCfg.extends) {
      if (typeof eslintCfg.extends === 'string') {
        eslintExtends.push(eslintCfg.extends)
      } else {
        eslintExtends = eslintCfg.extends
      }
    }
    let eslintPlugins = []
    if (eslintCfg.plugins) {
      if (typeof eslintCfg.plugins === 'string') {
        eslintPlugins.push(eslintCfg.plugins)
      } else {
        eslintPlugins = eslintCfg.plugins
      }
    }
    let eslintRules = {}
    if (eslintCfg.rules) {
      eslintRules = eslintCfg.rules
    }

    const newEslintCfg = {
      ...eslintCfg,
      extends: [...new Set([...eslintExtends, 'prettier', 'prettier/react'])],
      plugins: [...new Set([...eslintPlugins, 'prettier'])],
      parser: 'babel-eslint',
      rules: {
        ...eslintRules,
        'prettier/prettier': 'error',
      },
    }

    writeEslintCfg(newEslintCfg)
    successLog('-> Prettier 在 Eslint 中配置成功')
  }
}

module.exports = injectPrettier
