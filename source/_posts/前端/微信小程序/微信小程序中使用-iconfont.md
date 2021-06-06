---
title: 在微信小程序中使用 iconfont
tags: []
id: '1060'
categories:
  - 前端
date: 2020-03-25 17:34:41
---

在 [iconfont](https://www.iconfont.cn/) 选择好需要使用的图标，将代码下载，解压后找到 iconfont.css 修改名称为 iocnfont.wxss 放到项目中即可

使用: Font class 方式

```html
<icon class="iconfont icon-xxx"></icon>
```

将无效的字体引用删除，只保留 base64 引用

```css
@font-face {
  font-family: 'iconfont';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,...') format('woff2');
}
```

Font class 方式不支持使用彩色图标，且 symbol 方式也无法使用，因为 iconfont.js 中含有操作 dom 的代码，会报错 Cannot read property 'getElementsByTagName' of undefined

如果想引入彩色图标

https://github.com/iconfont-cli/mini-program-iconfont-cli
