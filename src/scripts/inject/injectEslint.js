/**
 * inject eslint 配置
 */

const { cfgFileInfo } = require('../path')
const { successLog, readEslintCfg, writeEslintCfg, readWoodpeckerEslintCfg } = require('../util')
const eslintSelectors = require('../opts/eslintSelect')

// 只在 .eslntrc 将要创建而且需要添加 prettier 的时候
function generatePrettierEslint(eslintrc) {
  const newEslintrc = {
    ...eslintrc,
    extends: [...new Set([...eslintrc.extends, 'prettier', 'prettier/react'])],
    plugins: [...new Set([...eslintrc.plugins, 'prettier'])],
    parser: 'babel-eslint',
    rules: {
      ...eslintrc.rules,
      'prettier/prettier': 'error',
    },
  }
  successLog('-> Prettier 在 Eslint 中配置成功')
  return newEslintrc
}

module.exports = (eslintConfig, processArgs) => {
  const targetCfg = eslintSelectors[eslintConfig]
  if (cfgFileInfo.eslintCfgExist) {
    const eslintCfg = readEslintCfg()

    const newEslintCfg = {
      ...eslintCfg,
      extends: [...new Set([...eslintCfg.extends, targetCfg.config])],
      parser: 'babel-eslint',
    }
    writeEslintCfg(newEslintCfg)
    successLog(`-> 添加 ${targetCfg.config} Eslint config`)
  } else {
    const templateEslintrc = readWoodpeckerEslintCfg()
    const newEslintrc = {
      ...templateEslintrc,
      extends: [...new Set([...templateEslintrc.extends, targetCfg.config])],
      parser: 'babel-eslint',
    }
    successLog(`-> 使用 ${targetCfg.config} Eslint config`)
    let finalEslintrc = newEslintrc
    if (processArgs.prettier) {
      finalEslintrc = generatePrettierEslint(newEslintrc)
    }
    writeEslintCfg(finalEslintrc)
    successLog('-> 创建 .eslintrc')
    // 创建之后要修改 eslint 是否存在
    cfgFileInfo.eslintCfgExist = false
  }
}
