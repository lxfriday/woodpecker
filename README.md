# woodpecker

<p text-align=center><img src="./woodpecker.jpeg"></p>

[![cnpm version](http://npm.pt.mi.com/badge/v/@mi/woodpecker.svg?style=flat-square)](http://npm.pt.mi.com/package/@mi/woodpecker)

详细说明请看 wiki[https://wiki.n.miui.com/pages/viewpage.action?pageId=194334369](https://wiki.n.miui.com/pages/viewpage.action?pageId=194334369)

---

Eslint、Prettier、Commitlint、Editorconfig、Gitignore 自动注入工具

- Prettier
- Eslint(多种 config 可选)
- Husky
- Lint-staged
- Commitlint (angular style 开源项目主流 commit 规范)
- Editorconfig
- Gitignore

## 安装

```bash
npm i -g @mi/woodpecker
```

## 使用

输入 `woodpecker i`。

```bash
woodpecker i
```

## 选择注入选项

点击 `a` 自动选中全部功能， 点空格选择或者取消选择单个功能。选好之后回车自动开始安装

```bash
$ woodpecker i
woodpecker v2.0.2

-> 开始执行

? 需要注入什么功能？ (Press <space> to select, <a> to toggle all, <i> to invert selection)
>( ) Prettier: 格式化代码
 ( ) Commitlint: 限制 commit message 格式
 ( ) Eslint: 注入 Eslint 功能，选中之后下一步可选择 Eslint config 类型
 ( ) Editorconfig: 添加 .editorconfig 到根目录
 ( ) Gitignore: 添加 .gitignore 到根目录
```

Eslint 可选项

```bash
? 安装下列哪个 Eslint config？ (Use arrow keys)
> airbnb
  @mi/eslint-config-mcfe-react-app
  eslint-config-react-app
```

## 注意

**当 Prettier 和 Eslint 同时存在时，Eslint 规则会受到 Prettier 影响，Prettier 自动格式化时变更为 Pretiter 配置文件对应的格式**

## 相关链接

- [Prettier](https://prettier.io/)
- [Prettier 配置项](https://prettier.io/docs/en/options.html)
- [Eslint rules(中文)](https://cn.eslint.org/docs/rules/)
- [Husky](https://github.com/typicode/husky)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [angular commit message: @commitlint/config-angular](https://www.npmjs.com/package/@commitlint/config-angular)
- [阮一峰 Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
