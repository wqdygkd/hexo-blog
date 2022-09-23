---
title: 【es6】Promise
tags:
  - es6
  - js
  - promise
id: '410'
categories:
  - 前端
date: 2019-01-08 22:21:49
---

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

## promise 的三个状态

- pending : 等待 (等待成功或者失败去调用)
- fulfilled : 成功调用(resolve)
- rejected : 失败调用(reject)

有 throw 也相当于 reject

```js
let p1 = new Promise(() => {}) // Promise {<pending>}
let p2 = new Promise((resolve, reject) => { resolve('成功') }) // Promise {<fulfilled>: '成功'}
let p3 = new Promise((resolve, reject) => { reject('失败') }) // Promise {<rejected>: '失败'}
let p4 = new Promise((resolve, reject) => { throw('报错') }) //Promise {<rejected>: '报错'}
```

## Promise 静态方法

Promise.resolve()
Promise.reject()
Promise.all()
Promise.race()
Promise.any()

### Promise.resolve()

Promise.resolve方法的参数分成四种情况

1. 参数是一个 Promise 实例: 不做任何修改、原封不动地返回这个实例

```js
let p = new Promise((resolve, reject) => { resolve('成功') })
Promise.resolve(p) === p // true
```

2. 参数是一个thenable对象(thenable对象指的是具有then方法的对象): 会将这个对象转为 Promise 对象，然后立即执行thenable对象的then方法，执行结果作为后续方法的参数

```js
let thenable = {
  then: function(resolve, reject) { resolve('张三') }
}
let p = Promise.resolve(thenable)
p.then((res) => {
  console.log(res) // '张三'
})
```

3. 参数不是具有then方法的对象，或根本就不是对象: 返回一个新的状态为resolved的 Promise 对象，参数会作为后续方法的参数

```js
const p = Promise.resolve('张三')
p.then((res) => {
  console.log(res) // '张三'
})
```

4. 不带有任何参数：返回一个新的状态为resolved的 Promise 对象

```js
const p = Promise.resolve()
p.then((res) => {
  console.log(res) // undefined
})
```

### Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected

Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致

```js
const thenable = {
  then(resolve, reject) {
    reject('出错了')
  }
}
Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable) // true
})
```

上面代码中，Promise.reject 方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。

## all 和 race

Promise.all()：resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息

Promise.race()：始终返回最快的那一个promise，不管resolve还是reject

## Promise.prototype 成员

- `then()` ：用于获取异步操作成功时的结果 -> `resolve`
- `catch()`：用于获取异步操作失败时的结果 -> `reject`
- `finally()`：不管 Promise 最后状态如何，都会执行的操作，finally 方法的回调函数不接受任何参数

```js
promise.then(successCallback, failureCallback)
promise.catch(failureCallback)
```

then 第一个参数是resolved状态的回调函数，如果第一个参数不是函数，则会在内部被替换为 (x) => x，即原样返回 promise 最终结果的函数
then 第二个参数（可选）是rejected状态的回调函数
catch(failureCallback) 是 then(null, failureCallback) 的缩略形式
then方法返回的是一个新的Promise实例

## async 和 await

* async / await 用同步编写代码的方式 处理异步操作的一个方案
* async：修饰 (修饰一个内部有异步操作的函数) 格式 : async + 函数 (里面有异步操作的函数)
* await : 等待 (等上一个异步操作完成啊 , 修饰 一个结果是 promise 的)异步操作 格式 : await + 异步操作(结果 promise 对象)
* async 和 await 是成对出现的，await 只能在 async 函数中使用

https://juejin.cn/post/6945319439772434469#heading-4
