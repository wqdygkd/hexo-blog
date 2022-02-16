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


## 函数进阶

### 定义函数的三种方式

#### 函数声明

```js
fn() // 函数声明可以先调用，在声明
function fn() {
  console.log('这是函数声明')
}
```

#### 函数表达式

```javascript
var fn = function() {
  console.log('这是函数表达式')
}
fn() // 函数表达式必须先声明，再调用
```

#### 构造函数 Function

```javascript
// 函数也是对象，可以使用 Function 构造函数 new 出来
// 相当于var fn = function () {}
var fn = new Function()

// 语法：new Function(arg1,arg2,arg3..,body)
// 1. 所有的参数都是字符串类型
// 2. 前面可以定义任意多个形参，最后一个参数是代码体
var fn = new Function('alert(1)')
fn()

var fn1 = new Function('a1', 'a2', 'alert(a1 + a2)')
fn1(1, 2)
```

#### eval 函数--了解

> eval 可以和 new Function 一样，执行字符串代码

注意：eval 函数的功能非常的强大，但是实际使用的情况并不多。

```javascript
eval('var num = 10; console.log(num)') // 10
```

- eval 形式的代码难以阅读
- eval 形式的代码无法打断点，因为本质还是还是一个字符串
- 在浏览器端执行任意的 JavaScript 会带来潜在的安全风险，恶意的 JavaScript 代码可能会破坏应用，特别是在用它执行用户输入数据的情况下。可能会有恶意用户输入威胁你的站点或应用程序安全的代码（即所谓的代码注入）
  [推荐了解下 xss 攻击](http://qingbob.com/Excess-XSS/)

### 函数的四种调用模式

分析 this 指向问题

1. 任何函数都有属于自己的 this
2. this 是动态的，this 在函数声明的时候是确定不了的，只有当函数被调用了才能够确定 this 的指向，this 的指向和函数在哪被调用没有关系

分析 this 的问题的思路：

1. this 是属于哪个函数
2. **这个函数是何种调用模式**

```
函数：当一个函数不是一个对象的属性时，我们称之为函数
方法：当一个函数被保存为对象的一个属性时，我们称之为方法
```

#### 函数调用模式

<font color="red">如果一个函数不是一个对象的属性时，就是被当做一个函数来进行调用的。此时 this 指向了 window</font>

```javascript
// 函数名() 的调用方式
function fn() {
  console.log(this) // 指向window
}
fn()
```

#### 方法调用模式

<font color="red">当一个函数被保存为对象的一个属性时，我们称之为一个方法。当一个方法被调用时，this 被绑定到当前对象</font>

```javascript
// 通过点语法或者中括号语法来访问方法，都是属于方法调用模式
var f = function() {
  console.log(this)
}
var obj = {
  a: 1,
  fn: f
}
obj.fn() // obj
obj['fn']() // obj

var arr = [f, 10, 30]
// 也是方法调用模式
arr[0]() // arr
```

#### 构造函数调用模式

<font color="red">如果函数是通过 new 关键字进行调用的，此时 this 被绑定到创建出来的新对象上</font>

```javascript
function Person() {
  console.log(this)
}
Person() // this 指向 window
var p = new Person() // this 指向 p
```

**总结：分析 this 的问题，主要就是区分函数的调用模式，看函数是怎么被调用的**

```javascript
// 分析思路：1. 看 this 是哪个函数的  2. 看这个函数是怎么调用的，处于什么调用模式
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
// obj['getAg']()

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

// 但是注意，如果你只是引用obj的方法，
// 而没有调用它
var fn2 = obj.bar
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window) // true
```

#### 方法借用模式

> 上下文调用模式也叫方法借用模式，分为 apply，call ，bind
>
> 使用方法：`函数.call()` 或者 `函数.apply()`

任何函数都可以调用 apply，call ，bind 这三个方法

##### call 方法

call 方法可以调用一个函数，并且可以指定这个函数的 `this` 指向

```javascript
// call 方法也可以和 () 一样，进行函数调用
// 第一个参数：指定函数的 this，如果不传，则 this 指向 window
// 其余参数：和函数的参数列表一模一样
var zs = {
  name: 'zs',
  sayHi: function() {
    console.log('hello ,我是' + this.name)
  }
}
// zs.sayHi()
var ls = {
  name: 'ls'
}
// ls 借用 zs 的 sayHi 方法
zs.sayHi.call(ls)
```


##### apply 方法

```
apply 的语法：
apply(thisArg, 实参列表)
thisArg ==> 改变函数内的 this 指向的
实参列表 ==> 是一个数组或者是伪数组
```

> `apply()`方法的作用和 `call()`方法类似，只有一个区别，就是`apply()`方法接受的是**一个包含多个参数的数组**。而`call()`方法接受的是**若干个参数的列表**

```javascript
// 1. apply 能够调用函数
function fn() {
  console.log(1)
}
fn.apply() // 1

// 2. apply 改变 this 指向
function fn() {
  console.log(this)
}
fn.apply([10, 20, 30]) // [10, 20, 30]

// 3. apply 第二个参数是数组
function fn(n1, n2) {
  console.log(this)
  console.log(n1 + n2)
}
fn.apply({ name: 'zs' }, [10, 20]) // {name: 'zs'}, 30
// apply 的特性： 平铺性，把数组中的每一项取出来作为函数的实参
// fn.call({name: 'ls'}, 10, 20) // {}, 30
```

call 和 apply 的使用场景：

- 如果参数比较少，使用 call 会更加简洁
- 如果参数存放在数组中，此时需要使用 apply

课后练习：

```
求数组的最大值和最小值
封装一个函数，能够打印出来所有的参数
```

##### bind 方法

**bind()** 方法创建一个新的函数、可以绑定新的函数的 `this` 指向

```javascript
// 返回值：新的函数(不会被调用)
// 参数：新函数的 this 指向，当绑定了新函数的 this 指向后，无论使用何种调用模式，this 都不会改变
// var newFn = fn.bind(window)
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

可以从上述代码中发现，不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window。

#### 特殊的 this 指向

- 定时器中的 this 指向了 window，因为定时器的 function 最终是由 window 来调用的
- 事件中的 this 指向的是当前的元素，在事件触发的时候，浏览器让当前元素调用了 function

```
call apply bind 第一个参数表示要绑定的 this
不传，传 null，或者 undefined ，this 均指向 window
但在严格模式下，不传指向 undefined，传 null 指向 null，传 undefined 指向 undefined
```

### 函数也是对象

> 函数是由 new Function 创建出来的，因此函数也是一个对象，`所有的函数都是 Function 的实例`

#### 函数的原型链结构

Person ==> Function.prototype ==> Object.prototype ==> null

Function.prototype 类型是个函数

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102204558.jpeg)


### Function
- length：获取形参的长度
- name：获取函数的名字，此属性不允许修改

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

## 完整版原型链

> 绘制完整版原型链的目的是辅助大家理解 js 中对象的继承关系

图一
![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102204647.png)

图二
![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102204701.jpeg)

1. 所有函数都是 new Function 创建出来的，因此 `所有函数.__proto__` 都是 `Function.prototype`
2. 所有对象都是 new Object 创建出来的，因此 `所有对象.__proto__` 都是 `Object.prototype`

[参考链接](https://github.com/creeperyang/blog/issues/9)

## 作用域与预解析

#### 作用域

> 作用域：变量起作用的区域，也就是说：变量定义后，可以在哪个范围内使用该变量

**全局作用域** ：在 script 标签内，**函数外**的区域就是全局作用域，在全局作用内声明的变量叫做**全局变量** 。全局变量可以在任意地方访问。（if/while/for 语句中声明的变量也是全局变量）

**函数作用域** ：在函数内的区域叫做函数作用域，在函数作用域内声明的变量叫做**局部变量** ，局部变量只有在当前函数内才能访问到。

自由变量：对于一个函数来说，函数内部没有声明该变量，但在函数内部有访问该变量。对于这个函数来说， 该变量就是一个自由变量。

隐式全局变量：没有使用 var 定义的变量也是全局变量，叫做隐式全局变量。(不要使用)

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

变量的查找规则：

- 函数内部可以使用函数外部的变量
- 有局部变量就用局部变量，没有局部变量就用全局变量。

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

var num = 10
var num1 = 10

function test() {
  var num = 20
  num = 30 // num 在局部声明过，只能修改局部的 num 值
  num1 = 20 // 修改全局的 num1 值
  var num2 = 40
  num3 = 50 // 隐式全局
  console.log(num) // 30
  console.log(num1) // 20
  console.log(num2) // 40
  console.log(num3) // 50
}
test()
console.log(num) // 10
console.log(num1) // 20
// 如果 test 函数没执行过，则 num1 值为 10
console.log(num3) // 50
console.log(num2) // 报错
```

#### 作用域链

作用域链：只要是函数，就会形成一个作用域，如果这个函数被嵌套在其他函数中，那么外部函数也有自己的作用域，这个一直往上到全局环境，就形成了一个作用域链

`变量的搜索原则`：

1. 从当前作用域开始查找是否声明了该变量，如果存在，那么就直接返回这个变量的值
2. 如果不存在，就会往上一层作用域查询，如果存在，就返回
3. 如果不存在，一直查询到全局作用域，如果存在，就返回。如果在全局中也没有找到该变量会**报错**

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

// 2 -- 改造上面的面试题
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

// 5
var num = 1
function fn() {
  var num = 100
  num++
  console.log(num)
}
fn() // 101
fn() // 101
console.log(num) // 1

// 6.
var color = 'red' // blue
function outer() {
  var anotherColor = 'blue' // red
  function inner() {
    var tmpColor = color // red
    color = anotherColor
    anotherColor = tmpColor // red
    console.log(anotherColor) // red
  }
  inner()
}
outer()
console.log(color) // blue
```

#### 预解析

> 预解析：预先解析

js 执行代码分为两个过程：

- 预解析过程（变量与函数提升）
- 代码一行一行执行

预解析过程：JavaScript 解析器在执行代码前，会把所有变量的声明和函数的声明提升到当前作用域的顶部。例如`var a = 11`其实会分为`var a` 和`a = 11`两部分，其中`var a;`会被提升

预解析规则 :

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

**不要在一个作用域内重复的声明相同的变量和函数**

## 递归函数

> 递归函数：函数内部直接或者间接的调用自己

递归的要求：

1. 自己调用自己（直接或者间接）
2. 要有结束条件（出口）

递归函数主要是`化归思想`，将一个复杂的问题简单化，主要用于解决数学中的一些问题居多。

- 把要解决的问题，归结为已经解决的问题上。
- 一定要考虑什么时候结束让函数结束，也就是停止递归（一定要有已知条件）

练习：

```js
// 1. 计算1-100之间所有数的和
// 2. 计算斐波那契数列
function fn(n) {
  if (n == 1 || n == 2) {
    return 1
  }
  return fn(n - 1) + fn(n - 2)
}
console.log(fn(12))
```

#### 实现缓存

> 缓存（cache）：数据的缓冲区，当要读取数据时，先从缓冲中获取数据，如果找到了，直接获取，如果找不到，重新去请求数据

计算斐波那契数列，会有很大的性能问题，因为重复的计算了很多次，因此我们可以使用缓存来解决这个性能问题。

初级优化：

使用缓存的基本步骤：

- 如果要获取数据，先查询缓存，如果有就直接使用
- 如果没有，就进行计算，并且将计算后的结果放到缓存中，方便下次使用。

```javascript
// 缓存
var arr = []
var fbi = function(n) {
  count++
  if (n === 1 || n === 2) {
    return 1
  }
  if (arr[n]) {
    return arr[n]
  } else {
    var temp = fbi(n - 1) + fbi(n - 2)
    arr[n] = temp // 存入缓存
    return temp
  }
}
```

缺点：既然使用缓存，就需要保证缓存的数据的安全，不能被别人修改，因此，需要使用闭包来实现缓存的私有化。
