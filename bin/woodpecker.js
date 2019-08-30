#!/usr/bin/env node
const program = require('commander')
const { getWoodpeckerVersion, printWoodpeckerVersion } = require('../src/scripts/util')

printWoodpeckerVersion()
program
  .version(getWoodpeckerVersion())
  .usage('<command> [options]')
  .command('inject', '开始注入')
  .alias('i')
  .parse(process.argv)
