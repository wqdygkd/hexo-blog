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

## promise 的三个状态

- pending : 等待 (等待成功或者失败去调用)
- fulfilled : 成功调用(resolve)
- rejected : 失败调用(reject)

## then、catch 和 finally

- 说明：获取异步操作的结果
- `then()` ：用于获取异步操作成功时的结果 -> `resolve`
- `catch()`：用于获取异步操作失败时的结果 -> `reject`
- `finally()`：不管 Promise 最后状态如何，都会执行的操作，finally方法的回调函数不接受任何参数
- `then()`方法可以有多个，按照先后顺序执行，通过回调函数返回值传递数据给下一个 then

```js
p
  .then((value) => { }) // onfullfilled 执行
  .catch((err) => {}) // onrejected 执行

// ----------- 或者 -----------
// then 中传两个参数：第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数
p.then(
  // onfullfilled 执行
  (value) => { },
  // onrejected 执行
  (err) => { }
)
```

## all 和 race

[MDN-Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
[MDN-Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功1')
  },500)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功2')
  },1500)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败')
  }, 1000)
})

// 等待 p1，p2 请求完成
Promise.all([p1, p2]).then(res => {
  console.log(res) // ['成功1', '成功2']
})

// 等待所有请求完成，只要有一个请求被 reject，就会进入 catch 回调
Promise.all([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(error => {
  console.log(error) // '失败'
})

// 始终返回最快的那一个异步，不管resolve还是reject
Promise.race([p1, p2]).then((res) => {
  console.log(res) // '成功1'
}, (error) => {
  console.log(error)
})

Promise.race([p1, p3]).then((res) => {
  console.log(res) // '成功1'
}, (error) => {
  console.log(error)
})

Promise.race([p2, p3]).then((result) => {
  console.log(res)
}, (error) => {
  console.log(error) // '失败'
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

```js
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
  .then((res) => {
    console.log(res)
    return sleep(5000, 'b')
  })
  .then((res) => {
    console.log(res)
    return sleep(3000, 'c')
  })
  .then((res) => {
    console.log(res)
  })

const p1 = Promise.all([sleep(1000, 'a'), sleep(5000, 'b')])
p1.then((res) => {
  console.log(res)
})

const p2 = Promise.race([sleep(1000, 'a'), sleep(5000, 'b')])
p2.then((res) => {
  console.log(res)
})
```

## Promise.try()

实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。

```js
Promise.resolve().then(f)
```

上面的写法有一个缺点，就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。

```js
const f = () => console.log('now')
Promise.resolve().then(f)
console.log('next')
// next
// now
```

用async函数

```js
(async () => f())()
.then(...)
.catch(...)
```

Promise.try方法

```js
const f = () => console.log('now')
Promise.try(f)
console.log('next')
// now
// next
```


## new Promise 和 Promise.resolve()
