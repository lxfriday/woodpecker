# woodpecker

<p text-align=center><img src="./woodpecker.jpeg"></p>

前端 eslint、prettier、commitlint、editorconfig 自动注入工具

- prettier
- eslint
- husky
- lint-staged
- commitlint
- editorconfig

## 安装

```bash
npm i -g @mi/woodpecker
```

## 使用

直接输入 `woodpecker`。

```bash
woodpecker
```

## 选择注入选项

点击 `a` 自动选中全部功能， 点空格选择或者取消选择单个功能。选好之后回车自动开始安装

```bash

? What functionality do you want to add? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ prettier: format your code
 ◯ commitlint: restrict your commit message
 ◯ eslint: add eslint config file and airbnb config
 ◯ editorconfig: add .editorconfig to project root
```
