---
title: ES6（ECMAScript）
tags: es6
categories:
- [js]
date: 2018/12/29 18:00:00
updated: 2019/03/19 23:40:00
---


# ES6（ECMAScript）

ECMAScript 6.0（以下简称 ES6）是在 2015 年 6 月正式发布的标准。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言

[ECMAScript 6 入门 阮一峰](http://es6.ruanyifeng.com/)

## let 与 const

> ES6 中提供了两个声明变量的关键字：const 和 let

### let 的使用

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`

- let声明的变量只有在当前作用域(块作用域)有效

```js
if (true) {
  var a = 1
  let b = 2
}

console.log(a) // 1
console.log(b) // ReferenceError: b is not defined
```

- 不允许重复声明

```js
let a = 10
let a = 1 // SyntaxError: Identifier 'a' has already been declared
```

- 不绑定全局作用域

```javascript
var c = 1
console.log(window.c) // 1
let c = 1
console.log(window.c) // undefined
```

* <span class="error">存在变量提升</span>

```javascript
let a = 1
{
  a = 2
  let a
}
// 如果 let 不会提升，那么 a = 2 就会将外面的 a 由 1 变成 2
// 但运行发现 a = 2 报错：Uncaught ReferenceError: Cannot access 'a' before initialization
```



总结：

* let 声明会提升到块顶部
* 从块顶部到该变量的初始化语句，这块区域叫做 TDZ（临时死区）
* 如果你在 TDZ 内使用该变量，JS 就会报错



### const 的使用

`const`声明一个常量。常量：代码执行的过程中，不可以修改常量里面的值

- const 声明的量不可以改变

```js
const PI = 3.1415
PI = 3 // TypeError: Assignment to constant variable
```

- const 声明的变量必须赋值

```js
const num
// SyntaxError: Missing initializer in const declaration
```

- 如果 const 声明了一个对象，仅仅保证地址不变，可以修改对象的属性

```js
const obj = {name: 'zs'}
obj.age = 18 // 正确
obj = {} // TypeError: Assignment to constant variable
```

- 其他用法和 let 一样

```
只能在当前代码块中使用
不会提升
不能重复声明
不绑定全局作用域
```



## 模板字符串(模板字面量)

模板字面量 是允许嵌入表达式的字符串字面量。你可以使用多行字符串和字符串插值功能

```js
// 1. 通过``可以定义一个字符串
let str = `hello world`

// 2. 模板字符串内部允许换行
let str = `
  hello
  world
`

// 3. 模板字符串内部可以使用表达式
let str = `
	你好，我是${name}
`
```



## 箭头函数

ES6 标准新增了一种新的函数：Arrow Function（箭头函数）

为什么叫 Arrow Function？因为它的定义用的就是一个箭头

### 基本使用

```js
let fn = function (x, y) {
  console.log(x + y)
}

相当于
// 语法： (参数列表) => {函数体}
let fn = (x, y) => {
  console.log(x + y)
}
```

### 参数详解

- 如果没有参数列表，使用()表示参数列表

```js
let sum = function () {
  console.log('哈哈')
}
// 等同于：
let sum = () => {
  console.log('哈哈')
}
```

- 如果只有一个参数，可以省略()

```js
let sum = function (n1) {
  console.log('哈哈')
}

// 等同于：
let sum = n1 => {
  console.log('哈哈')
}
```

- 如果有多个参数，需要使用 () 把参数列表括起来

```js
let sum = function (n1, n2) {
  console.log('哈哈')
}

// 等同于：
let sum = (n1, n2) => {
  console.log('哈哈')
}
```

- 给参数指定默认值

```javascript
let a = (n = 1) => console.log(n)
a() // 1
a(3) // 3
```

- 不存在 prototype 这个属性

```javascript
let a = () => {}
console.log(a.prototype) // undefined
```

- 没有 arguments

  箭头函数没有自己的 arguments 对象，箭头函数可以访问外围函数的 arguments 对象

```javascript
function a () {
  return () => arguments
}
console.log(a(1, 2)()) // [Arguments] { '0': 1, '1': 2 }

// 访问箭头函数的参数
// Rest 参数接受函数的多余参数组成一个数组
let a = (a, b, ...Args) => console.log(Args)
a(1, 2, 3, 4, 5) // [3, 4, 5]
console.log(a.length) // 2
```



- Rest 参数和 arguments 对象的区别：

rest 参数只包括那些没有给出名称的参数，arguments 包含所有参数

rest 参数之后不能再有其他参数，否则会报错

函数的 length 属性，不包括 rest 参数

arguments 对象不是真正的数组，而 rest 参数是数组实例，可以直接使用数组的方法

arguments 对象拥有一些自己额外的功能



### 返回值详解

- 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来

```js
let sum = function (n1) {
  console.log('哈哈')
  return n1
}
// 等同于：
let sum = n1 => {
  console.log('哈哈')
  return n1
}
```

- 如果函数体只有一行一句，并且需要返回这个值，那么可以省略 {} 和 return

```js
let fn = function(n1, n2) {
  return n1 + n2
}

let fn = (n1, n2) => n1 + n2
```



### 箭头函数的注意点

1. 箭头函数内部没有 this，因此箭头函数内部的 this 指向了外部的 this
2. 因为箭头函数没有 this，因此箭头函数不能作为构造函数
3. 不能用 call()、apply()、bind() 这些方法改变 this 的指向

【定义一个对象，定时器打招呼】

```javascript
let obj = {
  name: 'zs',
  sayHi: function() {
    setInterval(() => {
      console.log('大家好，我是' + this.name)
    }, 1000)
  }
}

obj.sayHi()
```



## 对象简化语法

```javascript
// 当属性的 key 和变量的名相同时可以简写
let person = {name: name} ==> let person = {name}

声明函数
let cal = {
  add: function () {
    return 1
  },
  // 可以省略 `:function`
  add(){
    return 1
  }
}
```



### 属性名表达式

- ES6 允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。

```js
let propKey = 'foo'
let methodKey = 'bar'

let obj = {
  [propKey]: true,
  // foo: true
  ['a' + 'bc']: 123,
  // abc: 123
  [methodKey]() {
    return 'hi'
  }
}
```

## class 关键字

ES5 中通过 构造函数 + 原型 的方式来实现面向对象

```javascript
// 构造函数
function Person () {
  this.name = 'jack'
  this.age = 18
}

// 在原型中添加实例方法
Person.prototype.say = function () {
  console.log(this.name, this.age)
}

// 创建实例
const p = new Person()

p.say()
```



ES6 中出现了 class 关键字，用来实现面向对象。

class 仅仅是一个语法结构（语法糖），本质上还是通过构造函数+原型的方式来实现继承的





```javascript
// 基本使用
// 创建 Person 类
class Person {
  // 类的构造函数
  // constructor 固定名称
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  // 添加实例方法
  say () {
    console.log(this.name, this.age)
  }
}

// 创建实例
const p = new Person('tom', 18)
console.log(p)
p.say()
```



继承：要实现至少需要两个class（子类 和 父类），子类继承自父类，继承后，子类就可以使用父类中的属性或方法

```javascript
// 继承

// 父类
class Person {
  constructor (name, age) {
    this.name = name
  }

  say () {
    console.log('父类中的 say 方法')
  }
}

// 子类
class Chinese extends Person {
  constructor () {
    // 子类中使用 constructor 必须手动调用 super
    // super 表示父类的构造函数
    // 先调用 super() 在使用 this
    super()
    this.name = 'ls'
    this.age = 18
  }
}

// 创建实例
const c = new Chinese()
console.log(c)
c.say() // 父类中的方法
```



## 解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

```js
// 1. 对象解构
var { a, b} = { a: 10, b: 20 }
console.log(a, b) // 10 20

// 提取变量并赋值
var { a: p, b: q} = { a: 10, b: 20 }
console.log(p, q) // 10 20

// 将剩余数组赋值给一个变量
var { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 }
// ;({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 })
console.log(a, b, rest) // 10 20 {c: 30, d: 40}

// 提供默认值
var { a = 1, b = 1 } = { a: 10 }
console.log(a, b) // 10 1

// 赋值并提供默认值
var {a:aa = 10, b:bb = 1} = {a: 10}
console.log(aa, bb) // 10 1

// 2. 数组解构
var [a, b] = [1, 2]
console.log(a, b) // 1 2

// 将剩余数组赋值给一个变量
var [a, b, ...rest] = [1, 2, 3, 4]
console.log(a, b, rest) // 1 2 [3, 4]
// ==> var a = arr[0]; var b = arr[1]

// 提供默认值
var [c = 2, d = 2] = [10]
console.log(c, d) // 10 2



// 忽略某些值
var [a = 2, , b = 2] = [10, 20, 30]
console.log(a, b) // 10 30


// 3. 函数参数的解构赋值
function foo({ x }) {
  console.log(x) // 1
}
foo({ x: 1, y: 2 })

// 函数参数默认值
function foo({ x = 10 }) {
  console.log(x) // 10
}
foo()

// 4. 解构的特殊应用
// 交换变量
var a = 1
var b = 3
[a, b] = [b, a]
console.log(a) // 3
console.log(b) // 1

// 字符串解构
var str = 'love'
var [a, b, c, d] = str
console.log(a, b, c, d) // l o v e
```



## 数组扩展运算符

扩展运算符（spread）是三个点（...）。作用：将一个数组转为用逗号分隔的参数序列

```javascript
var arr = ['a', 'b', 'c']
console.log(...arr)
// 上面这句代码相当于：
console.log(arr[0], arr[1], arr[2])
```

应用

```javascript
// 数组深拷贝
var arr = [1, 2, 3]
var arr1 = [...arr]
console.log(arr === arr1) // false, 说明arr1和arr指向不同数组


// 把一个数组插入另一个数组字面量
var arr2 = [...arr, 4, 5, 6]
console.log(arr2) // [1, 2, 3, 4, 5, 6]

// 字符串转数组
var str = 'love'
var arr3 = [...str]
console.log(arr3) // [ 'l', 'o', 'v', 'e' ]

```



## ES6 模块化
