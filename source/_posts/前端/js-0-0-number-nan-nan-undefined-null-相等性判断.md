---
title: +0 -0 Number.NaN NaN undefined null ''  相等性判断
tags:
  - js
id: '397'
categories:
  - - web前端
date: 2019-10-28 22:12:33
---

## 主要区分 `+0` 和 `-0`、`NaN` 和 `NaN` 在不同情况下的相等性区别

`==` `===`

```js
console.log(+0 === -0) // true
console.log(NaN == NaN) // false NaN 不与任何值相等，包括自身
console.log(undefined == null) // true
console.log(undefined === null) // false
console.log(NaN === NaN) // false
console.log(Number.NaN === NaN) // false
```

Object.is() 方法判断两个值是否是相同的值。比较时不会做类型转换，这与 `==` `===` 运算符的判定方式都不一样

```js
Object.is(+0, -0) // false
Object.is(0, -0) // false
Object.is(0, +0) // true
Object.is(-0, -0) // true

Object.is(undefined, undefined) // true
Object.is(null, null) // true
Object.is(Number.NaN, Number.NaN) // true
Object.is(Number.NaN, NaN) // true
Object.is(NaN, NaN) // true
Object.is(NaN, 0 / 0) // true
```

在 Set， Map 内部，两个 NaN 是相等, +0 和 -0 也是相等的

```js
let a = [NaN, NaN, undefined, undefined, +0, -0, {}, {}]
let b = new Set(a) // {NaN, undefined, 0, {}, {}}
```

总结：

- 比较运算符中 `+0` 和 `-0` 是相等的、`NaN` 和 `NaN`是不等的
- Object.is() 方法中 `+0` 和 `-0` 是不相等的、`NaN` 和 `NaN`是相等的
- 在 Set， Map 内部， `+0` 和 `-0` 是相等的、`NaN` 和 `NaN` 也是相等的
