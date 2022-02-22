---
title: 常用js —— 函数
tags:
  - js
id: 2037
categories:
  - 前端
date: 2022-02-16
updated: 2022-02-16
---

## 函数的参数

arguments 对象里保存了所有的实参，是一个伪数组

## 定义函数的三种方式

- 函数声明

```js
fn() // 函数声明可以先调用，在声明
function fn() {
  console.log('这是函数声明')
}
```

- 函数表达式

```js
var fn = function() {
  console.log('这是函数表达式')
}
fn() // 函数表达式必须先声明，再调用
```

- 构造函数 Function

```js
// 函数也是对象，可以使用 Function 构造函数 new 出来
// 相当于var fn = function () {}
var fn = new Function()

// 语法：new Function(arg1,arg2,arg3..,body)
// 所有的参数都是字符串类型
// 前面可以定义任意多个形参，最后一个参数是代码体
var fn = new Function('alert(1)')
fn()

var fn1 = new Function('a1', 'a2', 'alert(a1 + a2)')
fn1(1, 2)
```

## Function 属性

- length：获取形参的长度
- name：获取函数的名字，此属性不允许修改

```js
Function.length // 1
Function.prototype.length // 0
(function()        {}).length // 0
(function(a)       {}).length // 1
(function(...args) {}).length // 0
(function(a, b = 1, c) {}).length // 1
```

## Function.prototype 成员

- arguments：已废弃，获取函数的实参，现在推荐的做法是使用函数内部可用的  `arguments` 对象来访问函数的实参
- caller: 已废弃，用于获取当前函数是在哪个函数中调用的
- constructor：指向当前构造函数，Function
- call：调用函数，重新指定 this
- apply：调用函数，重新指定 this
- bind：重新指向 this，返回一个新的函数，不调用
- toString : 得到函数的字符串格式

```js
function a() {}
a.toString() // 'function a() {}'

// 获取数据类型
return Object.prototype.toString.call(obj).slice(8, -1) // '[object 构造函数]'
```

## 函数的四种调用模式

分析 this 指向问题

1. 任何函数都有属于自己的 this
2. this 是动态的，this 在函数声明的时候是确定不了的，只有当函数被调用了才能够确定 this 的指向，this 的指向和函数在哪被调用没有关系

分析 this 的问题的思路： 1. this 是属于哪个函数 2. **这个函数是何种调用模式**

### 函数调用模式

<font color="red">如果一个函数不是一个对象的属性时，就是被当做一个函数来进行调用的。此时 this 指向了 window</font>

```js
function fn() {
  console.log(this) // 指向 window
}
fn()
```

### 方法调用模式

<font color="red">当一个函数被保存为对象的一个属性时，我们称之为一个方法。当一个方法被调用时，this 被绑定到当前对象</font>
通过点语法或者中括号语法来访问方法，都是属于方法调用模式

```js
var f = function() {
  console.log(this)
}
var obj = { fn: f }
var arr = [f]

obj.fn() // obj
obj['fn']() // obj
arr[0]() // arr 也是方法调用模式
```

### 构造函数调用模式

<font color="red">如果函数是通过 new 关键字进行调用的，此时 this 被绑定到创建出来的新对象上</font>

```js
function Person() {
  console.log(this)
}
var p = new Person() // this 指向 p
```

**总结：分析 this 的问题，主要就是区分函数的调用模式，看函数是怎么被调用的**

```js
// 1.
var age = 38
var obj = {
  age: 18,
  getAge: function() {
    console.log(this.age)
  }
}
var f = obj.getAge
f() // window ==> 38

// 2.
var age = 38
var obj = {
  age: 18,
  getAge: function() {
    console.log(this.age) // obj ==> 18
    function foo() {
      console.log(this.age) // window ==> 38
    }
    foo()
  }
}
obj.getAge()

// 3.
var length = 10
var age = 18
function fn() {
  console.log(this.length)
}
var arr = [fn, '222']
fn() // 10
arr[0]() // 2

// 4.
var length = 10
function fn() {
  console.log(this.length)
}
var obj = {
  length: 5,
  method: function(fn) {
    fn() // window ==> 10
    arguments[0]() // argument ==> 3
  }
}
obj.method(fn, 10, 5)

// 5.
let len = 10
function fn() {
  console.log(this.len)
}
fn() // window ==> undefined

let Person = {
  len: 5,
  say: function() {
    fn() // window ==> undefined
    arguments[0]() // arguments ==> undefined
  }
}
Person.say(fn)

// 6.
var obj = {
  bar: function() {
    var x = () => this
    return x
  }
}

// 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// 将返回的函数的引用赋值给fn。
var fn = obj.bar()

// 直接调用fn而不设置this，
// 通常(即不使用箭头函数的情况)默认为全局对象
// 若在严格模式则为undefined
console.log(fn() === obj) // true

// 但是注意，如果你只是引用obj的方法，而没有调用它
var fn2 = obj.bar
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window) // true
```

### 方法借用模式

上下文调用模式也叫方法借用模式，分为 apply，call ，bind
任何函数都可以调用 apply，call ，bind 这三个方法

#### call 方法

call 方法可以调用一个函数，并且可以指定这个函数的 `this` 指向
call 方法也可以和 () 一样，进行函数调用
第一个参数：指定函数的 this，如果不传，则 this 指向 window；其余参数：和函数的参数列表一模一样

```js
// 调用函数
function fn() {
  console.log(1)
}
fn.call() // 1

// 改变 this 指向
function fn() {
  console.log(this)
}
fn.call({ name: 'zs' }) // { name: 'zs' }
```

#### apply 方法

> `apply()`方法的作用和 `call()`方法类似，只有一个区别，就是`apply()`方法接受的是**一个包含多个参数的数组**。而`call()`方法接受的是**若干个参数**

```js
function fn(n1, n2) {
  console.log(this)
  console.log(n1 + n2)
}
fn.apply({ name: 'zs' }, [10, 20]) // {name: 'zs'}, 30
// apply 的特性：平铺性，把数组中的每一项取出来作为函数的实参
```

#### bind 方法

**bind()** 方法创建一个新的函数、可以绑定新的函数的 `this` 指向

返回值：新的函数(不会被调用)
参数：新函数的 this 指向，绑定后，无论使用何种调用模式，this 都不会改变

```js
var fn = function() {
  console.log(this)
}

var newFn = fn.bind([1, 2, 3])
// newFn 是 bind 创建并返回出来的
console.log(newFn)
newFn() // this ==> [1,2,3]
```

如果对一个函数进行多次 bind，那么上下文会是什么呢

```js
let a = {}
let fn = function() {
  console.log(this)
}
fn.bind().bind(a)() // => ?
```

如果你认为输出结果是 a，那么你就错了，其实我们可以把上述代码转换成另一种形式

```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```

可以从上述代码中发现，不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window

### 特殊的 this 指向

- 定时器中的 this 指向了 window，因为定时器的 function 最终是由 window 来调用的
- 事件中的 this 指向的是当前的元素，在事件触发的时候，浏览器让当前元素调用了 function
- call apply bind 第一个参数表示要绑定的 this，不传、传 null或者 undefined，this 均指向 window，但在严格模式下，不传指向 undefined，传 null 指向 null，传 undefined 指向 undefined

## 递归函数

递归的要求：1. 自己调用自己 2. 要有结束条件（出口）

```js
// 计算斐波那契数列
function fn(n) {
  if (n == 1 || n == 2) {
    return 1
  }
  return fn(n - 1) + fn(n - 2)
}
console.log(fn(12))
```
