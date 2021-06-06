---
title: window.setTimeout 第三个参数
tags:
  - js
id: '1659'
categories:
  - 前端
date: 2019-10-28 14:38:43
---

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)上关于 setTimeout 介绍

语法

```js
var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...])
// delay 可选 默认 0
// param1, ..., paramN 可选 ，附加参数，一旦定时器到期，他会作为参数传递给 function
// 返回值timeoutID是一个正整数，表示定时器的编号
```

应用

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
// 会立即返回一个 timeid
// 1
// 2
// 3
// 4
// 5
```
