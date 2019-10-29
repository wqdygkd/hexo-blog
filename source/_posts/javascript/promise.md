---
title: 【es6]Promise
tags: promise
categories:
  - [js]
date: 2019/01/08 18:00:00
updated: 2019/10/28
---

# Promise

- Promise 是`异步编程`的一种解决方案，它允许你以一种同步的方式编写异步代码
- `promise`：承诺、保证
- [ES6 - Promise](http://es6.ruanyifeng.com/#docs/promise)
- JS 是通过回调函数来实现异步编程的，当异步操作多了以后，就会产生回调嵌套回调的问题，这就是`回调地狱`
- Promise 方式：将异步操作以同步操作的方式表达出来，避免了层层嵌套的回调函数

## 封装一个 Promise

```js
// 按序读取文件：a -> b -> c
// 按顺序读取 a b c 文件
// 以前
// 读取 a 文件
fs.readFile('./a', (err, data) => {
  if (err) return console.log('读取错误')
  console.log(data.toString())

  // 读取 b 文件
  fs.readFile('./b', (err, data) => {
    if (err) return console.log('读取错误')
    console.log(data.toString())

    // 读取 c 文件
    fs.readFile('./a', (err, data) => {
      if (err) return console.log('读取错误')
      console.log(data.toString())
    })
  })
})

// 使用 Promise
// 封装
// Promise 是一个构造函数
// 通过 new 创建 Promise 的实例对象
function readFile(path) {
  // 实例化 Promise
  const p = new Promise((resolve, reject) => {
    // resolve 表示成功，异步操作成功调用
    // reject  表示失败，异步操作失败调用
    fs.readFile(path, (err, data) => {
      // 读取错误，调用 reject()
      if (err) return reject(err)

      // 读取成功 调用 resolve
      resolve(data.toString())
    })
  })

  // 返回 Promise 对象
  return p
}
// 使用
readFile('a')
  .then(res => {
    console.log(res)
    return readFile('a')
  })
  .then(res => {
    console.log(res)
    return readFile('b')
  })
  .then(res => {
    console.log(res)
  })
```

## promise 的三个状态

- pending : 等待 (等待成功或者失败去调用)

- resolved : 成功调用

- rejected : 失败调用

## then 和 catch

- 说明：获取异步操作的结果
- `then()` ：用于获取异步操作成功时的结果 -> _resolve_
- `catch()`：用于获取异步操作失败时的结果 -> _reject_
- 说明：`then()`方法可以有多个，按照先后顺序执行，通过回调函数返回值传递数据给下一个 then

```js
p
  // 成功
  .then(value => {
    console.log('文件a的内容为：', value)
  })
  // 失败（比如：文件路径错误）
  .catch(err => {
    console.log('文件读取失败：', err)
  })

// ----------- 或者 -----------
p.then(
  value => {
    // 成功
  },
  err => {
    // 失败
  }
)
```

## all 和 race

```js
// 等待所有请求完成，才会执行后续代码
const p = Promise.all([axios('/a'), axios('/b')])

p.then(res => {
  // res 是 all() 方法中所有异步操作的结果
  console.log(res)
})

// 只要有一个请求完成，就会继续执行后续代码
const p = Promise.race([axios('/a'), axios('/b')])

p.then(res => {
  // res 是 race() 方法中先完成的异步操作的结果
  console.log(res)
})
```

## async 和 await

- 异步编程终极方案

* async / await 用同步编写代码的方式 处理异步操作的一个方案
* async：修饰 (修饰一个内部有异步操作的函数) 格式 : async + 函数 (里面有异步操作的函数)
* await : 等待 (等上一个异步操作完成啊 , 修饰 一个结果是 promise 的)异步操作 格式 : await + 异步操作(结果 promise 对象)
* async 和 await 是成对出现的，await 只能在 async 函数中使用

```js
// 第一步封装
function readFile(path) {
  // 1. 实例化 promise
  const p = new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        // 操作错误 调用 =>  reject  => catch
        return reject(err)
      }
      // 操作成功  调用 => resolve => then
      resolve(data.toString())
    })
  })
  // 2. 返回 promise 对象
  return p
}

// 第二步：使用 (async/await)
// async + 函数 (里面有异步操作的函数)
async function fn() {
  // await + 异步操作(结果promise对象)
  // 读取a文件
  try {
    const res1 = await readFile('./data/a1.txt')
    console.log(res1)
  } catch (error) {
    console.log(error)
  }

  // 读取 b 文件
  const res2 = await readFile('./data/b.txt')
  console.log(res2)

  // 读取 c 文件
  const res3 = await readFile('./data/c.txt')
  console.log(res3)
}

fn()
```

```javascript
// 延时函数
function sleep(a, b) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(b)
    }, a)
  })
  return p
}

async function fn() {
  const res1 = await sleep(1000, 'a')
  console.log(res1)
  const res2 = await sleep(5000, 'b')
  console.log(res2)
  const res3 = await sleep(3000, 'c')
  console.log(res3)
}
// fn()

sleep(1000, 'a')
  .then(res => {
    console.log(res)
    return sleep(5000, 'b')
  })
  .then(res => {
    console.log(res)
    return sleep(3000, 'c')
  })
  .then(res => {
    console.log(res)
  })

const p1 = Promise.all([sleep(1000, 'a'), sleep(5000, 'b')])
p1.then(res => {
  console.log(res)
})

const p2 = Promise.race([sleep(1000, 'a'), sleep(5000, 'b')])
p2.then(res => {
  console.log(res)
})
```
