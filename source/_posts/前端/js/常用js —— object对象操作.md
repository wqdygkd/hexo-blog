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

### Object.prototype 成员

constructor: 指向了构造函数 Object
`hasOwnProperty()`: 返回一个布尔值，判断对象自身是否具有该属性
`isPrototypeOf()`: 返回一个布尔值，用于测试一个对象是否存在于另一个对象的原型链上
`propertyIsEnumerable()`: 返回一个布尔值，表明指定的属性名是否是当前对象可枚举的自身属性
`toString()/toLocaleString()`: 返回对象的字符串格式
`valueOf()`: 返回对象的原始值

> **`hasOwnProperty`**

```js
var obj = { name: 'zs' }
// 判断name属性是不是obj自己提供的
obj.hasOwnProperty('name') // true
obj.hasOwnProperty('toString') // false
```

**`hasOwnProperty` 与 `in` 的区别**

1. `in` 操作符：判断对象能否访问到该属性（不管这个属性是自己提供的，还是从原型上继承来的），如果可以访问到，都会返回 true

2. `hasOwnProperty`：该属性必须是自己提供，才返回 true，否则返回 false

> **`isPrototypeOf`**

```js
// 判断 A 对象是否在 B 对象的原型链上 ,回一个布尔值
A.isPrototetypeOf(B)

function Person() {}
var p = new Person()

// p 的原型链：
// p ==> Person.prototype ==> Object.prototype ==> null

Person.isPrototypeOf(p) // false Person 是构造函数
Person.prototype.isPrototypeOf(p) // true
Object.prototype.isPrototypeOf(p) // true
```

**`isPropertyOf` 与 `instanceof` 运算符的区别**

`instanceof` 运算符用来测试一个对象的原型链中是否存在一个构造函数的 `prototype` 属性。作用和 isPrototypeOf 类似

语法： 实例对象 instanceof 构造函数

作用：构造函数的 prototype 属性是否在实例对象的原型链上

- A.isPrototypeOf(B) 判断 A 是否在 B 的原型链上 A： 是一个原型对象
- B instanceof A 判断 A 的 prototype 是否在 B 的原型链上 A：是一个构造函数

```js
Array.isPrototypeOf([]) // false
Array.prototype.isPrototypeOf([]) // true

[] instanceof Array // true
[] instanceof Array.prototype // 语法错误
```

> **`propertyIsEnumerable`**

```js
function Person(name) {
  this.name = name
}
Person.prototype.age = 19
var p = new Person('lw')

p.propertyIsEnumerable('name') // true
p.propertyIsEnumerable('age') // false
```

> **`toString/toLocaleString`**

返回对象的字符串格式

> **每个内置对象**的原型上都有属于自己的 toString 方法

```js
var obj = { name: 'zs' }
// obj ==> Object.prototype ==> null
obj.toString() // '[object Object]'
obj.toLocaleString() // '[object Object]'

var arr = [1, 2, 3]
// arr ==>  Array.prototype ==> Object.prototype ==> null
//           toString()         toString()
// Array.prototype 含有自己的 toString 方法
arr.toString() // '1,2,3'
arr.toLocaleString() // '1,2,3'

var date = new Date()
//  date ==> Date.prototype ==> Object.prototype ==> null
//           toString()          toString()
// Date.prototype 含有自己的 toString 方法
date.toString() // Wed Oct 10 2018 16:00:51 GMT+0800 (中国标准时间)
date.toLocaleString() // 2018/10/10 下午4:00:51 得到的是本地时间格式
```

> **`valueOf()`**

返回值为该对象的原始值，如果对象没有原始值，则 `valueOf` 将返回对象本身

| **对象** | **返回值**                          |
| -------- | ----------------------------------- |
| Array    | 返回数组对象本身                    |
| Boolean  | 布尔值                              |
| Date     | 时间戳                              |
| Function | 函数本身                            |
| Number   | 数字值                              |
| Object   | 对象本身 （这是默认情况）           |
| String   | 字符串值                            |

```js
var obj = { name: 'zs' }
// obj ==> Object.prototype ==> null
obj.valueOf() // { name: 'zs' }

var arr = [1, 2, 3]
// arr ==>  Array.prototype ==> Object.prototype ==> null
arr.valueOf() // [1, 2, 3]

var date = new Date()
// date ==> Date.prototype ==> Object.prototype ==> null
// Date.prototype 含有 valueOf 方法
date.valueOf() // 时间戳
```

> valueOf 和 toString 的应用

当对象在参与运算和比较的时候，js 内部会自动的调用 valueOf 和 toString 方法

调用规则：

1. 默认先调用 vauleOf， 尝试将对象转成简单数据类型， 如果没有转成简单数据类型， 会继续在调用 toString 方法

2. 如果 valueOf 和 toString 方法都没有转成简单数据类型，会报错


### Object 静态方法

`Object.assign()`
`Object.create()`
`Object.defineProperty()`
`Object.entries()`
`Object.freeze()`
`Object.getPrototypeOf()`
`Object.is()`
`Object.isFrozen()`
`Object.keys(obj)`
`Object.values(obj)`

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

> **`Object.create(proto, [propertiesObject])`**

创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

```js
// 语法
Object.create(proto[, propertiesObject])
// 参数：proto 一个对象,新创建对象的原型对象
// 参数：propertiesObject 要添加到新创建对象的可枚举属性
// 返回值：一个新对象，带着指定的原型对象和属性

var obj = Object.create(proto)
console.log(obj)
```

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

> **`Object.entries(obj)`**

返回一个给定对象自身可枚举属性的键值对数组

将Object转换为Map `new Map(Object.entries(obj))`

> **`Object.freeze()`**

接受一个对象作为参数，并返回一个相同的不可变的对象，冻结一个对象后该对象的原型也不能被修改

可以阻止修改对象的值，但是不能阻止引用的修改

只是做了层浅冻结，具有嵌套属性的对象实际上并未冻结

> **`Object.getPrototypeOf`**

返回指定对象的原型

> **`Object.is()`**

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

> **`Object.isFrozen()`**

> **`Object.keys(obj)`**

返回一个由一个给定对象的自身可枚举属性组成的数组

> **`Object.values(obj)`**

返回一个给定对象自身的所有可枚举属性值的数组

