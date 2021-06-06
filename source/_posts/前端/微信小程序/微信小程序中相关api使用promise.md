---
title: 微信小程序中相关 api 使用 promise
tags: []
id: '1065'
categories:
  - 前端
date: 2020-03-26 14:43:36
---

微信小程序的 API 都是回调函数，一不小心就是回调地狱。我们可以用 Promise 封装下

```js
const Promisify = f => {
  return (arg = {}) => {
    return new Promise((resolve, reject) => {
      arg.success = res => {
        resolve(res)
      }
      arg.fail = res => {
        reject(res)
      }
      f(arg)
    })
  }
}

// 使用
const Request = Promisify(wx.request)
const Login = Promisify(wx.login)
Login().then(res => {
  if (res.code) {
    Request({ url: 'text.php' }).then(res => {
      console.log(res)
    })
  }
})
```

相关问题

[wx.request 经 Promise 封装后，如何拿到requestTask](https://developers.weixin.qq.com/community/develop/doc/00064cc26bc058a6a848f238351c00)
