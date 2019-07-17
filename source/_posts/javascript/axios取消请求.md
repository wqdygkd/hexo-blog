---
title: axios 取消请求
categories:
  - [js]
date: 2019/07/17
---

原生 js abort() 方法

```js
let A = $.ajax({})
A.abort()
```

Axios 提供了一个 CancelToken 的函数，这是一个构造函数，该函数的作用就是用来取消接口请求的

```js
methods: {
  getMsg () {
    let CancelToken = axios.CancelToken
    let that = this
    axios.get('', {
      cancelToken: new CancelToken(function executor(c) {
        that.cancel = c
        console.log(c)
        // 这个参数 c 就是 CancelToken 构造函数里面自带的取消请求的函数，这里把该函数当参数用
      })
      params: {}
    }).then(res => {
      this.items = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  cancelGetMsg () {
    this.cancel()
  }
}
```
