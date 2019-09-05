#!/usr/bin/env node
const program = require('commander')
const { getWoodpeckerVersion, printWoodpeckerVersion } = require('../src/scripts/util')

printWoodpeckerVersion()
program
  .version(getWoodpeckerVersion())
  .usage('<command> [options]')
  .command('inject', '开始注入')
  .alias('i')
  .command('format', '开始注入 VSCode Pretiter 格式化相关配置')
  .alias('f')
  .parse(process.argv)
