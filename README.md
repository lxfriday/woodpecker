# woodpecker

<p text-align=center><img src="./woodpecker.jpeg"></p>

Eslint、Prettier、Commitlint、Editorconfig、Gitignore 自动注入工具

- prettier
- eslint(多种 config 可选)
- husky
- lint-staged
- commitlint (angular style 开源项目主流 commit 规范)
- editorconfig

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
