---
title: 微信小程序中使用 npm 包
tags: []
id: '1041'
categories:
  - - web前端
date: 2020-03-24 16:21:57
---

官方文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html

```bash
# 初始化
npm init
# 安装包
npm install [package]
```

打开开发者工具，在本地设置中，勾选使用 npm 模块，
安装完之后 点击开发者工具中的菜单栏：工具 --> 构建 npm

会额外生成一个`miniprogram_npm` 目录 是开发者工具构建 npm 时生成的，可以理解为小程序版的 npm 包。

在需要的地方引入，以 regenerator 为例

```js
// 引入 regenerator-runtime
const regeneratorRuntime = require('regenerator-runtime')
```
