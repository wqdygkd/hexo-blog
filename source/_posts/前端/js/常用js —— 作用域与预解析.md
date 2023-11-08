---
title: 常用js —— 作用域与预解析
tags:
  - js
id: 2038
categories:
  - 前端
date: 2022-02-16
updated: 2022-02-16
---

## 作用域

> 作用域：变量起作用的区域，也就是说：变量定义后，可以在哪个范围内使用该变量

**全局作用域** ：在 script 标签内，**函数外**的区域就是全局作用域，在全局作用内声明的变量叫做**全局变量** 。全局变量可以在任意地方访问。（if/while/for 语句中声明的变量也是全局变量）

**函数作用域** ：在函数内的区域叫做函数作用域，在函数作用域内声明的变量叫做**局部变量** ，局部变量只有在当前函数内才能访问到。

自由变量：对于一个函数来说，函数内部没有声明该变量，但在函数内部有访问该变量。对于这个函数来说， 该变量就是一个自由变量。

隐式全局变量：没有使用 var 定义的变量也是全局变量，叫做隐式全局变量。

```js
var num = 11
function fn() {
  var num1 = 22
  num2 = 33
  num = 33
  console.log(num1)
}
fn()
console.log(num)
// console.log(num1)
console.log(num2)
```

**函数作用域是在函数定义的时候作用域就确定下来了，和函数在哪调用无关**

```js
var num = 123
function f1() {
  console.log(num)
}

function f2() {
  var num = 456
  f1()
}
f2() // 123
```

## 作用域链

作用域链：只要是函数，就会形成一个作用域，如果这个函数被嵌套在其他函数中，那么外部函数也有自己的作用域，这个一直往上到全局环境，就形成了一个作用域链


```js
// 1.
var num = 10
fn1()
function fn1() {
  console.log(num) // undefined
  var num = 20
  console.log(num) // 20
}
console.log(num) // 10

// 2
var num = 10
fn1()
function fn1() {
  console.log(num) // 10
  num = 20
  console.log(num) // 20
}
console.log(num) // 20

// 3
var num = 123
function f1(num) {
  console.log(num) // 456 undefined
}
function f2() {
  var num = 456
  f1(num)
  f1()
}
f2()

// 4
var num1 = 10
var num2 = 20
function fn(num1) {
  num1 = 100
  num2 = 200
  num3 = 300
  console.log(num1) // 100
  console.log(num2) // 200
  console.log(num3) // 300
  var num3
}
fn()
console.log(num1) // 10
console.log(num2) // 200
console.log(num3) // error
```

## 预解析（声明提升）

预解析过程：js 解析器在执行代码前，会把所有变量的声明和函数的声明提升到当前作用域的顶部。例如`var a = 11`其实会分为`var a` 和`a = 11`两部分，其中`var a`会被提升

预解析规则:

1. var 声明的变量：只提升声明，不会提升赋值
2. 函数声明：整体提升
3. 先提升 var 声明的变量，后提升函数声明
4. 遇到重名的 var 声明， var 声明会被忽略，值会保留
5. 遇到重名的函数声明，后者会覆盖前者
6. 如果 var 声明和函数声明同名，函数声明会把 var 声明覆盖

```js
// 函数预解析
// 1.
function fn() {
  console.log(a) // undefined
}
fn()
var a = 1

// 2.
var n = 45
function fn5() {
  console.log(n) // undefined
  n = 20
  console.log(n) // 20
  var n = 0
  console.log(n) // 0
}
fn5()
console.log(n) // 45

// 3.
console.log(b) // 函数体
var b = 23
function b() {
  console.log(b)
}
console.log(b) // 23
// b() // 报错

// 4.
console.log(c) // 函数体
c() // 嘿嘿
var c = function() {
  comsole.log('哈哈')
}

function c() {
  console.log('嘿嘿')
}

// 5.
console.log(fn1) // 函数体
fn1()
function fn1() {
  console.log('哈哈') // 哈哈
}
console.log(fn2) // undefined
fn2() // 报错
var fn2 = function() {
  console.log('嘿嘿')
}
// 对于函数表达式，函数的调用必须在表达式声明之后
fn2() // 嘿嘿

// 6.
// 只有用 var 声明的变量才会预解析
console.log(d) // 报错
d = 5

// 7.
console.log(e)
console.log(f) // 报错 f is not defined
var e = (f = 10)
console.log(f) // 10

// 8.
if ('a' in window) {
  var a = 'abc'
}
console.log(a) // abc
```
