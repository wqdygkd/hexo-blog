---
title: '对 {__ob__: observer} 取值时控制台报 undefined 错误问题'
tags: []
id: '431'
categories:
  - - web前端
---

原因： `__ob__: Observer` 这些数据是 vue 对数据设置的监控器，一般都是不可枚举的。

解决方式

使用 `JSON.parse(JSON.stringify(...))` 获取深拷贝的原始数据对象

参考：[https://cn.vuejs.org/v2/api/#data](https://cn.vuejs.org/v2/api/#data)