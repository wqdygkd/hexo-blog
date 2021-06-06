---
title: 微信小程序中使用less
tags:
  - less
  - 微信小程序
id: '1895'
categories:
  - 前端
date: 2020-07-14 09:56:35
---

安装

```bash
npm install -g wxss-cli
```

然后在小程序目录，监听此目录以下所有 css 及 less 文件并实时保存文件后转换为 wxss

```bash
# 监听文件会自动将此目录下 css,less 文件编译为 wxss
wxss ./pages
```
新建的 less 文件最终不会上传至小程序
