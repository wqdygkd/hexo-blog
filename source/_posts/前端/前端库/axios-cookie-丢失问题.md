---
title: 使用 axios 导致 cookie 丢失问题
tags:
  - axios
  - js
id: '402'
categories:
  - 前端
date: 2019-10-11 22:16:07
---

问题：使用 axios 发送请求会拦截响应头中的 set-cookie，导致 cookie 丢失

https://github.com/axios/axios/issues/953

在控制台中也找不到 cookie

```js
console.log(res.headers['set-cookie']) // undefined
console.log(document.cookie) // ''
```

解决方式：修改 axios 配置

```js
axios.defaults.withCredentials = true // 默认是 false

// Axios.interceptors.request.use(
//   config => {
//     config.withCredentials = true // 添加
//     return config
//   })

axios.create({
  withCredentials: true // 表示跨域请求时是否需要使用凭证 默认 false
})
```

设置 `withCredentials = true` 会造成跨域，需要使用代理解决跨域问题
