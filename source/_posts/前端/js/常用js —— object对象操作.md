---
title: 常用js —— object对象操作
tags:
  - js
id: 2034
categories:
  - 前端
date: 2022-02-14
updated: 2022-02-14
---

> **删除对象属性**

如果删除成功，返回true，删除失败，返回false
var 声明的全局变量不能被删除

```js
delete obj.name // 删除obj的name属性

// var 声明的全局变量不能被删除
var num = 12
str = 'hello'
delete window.num // false 删除失败
delete window.str // true 删除成功
console.log(num) // 12
console.log(str) // 报错 str is not undefined
```


> **判断一个属性是否是对象的一个属性**

```js
key in obj // 返回布尔值 从原型链继承的属性会返回 true

obj.hasOwnProperty(key) // 判断某个key是否是这个对象本身的属性
```

> **`for..in`** 遍历对象

会枚举原型链中的属性

```js
// 遍历对象
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key) // 键
    console.log(obj[key]) // 值
  }
}
```

> **`Object.keys(obj)`**

返回一个由一个给定对象的自身可枚举属性组成的数组

> **`Object.values(obj)`**

返回一个给定对象自身的所有可枚举属性值的数组

> **`Object.entries(obj)`**

返回一个给定对象自身可枚举属性的键值对数组

将Object转换为Map `new Map(Object.entries(obj))`

> **`Object.create(proto, [propertiesObject])`**

创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

> **`Object.defineProperty(obj, prop, descriptor)`**

在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
let obj = {}
Object.defineProperty(obj, 'name', {
  configurable: true, // 表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改。默认为 false
  value: 'c', // 配置该属性的默认值 默认为 undefined
  writable: true, // 配置该属性是否可以被修改， 默认值是false， 不可修改
  enumerable: true // 配置该属性是否可枚举， 默认值是false， 不可枚举
  // 默认为 undefined
  // set: function (newVal) {
  //   console.log('赋值了', newVal)
  // },
  // 默认为 undefined
  // get: function () {
  //   console.log('取值了')
  // }
})
```

如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常

> **`Object.assign(target, ...sources)`**

用于将所有**可枚举属性**的值从一个或多个源对象分配到目标对象。它将返回目标对象

```js
const o1 = { a: 1 }
const o2 = { b: 2 }
const o3 = { c: 3 }

const obj = Object.assign(o1, o2, o3)
console.log(obj) // { a: 1, b: 2, c: 3 }
console.log(o1)  // { a: 1, b: 2, c: 3 }
obj === o1 // true
```

```js
const v1 = "abc"
const v2 = true
const v3 = 10
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4)
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj) // { "0": "a", "1": "b", "2": "c" }
```

## object.valueOf()

返回值为该对象的原始值，如果对象没有原始值，则 `valueOf` 将返回对象本身

| **对象** | **返回值**                                             |
| -------- | ------------------------------------------------------ |
| Array    | 返回数组对象本身                                       |
| Boolean  | 布尔值                                                 |
| Date     | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC |
| Function | 函数本身                                               |
| Number   | 数字值                                                 |
| Object   | 对象本身 （这是默认情况）                              |
| String   | 字符串值                                               |
|          | Math 和 Error 对象没有 valueOf 方法                    |

