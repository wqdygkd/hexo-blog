---
title: 常用js —— 闭包
tags:
  - js
id: 2039
categories:
  - 前端
date: 2022-02-20
updated: 2022-02-20
---

### 闭包(closure)的概念

> 闭包是函数和声明该函数的词法环境的组合

在 js 中，在函数中可以（嵌套）定义另一个函数时，如果内部的函数引用了外部的函数的变量，产生闭包

产生闭包的条件：有两个函数，是嵌套关系，内部函数引用了外部函数的变量

闭包的作用：

- 私有变量，保护数据安全
- 持久化数据

```js
// 闭包的基本模型
function outer() {
  var num = 10
  function inner () {
    num++
    console.log(num)
  }
  return inner  // 把inner函数给返回出去，让外部能够调用inner函数
}

// 并不一定是有返回函数才算是产生了闭包
var f3
function f1() {
  var a = 2
  f3 = function() {
    console.log(a)
  }
}
f1()
f3() // 2
```

### 闭包的应用

#### 计数器

需求：统计一个函数的调用次数

```js
var count = 0
function fn() {
  count++
  console.log('我被调用了，调用次数是' + count)
}
fn()
fn()
fn()
// 缺点：count是全局变量，不安全
```

使用闭包解决这个问题

```js
function outer() {
  var count = 0 // 私有变量, 将 count 保护起来了
  function add() {
    count++
    console.log('当前count' + count)
  }
  return add
}
var result = outer()
result()
```

#### 缓存的私有化

计算斐波那契数列，会有很大的性能问题，因为重复的计算了很多次，因此我们可以使用缓存来解决这个性能问题。

缺点：既然使用缓存，就需要保证缓存的数据的安全，不能被别人修改，因此，需要使用闭包来实现缓存的私有化。

```js
function outer() {
  // 缓存
  var arr = []

  var fbi = function(n) {
    if (n == 1 || n == 2) {
      return 1
    }
    if (arr[n]) {
      return arr[n]
    } else {
      var temp = fbi(n - 1) + fbi(n - 2)
      arr[n] = temp //存入缓存
      return temp
    }
  }
  return fbi
}
var fbi = outer()
console.log(fbi(40))
```

### 闭包存在的问题

> 正常情况下：函数在调用的时候，去开辟一块内存空间用来执行内部的代码，当函数调用结束的时候，要销毁开辟的空间，节省内存
> 闭包占用的内存是不会被释放的，因此，如果滥用闭包，会造成内存泄漏的问题。闭包很强大，但是只有在必须使用闭包的时候才使用

#### js 的垃圾回收机制(了解)

- 内存：计算机中所有程序的运行都是在`内存` 中进行的，因此内存的性能对计算机的影响非常大，运行程序需要消耗内存，当程序结束时，内存会得到释放。
- javascript 分配内存：当我们定义变量，javascript 自动分配内存存储数据。无论是值类型或者是引用类型，都需要存储在内存中。
- 垃圾回收：当代码执行结束，分配的内存已经不需要了，这时候需要将内存进行回收，在 javascript 语言中，`垃圾回收机器`会帮我们回收`不再需要使用`的内存。

##### 引用记数法清除

引用记数垃圾收集：如果没有引用指向某个对象（或者是函数作用域），那么这个对象或者函数作用域就会被垃圾回收机制回收。

```js
var o = {
  name: 'zs'
}
// 对象被 o 变量引用，引用记数 1
var obj = o // 变量被 o 和 obj 引用，引用记数 2
o = 1 // o 不在引用对象了，引用记数 1
obj = null // obj 不在引用对象了，引用记数 0，可以被垃圾回收了
```

引用计数法无法解决循环引用导致的内存泄露

```js
function fn() {
  var obj1 = {} // 引用计数为 2
  var obj2 = {} // 引用计数为 2
  obj1.a = obj2
  obj2.b = obj1
}
fn() // 销毁fn调用开辟的空间， 但是由于引用计数考虑到两个对象都不是零引用的对象，就不能够被垃圾回收机制给回收掉
```

##### 标记清除法清除

使用引用计数法进行垃圾回收的时候，会出现循环引用导致内存泄漏的问题。因此现代的浏览器都采用标记清除法来进行垃圾回收。

这个算法假定设置一个叫做根（root）的对象（在 Javascript 里，根是全局对象 Window）。定期的，垃圾回收器将从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和所有不能获得的对象。

**从 2012 年起，所有现代浏览器都使用了标记 - 清除垃圾回收算法。**

#### 闭包占用内存释放

当闭包的功能不在需要使用了，将这个变量指向 `null`， 这样闭包占用的内存就可以被回收掉了

```js
function outer() {
  var count = 0
  function fn() {
    count++
    console.log('执行次数' + count)
  }
  return fn
}
var result = outer()
result()
result = null // 当函数 fn 没有被变量引用了，那么函数 fn 就会被回收，函数 fn 一旦被回收，那么 outer调用形成的作用域也就得到了释放
```
