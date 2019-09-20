#!/usr/bin/env node
const program = require('commander')
const { getWoodpeckerVersion, printWoodpeckerVersion } = require('../src/scripts/util')

printWoodpeckerVersion()
program
  .version(getWoodpeckerVersion())
  .usage('<command> [options]')
  .command('inject', '注入 Prettier、Commitlint、Eslint、EditorConfig、GitIgnore')
  .alias('i')
  .command('format', '修改 VSCode Pretiter 格式化相关配置')
  .alias('f')
  .parse(process.argv)
