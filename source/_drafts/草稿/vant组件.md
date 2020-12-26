---
title: vant 组件存在的问题
date: 2019/09/27
updated: 2019/09/27
categories:
  - [vue]
---

## Search 组件没有 focus 方法

## 在一些机型下组件的图标不能正常显示

查看 `node_modules/vant/lib/icon/index.css`

```css
@font-face {
  font-style: normal;
  font-weight: 400;
  font-family: 'vant-icon';
  src: url(https://img.yzcdn.cn/vant/vant-icon-3a7dc2.woff2) format('woff2'), url(https://img.yzcdn.cn/vant/vant-icon-3a7dc2.woff) format('woff'), url(https://img.yzcdn.cn/vant/vant-icon-3a7dc2.ttf) format('truetype');
}
```

发现字体是通过外部链接引入的，我们可以将字体下载下来，在本地引用

在项目的 reset.css 中添加如下样式，并将字体文件放在同一路径下

```css
@font-face {
  /* font-style: normal;
  font-weight: 400;
  font-family: 'vant-icon'; */
  src: url(vant-icon-3a7dc2.woff2) format('woff2'), url(vant-icon-3a7dc2.woff) format('woff'), url(vant-icon-3a7dc2.ttf) format('truetype');
}
```
