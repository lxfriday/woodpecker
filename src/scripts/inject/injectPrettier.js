/**
 * 注入 prettier 配置文件
 */
const { cfgFileInfo } = require('../path')
const { copyPrettierCfg, copyPrettierIgnore, successLog, readEslintCfg, writeEslintCfg, warnLog } = require('../util')

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
    warnLog('-> .prettierignore 复制成功, 请将编译生成的静态文件目录添加到 .prettierignore 中')
  } else {
    warnLog('-> .prettierignore 已经存在，跳过复制')
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
