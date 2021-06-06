---
title: 高阶函数与柯里化
tags:
  - js
id: '399'
categories:
  - 前端
date: 2019-07-17 22:14:13
---

## 高阶函数

高阶函数定义：将函数作为参数或者返回值是函数的函数
常见的 sort、reduce 等函数就是高阶函数

```js
function add(a) {
  return function(b) {
    return a + b
  }
}

var sum = add(1)(2) // 3

// es6写法
let add = (a) => (b) => a + b

// 等价于
let add = (a, b) => a + b
```

## 柯里化

wiki 的柯里化定义: 把接受多个参数的函数变换成接受一个单一参数的函数，并且返回（接受余下的参数而且返回结果的）新函数的技术

柯里化后，将第一个参数变量存在函数里面了(闭包)，然后本来需要 n 个参数的函数变成只需要剩下的（n - 1 个）参数就可以调用

```js
// 形如
;(a) => (b) => (c) => {}

let add = (a) => (b) => a + b
let add1 = add(1) // a = 1; b => a + b
add1(2) // 1 + 2 = 3
```

add1 函数等价于有了 a 这个闭包变量的 b = a + b

add 函数按照 wiki 的定义可以理解成只柯里化了一次，n 个连续箭头组成的函数实际上就是柯里化了 n - 1 次
前 n - 1 次调用，其实是提前将参数传递进去，并没有调用最内层函数体，最后一次调用才会调用最内层函数体，并返回最内层函数体的返回值

所以多个连续箭头函数就是多次柯里化的 es6 写法

**应用：**

函数懒执行
函数式编程

**柯里化函数使用场景：**

减少重复传递不变的参数

```js
function discount(price, discount) {
  return price * discount
}

// 每次都要重复传入 discount 参数，可以将这个函数柯里化
function discount(price, discount) {
  return (price) => {
    return price * discount
  }
}
const tenPercentDiscount = discount(0.9) // 9折
const twentyPercentDiscount = discount(0.8) // 8折

// 现在每次计算价格只需要：
tenPercentDiscount(500) // 500 * 0.9
twentyPercentDiscount(1000) // 1000 * 0.8
```

## 柯里化实现

```js
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

let curriedSum = curry(sum)
console.log(curriedSum(1, 2, 3)) // 6
console.log(curriedSum(1)(2, 3)) // 6
```

## 偏函数
