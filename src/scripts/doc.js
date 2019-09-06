/**
 * 帮助提示
 */
const { successLog } = require('./util')

const wikiUrl = 'https://wiki.n.miui.com/pages/viewpage.action?pageId=194334369'
const gitUrl = 'http://v9.git.n.xiaomi.com/liuxing3/woodpecker'
const prettierDoc = 'https://prettier.io/docs/en/options.html'
const commitlintDoc = 'https://github.com/conventional-changelog/commitlint'
const angularStyle = 'https://www.npmjs.com/package/@commitlint/config-angular'
const ruanyifengCommitDoc = 'http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html'

function doc() {
  successLog('')
  successLog(`-> wiki 地址: ${wikiUrl}`)
  successLog(`-> git 地址: ${gitUrl}`)
  successLog(`-> .prettierrc 配置官网: ${prettierDoc}`)
  successLog(`-> commitlint 地址: ${commitlintDoc}`)
  successLog(`-> angular commit style 地址: ${angularStyle}`)
  successLog(`-> 阮一峰 Commit message 和 Change log 编写指南: ${ruanyifengCommitDoc}`)
}

module.exports = doc
