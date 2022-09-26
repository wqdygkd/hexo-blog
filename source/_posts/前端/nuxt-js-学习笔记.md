---
title: nuxt.js 学习笔记
tags:
  - nuxt
id: '1782'
categories:
  - 前端
date: 2020-06-21 00:00:26
---

## nuxt

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

官网：https://nuxtjs.org/
中文：https://zh.nuxtjs.org/ https://www.nuxtjs.cn/

## nuxt 渲染流程

在任何 Vue 组件的生命周期内， 只有 beforeCreate 和 created 这两个方法会在 客户端和服务端被调用。其他生命周期函数仅在客户端被调用。
![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102205617.png)

### asyncData 方法

https://zh.nuxtjs.org/api/

用于在渲染组件之前异步获取数据，在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，你可以利用 asyncData 方法来获取数据并返回给当前组件。

注意：由于 asyncData 方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象。
asyncData 只在首屏被执行，其它时候相当于 created 或 mounted 在客户端渲染页面。

### fetch 方法

在 2.12 版本之前：

fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
警告: 您无法在内部使用 this 获取组件实例，fetch 是在组件初始化之前被调用

在 2.12 版本中，fetch 有大更新，fetch(context)已被弃用，可以在 fetch() 中直接使用 this，参考：https://nuxtjs.org/api/pages-fetch

参考 2：https://juejin.im/post/5ecb813751882543184598fe
https://zh.nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/

## context

https://zh.nuxtjs.org/api/context

服务端上下文对象，可以在 `asyncData` `fetch` `plugins` `middlewares` `modules` `store/nuxtServerInit` 等特殊的 Nuxt 生命周期区域中使用

## nuxt 配置

### 配置启动端口

以下两者都可以配置启动端口

第一种

nuxt.config.js :

```js
module.exports = {
  server: {
    port: 8000,
    host: '127.0.0.1'
  }
}
```

第二种

```json
package.json :
"config": {
  "nuxt": {
    "port": "8000",
    "host": "127.0.0.1"
  }
},
```

### 引入 element-ui

```bash
npm i element-ui
```

修改 `nuxt.config.js`

```js
module.exports = {
  plugins: ['@/plugins/element-ui'],
  transpile: [/^element-ui/]
}
```

创建 `plugins/element-ui.js`

```js
import Vue from 'vue'
import Element from 'element-ui'
Vue.use(Element)
```

### 环境变量

https://zh.nuxtjs.org/api/configuration-env

package.json

```json
{
  "scripts": {
    "dev": "nuxt",
    "build:test": "cross-env BASE_URL=testxxx nuxt build",
    "build:production": "cross-env BASE_URL=productionxxx nuxt build"
  }
}
```

nuxt.config.js

```js
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL
  }
}
```

我们可以通过以下两种方式来使用 baseUrl 变量：

通过 `process.env.baseUrl`
通过 `context.env.baseUrl`

### 自定义路由配置

在 Nuxt.js 中，路由是基于文件结构自动生成，无需配置。自动生成的路由配置可在 .nuxt/router.js 中查看。

配置路由以 `.html` 结尾

nuxt.config.js

```js
export default {
  router: {
    middleware: 'router',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'case',
        path: '/case.html',
        component: resolve(__dirname, 'pages/case/_id.vue')
      })
      routes.forEach((element) => {
        let path = element.path
        if (path !== '/' && !path.includes('.html')) {
          path = path + '.html'
          element.path = path
        }
      })
    }
  }
}
```

### axios 配置

使用 Axios，并配置全局拦截器，处理跨域

安装依赖

```bash
 npm install @nuxtjs/axios @nuxtjs/proxy --save
```

```js
// nuxt.config.js
module.exports = {
  modules: ['@nuxtjs/axios'], // 不需要加入@nuxtjs/proxy
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true
  },
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:8080', // 代理地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

组件中使用

```js
<script>
export default {
  asyncData ({ app, $axios }) {
    // app.$axios == $axios
    console.log(app.$axios)
  },
  created () {
    console.log(this.$axios)
  }
}
</script>
```

设置全局拦截器：新建一个/plugins/axios.js

```js
export default function ({ $axios }) {
  const axios = $axios
  // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  axios.onRequest((config) => {})

  // 返回回调
  axios.onResponse((res) => {})

  // 错误回调
  axios.onError((error) => {})
}
```

然后在 plugins 配置它

```js
plugins: [
  {
    src: '@/plugins/axios',
    mode: 'client',
  },
```

### 配置 css 预处理器

安装依赖

```bash
npm i -D less less-loader
```

无需配置，模板内直接使用

```html
<style lang="less" scoped></style>
```

### token 的设置与存储

在前后端分离的项目中，一般都会存放到本地存储中。但 Nuxt.js 不同，由于服务端渲染的特点，部分请求在服务端发起，我们无法获取 localStorage 或 sessionStorage。

可以使用 cookie，并借助 cookie-universal-nuxt 模块（该模块只是帮助我们注入，主要实现依赖 cookie-universal），不管在服务端还是客户端，cookie-universal-nuxt 都为我们提供一致的 api，它内部会帮我们去适配对应的方法。

安装 cookie-universal-nuxt

```bash
npm run cookie-universal-nuxt --save
```

nuxt.config.js :

```js
module.exports = {
  modules: ['cookie-universal-nuxt']
}
```

访问 \$cookies 进行使用：

```js
// 服务端：
// 获取
app.$cookies.get('name')
// 设置
app.$cookies.set('name', 'value')
// 删除
app.$cookies.remove('name')

// 客户端：
// 获取
this.$cookies.get('name')
// 设置
this.$cookies.set('name', 'value')
// 删除
this.$cookies.remove('name')
```

之后需要改造下 axios，让它在请求时带上验证信息：

/plugins/axios.js :

```js
export default function ({ app: { $axios, $cookies } }) {
  $axios.interceptors.request.use((config) => {
    // 头部带上验证信息
    config.headers['X-Token'] = $cookies.get('token') || ''
    return config
  })
  $axios.interceptors.response.use((response) => {
    if (/^[4|5]/.test(response.status)) {
      return Promise.reject(response.statusText)
    }
    return response.data
  })
}
```

### middleware 中间件使用

https://zh.nuxtjs.org/api/pages-middleware

全局配置: 这种中间件使用是注入到全局的每个页面中

nuxt.config.js :

```js
module.exports = {
  router: {
    middleware: ['auth']
  }
}
```

如果你希望中间件只运行于某个页面，可以配置页面的 middleware 选项：

```js
export default {
  middleware: 'auth'
}
```

### 使用 keep-alive

https://github.com/nuxt/nuxt.js/tree/dev/examples/with-keep-alive

layouts/default.vue:

<template>
  <Nuxt keep-alive/>
</template>

直接给 Nuxt 添加 keep-alive 虽然可以实现页面缓存，但是每次页面切换时都会去请求接口

https://juejin.im/post/5cff5f02e51d4510624f97ab

### 分离 css

nuxt.config.js

```js
build: {
extractCSS: true,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
```

### head 配置

```js
meta: [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'author', content: 'cuilongjin' },
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
],
link: [
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/logo.png',
  },
],
script: [
  {
    src: '/moveheader.js', // 引入 js 路径
  },
  {
    innerHTML: 'console.log('1')' // 直接引入 js 代码
  },
],
// 如果使用innerHTML直接引入 js 代码，代码中的引号会被转换为实体字符，导致代码不能正常执行，所以需要配置此项
__dangerouslyDisableSanitizers: ['script'],
```

### 添加百度统计代码

在 plugins 目录下新建 `baidu.js` 文件，内容如下：
注意修改xxxxxxxxxxx编号

```js
/*
 ** 只在生产模式的客户端中使用
 */
if (process.client && process.env.NODE_ENV === 'production') {
  // 百度统计脚本
  var _hmt = _hmt || []
  ;(function () {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?xxxxxxxxxxx'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}

export default ({ app: { router }, store }) => {
  // 每次路由变更时进行pv统计
  if (process.client && process.env.NODE_ENV === 'production') {
    router.afterEach((to, from) => {
      var _hmt = _hmt || []
      ;(function () {
        const hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?xxxxxxxxxxx'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    })
  }
}

```

在 `nuxt-config.js` 中添加

```js
plugins: [
    { src: '~plugins/baidu.js', mode: 'client' },
  ],
```

## 兼容 ie9 ie10


## 其他

[参考 demo](https://github.com/ChanWahFung/nuxt-juejin-project)
[掘金教程](https://juejin.im/post/5ebf5dcf5188256d4266285d)


`window.__NUXT__` 如何去掉

vue 实例中 通过 `this.$nuxt.context` 访问 context

nuxt generate 动态路由配置

nuxt 配置自定义 webpack loader 处理图片 css
