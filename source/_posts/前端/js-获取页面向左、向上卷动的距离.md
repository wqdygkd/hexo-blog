---
title: 获取页面向左、向上卷动的距离
tags: []
id: '1553'
categories:
  - - web前端
date: 2020-05-28 14:34:57
---

如果页面指定了 DTD，即指定了 DOCTYPE 时，使用 document.documentElement.scrollTop/Left 可以获取到正确的结果

页面没有 DTD，即没指定 DOCTYPE 时，使用 document.body.scrollTop/Left 可以获取到正确的结果

获取页面向左、向上卷动的距离的兼容性方式

```js
function getScroll() {
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
}
```

document.body 与 document.documentElement 区别

document.body 返回 dom 中的 body 节点即 `<body>`
document.documentElement 返回 dom 中的 root 节点即 `<html>`

设置页面卷曲距离

```js
// X: 向左卷曲距离
// Y: 向上卷曲距离
window.scrollTo(X, Y)
```
