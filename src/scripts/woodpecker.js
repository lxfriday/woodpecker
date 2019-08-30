#!/usr/bin/env node
const fs = require('fs')
const shell = require('shelljs')
const inquirer = require('inquirer')

const { pkgJSONPath } = require('./path')
const { writePkg, successLog, errorLog } = require('./util')
const inject = require('./inject')
const install = require('./install')
const deps = require('./deps')
const makePkg = require('./makePkg')
const eslintSelectors = require('./opts/eslintSelect')

// package.json 文件不存在的时候提醒必须初始化项目
if (!fs.existsSync(pkgJSONPath)) {
  errorLog('package.json 文件不存在')
  shell.exit(1)
}

// https://github.com/umijs/create-umi/blob/fb6576085f69a8bc421c98fe9a5cebd9227c674e/lib/generators/app/index.js
const questions = [
  {
    name: 'features',
    message: '需要注入什么功能？',
    type: 'checkbox',
    choices: [
      { name: 'Prettier: 格式化代码', value: 'prettier' },
      { name: 'Commitlint: 限制 commit message 格式', value: 'commit' },
      { name: 'Eslint: 注入 Eslint 功能，选中之后下一步可选择 Eslint config 类型', value: 'eslint' },
      { name: 'Editorconfig: 添加 .editorconfig 到根目录', value: 'editor' },
      { name: 'Gitignore: 添加 .gitignore 到根目录', value: 'gitignore' },
    ],
  },
]

const eslintQuestions = [
  {
    name: 'eslintFeat',
    message: '安装下列哪个 Eslint config？',
    type: 'list',
    choices: Object.keys(eslintSelectors).map(t => ({
      name: eslintSelectors[t].config,
      value: eslintSelectors[t].config,
    })),
  },
]

;(async () => {
  successLog('-> 开始注入')
  successLog('')
  const { features } = await inquirer.prompt(questions)
  let eslintConfig = null
  if (features.includes('eslint')) {
    const { eslintFeat } = await inquirer.prompt(eslintQuestions)
    eslintConfig = eslintFeat
  }
  const { pkgsInfo, processArgs, needInstall } = await deps(features, eslintConfig)
  const newPkg = makePkg(pkgsInfo)
  successLog('')
  successLog('-------------')
  successLog('')
  inject(processArgs, newPkg, { eslintConfig })
  writePkg(newPkg)
  successLog('')
  successLog('-------------')
  successLog('')
  // 安装依赖
  if (needInstall) {
    install()
  } else {
    successLog('不需要安装依赖，注入成功')
  }
})()
