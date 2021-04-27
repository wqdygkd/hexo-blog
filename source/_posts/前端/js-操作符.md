---
title: js 中的 || 、?? 、 ?.
tags:
  - js
id: 2025
categories:
  - web前端
date: 2021-04-27
---

或操作符 `||`

```js
var a = b || {}

// 等价于

var a
if (b === 0 || b === "" || b === false || b === null || b === undefined) {
  a = {}
} else {
  a = b
}
```

空值合并操作符 `??`

```js
var a = obj ?? {}

// 等价于

var a
if ( obj === null || obj === undefined ){
  a = {}
} else {
  a = obj
}
```

可选链操作符 `?.`

在引用为空(nullish) (`null` 或者 `undefined`) 的情况下不会引起错误，会短路返回值，返回 undefined

```js
// 访问属性、调用方法
obj?.customMethod?.()

// 数组取值
arr?.[5]

// 短路计算
let obj1 = null
let a = 0
let prop1 = obj1?.[a++] // a => 0

let obj2 = 0
let b = 0
let prop2 = obj2?.[b++] // b => 1
```
