---
title: axios
date: 2019-10-11
---

使用 axios 发送请求会拦截响应头中的 set-cookie
导致 cookie 丢失
https://github.com/axios/axios/issues/953
在 控制台中也找不到 cookie

```js
console.log(res.headers['set-cookie']) // undefined
console.log(document.cookie) // ''
```

解决方式：修改 axios 配置

```js
axios.defaults.withCredentials=true   默认是false

Axios.interceptors.request.use(
  config => {
    config.withCredentials = true // 添加
    return config
  })
```

这样会造成跨域，需要使用代理解决跨域问题
