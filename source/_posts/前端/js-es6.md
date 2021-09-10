---
title: ES6（ECMAScript）
tags:
  - es6
  - js
id: '405'
categories:
  - 前端
date: 2018-12-29
updated: 2021-09-09
---

# ES6（ECMAScript）

ECMAScript 6.0（以下简称 ES6）是在 2015 年 6 月正式发布的标准。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言

[ECMAScript 6 入门 阮一峰](http://es6.ruanyifeng.com/)

## let 与 const

> ES6 中提供了两个声明变量的关键字：const 和 let

参考链接

[[知乎]我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)

[[MDN]变量提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)

### let 的使用

ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`

- let 声明的变量只有在当前作用域(块作用域)有效

```js
{
  var a = 1
  let b = 2
}

console.log(a) // 1
console.log(b) // ReferenceError: b is not defined
```

- 不允许重复声明

```js
let a = 1
let a = 2 // SyntaxError: Identifier 'a' has already been declared
```

谷歌浏览器控制台对重复声明已经不报错了，估计是为了方面调试

```txt
> let a = 1
< undefined
> let a = 2
< undefined
> const a = 3
x VM331:1 Uncaught SyntaxError: Identifier 'a' has already been declared
> const b = 1
< undefined
> const b = 2
< undefined
> let b = 3
x VM378:1 Uncaught SyntaxError: Identifier 'b' has already been declared
```

- <span class="red">使用 let 声明的全局变量，不会成为 window 的属性</span>

```js
var c = 1
console.log(window.c) // 1
console.log(c) // 1
let c = 1
console.log(window.c) // undefined
console.log(c) // 1
```

- <span class="error">存在变量提升</span>

```js
let a = 1
{
  a = 2
  let a
}
// 如果 let 不会提升，那么 a = 2 就会将外面的 a 由 1 变成 2
// 但运行发现 a = 2 报错：Uncaught ReferenceError: Cannot access 'a' before initialization
```

```js
a = 1; let a  // Uncaught ReferenceError: Cannot access 'a' before initialization
```

总结：

- let/const 声明的「创建」过程被提升了，但是「初始化」没有提升，var 声明的「创建」和「初始化」都被提升了，但「赋值」没被提升，function 声明的「创建」、「初始化」和「赋值」都被提升了
- let 声明会提升到块顶部，从块顶部到该变量的初始化语句，这块区域叫做 TDZ（暂时死区），所谓暂时死区，就是不能在初始化之前，使用变量
- 如果你在 TDZ 内使用该变量，JS 就会报错

如果 let x 的初始化过程失败了，那么

- x 变量就将永远处于 created 状态
- 你无法再次对 x 进行初始化（初始化只有一次机会，而那次机会你失败了）
- 由于 x 无法被初始化，所以 x 永远处在暂时死区

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
const obj = { name: 'zs' }
obj.age = 18 // 正确
obj = {} // TypeError: Assignment to constant variable
```

- 其他用法和 let 一样

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

ES6 标准新增了一种新的函数：Arrow Function（箭头函数），为什么叫 Arrow Function？因为它的定义用的就是一个箭头

### 使用

```js
// 语法： (参数列表) => {函数体}
let fn = (x, y) => {
  console.log(x + y)
}
```

相当于

```js
let fn = function(x, y) {
  console.log(x + y)
}
```

### 特点

- 不存在 prototype 这个属性

```js
let a = () => {}
console.log(a.prototype) // undefined
```

- 没有自己的 this，arguments

箭头函数的 this、arguments 都是在定义函数时绑定外层的 this 和 arguments，而不是在执行过程中绑定的，所以不会因为调用者不同而发生变化。
可以使用剩余参数(Rest 参数)表示法获得的自身入参列表

因为箭头函数没有 this，因此箭头函数不能作为构造函数

不能用 call()、apply()、bind() 这些方法改变 this 的指向

```js
fn = function(){
  let arrow = (...args) => {
    console.log(arguments) // 外层的入参列表 -> Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    console.log(args) // 使用剩余参数表示法获得的自身入参列表 -> (3) [4, 5, 6]
  }
  arrow(4, 5, 6)
  console.log(arrow.length) // 0
}
fn(1, 2, 3)
```

- 如果函数体只有一行语句，并且需要返回这个值，那么可以省略 {} 和 return

```js
let fn = (n1, n2) => n1 + n2
```

- Rest 参数和 arguments 对象的区别：

rest 参数只包括那些没有给出名称的参数，arguments 包含所有参数

rest 参数之后不能再有其他参数，否则会报错

函数的 length 属性，不包括 rest 参数

arguments 对象不是真正的数组，而 rest 参数是数组实例，可以直接使用数组的方法

## 对象简化语法

```js
// 当属性的 key 和变量的名相同时可以简写
let person = { name: name } ==> let person = { name }

// 声明函数
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
  [propKey]: true, // foo: true
  ['a' + 'bc']: 123,  // abc: 123
  [methodKey]() {
    return 'hi'
  }
}
```

## class 关键字

ES5 中通过 构造函数 + 原型 的方式来实现面向对象

```js
// 构造函数
function Person() {
  this.name = 'jack'
  this.age = 18
}

// 在原型中添加实例方法
Person.prototype.say = function() {
  console.log(this.name, this.age)
}

// 创建实例
const p = new Person()
p.say()
```

ES6 中出现了 class 关键字，用来实现面向对象

class 声明不允许再次声明已经存在的类，否则将会抛出一个类型错误
class 声明不可以提升
class 仅仅是一个语法结构（语法糖），本质还是函数，实现继承本质上还是通过构造函数 + 原型的方式

```js
class Person {}
Person instanceof Function // true
```

类声明

```js
// 创建 Person 类
class Person {
  // 类的构造函数 constructor 固定名称
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 添加实例方法
  say() {
    console.log(this.name, this.age)
  }
}

// 创建实例
const p = new Person('tom', 18)
console.log(p) // Person {name: 'tom', age: 18}
p.say() // tom 18
```

类表达式

赋予一个命名类表达式的名称是类的主体的本地名称

```js
// 匿名类
let Person = class {}
new Person() // Person {}

// 命名类
let Person = class A {}
new Person() // A {}
new A() // Uncaught ReferenceError: A is not defined
console.log(Person) // class A {}
console.log(A) // Uncaught ReferenceError: A is not defined
```

类表达式也不存在提升

static 关键字用来定义一个类的静态方法。调用静态方法不需要实例化该类，但不能通过一个类实例调用静态方法

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static distance(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y

    return Math.hypot(dx, dy)
  }
}

const p1 = new Point(5, 5)
const p2 = new Point(10, 10)

console.log(Point.distance(p1, p2))
```

继承：要实现至少需要两个 class（子类 和 父类），子类继承自父类，继承后，子类就可以使用父类中的属性或方法

```js
// 继承

// 父类
class Person {
  constructor(name, age) {
    this.name = name
  }

  say() {
    console.log('父类中的 say 方法', this.name)
  }
}

// 子类
class Chinese extends Person {
  constructor(name, age) {
    // 子类中使用 constructor 必须手动调用 super
    // super 表示父类的构造函数
    // 先调用 super() 在使用 this
    super()
    this.name = name
    this.age = age
  }
}

// 创建实例
const c = new Chinese('zs', 18)
console.log(c)
c.say() // 父类中的方法
```

## 解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

```js
// 1. 对象解构
var { a, b } = { a: 10, b: 20 }

// 同
;({ a, b } = { a: 10, b: 20 }) // 使用没有声明的赋值，数组解构类似
console.log(a, b) // 10 20

// 提取变量并赋值
var { a: p, b: q } = { a: 10, b: 20 }
console.log(p, q) // 10 20

// 将剩余属性赋值给一个变量
var { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 }
console.log(a, b, rest) // 10 20 {c: 30, d: 40}

// 提供默认值
var { a = 1, b = 1 } = { a: 10 }
console.log(a, b) // 10 1

// 赋值并提供默认值
var { a: aa = 10, b: bb = 1 } = { a: 10 }
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
;[a, b] = [b, a]
console.log(a) // 3
console.log(b) // 1

// 字符串解构
var str = 'love'
var [a, b, c, d] = str
console.log(a, b, c, d) // l o v e
```

## 扩展运算符

扩展运算符（spread）是三个点（...）。作用：将一个数组转为用逗号分隔的参数序列

```js
var arr = ['a', 'b', 'c']
console.log(...arr) // a b c
```

应用

```js
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

对象展开

```js
let defaults = { name: 'zs', age: 18 }
let search = { ...defaults, age: 12 } // { name: 'zs', age: 12 } 后面的属性会覆盖前面的属性
```

对象展开仅包含对象自身的可枚举属性

```js
class C {
  p = 12
  m() {}
}
let c = new C()
let clone = { ...c }
clone.p // ok
clone.m() // error!
```

## ES6 模块化
