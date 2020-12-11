---
title: >-
  vue 项目中使用 axios.all 处理并发请求报 "TypeError: this.$axios.all is not a function"
  异常解决方法
tags:
  - axios
  - vue
id: '384'
categories:
  - - web前端
date: 2019-12-27 18:25:44
---

axios/index.js 部分配置如下

```js
// axios/index.js
import axios from 'axios'
const Axios = axios.create({
  // ...
})
```

原因：

axios 实例没有 all 这个方法，all 是 axios 的静态方法

所以解决方式就是将该方法手动挂载到 Axios 实例上即可


在 `axios/index.js` 添加如下配置

```diff
// axios/index.js
import axios from 'axios'
const Axios = axios.create({
  // ...
})
+ Axios.all = axios.all
+ Axios.spread = axios.spread
```


附 axios 并发多个请求方式：

```js
function request1 () {
  return axios.get('/user/12345')
}

function request2 () {
  return axios.get('/user/12345/permissions')
}

axios.all([request1(), request2()])
  .then(axios.spread((res1, res2) => {
    // 两个请求现在都执行完成
    // acct、perms 分别为两个请求的结果
  }))
```
