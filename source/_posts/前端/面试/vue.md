---
title: vue
id: 2047
categories:
  - 前端
date: 2022-03-09
updated: 2022-03-09
---


[diff]()

模板编译
模板渲染过程
路由

## 路由拦截

主要是利用 vue-router 提供的钩子函数 beforeEach() 对路由进行判断 - 导航守卫 - 全局前置守卫

```js
router.beforeEach((to, from, next) => {
  // ...
})
```

- to: Route: 即将要进入的目标

- from: Route: 当前导航正要离开的路由

- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

- next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

- next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

- next(‘/’) 或者 next({ path: ‘/’ }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

## vue 路由传参

`_vue/vue?id=路由参数`

- vue 路由传参方式，说明区别和应用场景

[编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html#%E7%BC%96%E7%A8%8B%E5%BC%8F%E7%9A%84%E5%AF%BC%E8%88%AA)

params 和 query

params 要用 name 来引入，query 要用 path 来引入

query 类似于 ajax 中 get 传参，params 类似于 post

```js
const userId = '123'
// 字符串
router.push('/user') // -> /user

// 对象, path为路由的path属性值
router.push({ path: '/user' }) // -> /user
router.push({ path: `/user/${userId}` }) // -> /user/123

// 命名的路由，name为路由的name属性值
router.push({ name: 'user', params: { userId }}) // -> /user/123
// 如果提供了 path，params 会被忽略
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user

// 带查询参数
router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private

routes: [{ path: '/user/:id?', name='user', component: User }]
```

## 首屏加载优化和算法



## vue-loader

解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理

## Computed和Watch

Computed 有缓存: 基于它们的响应式依赖进行缓存，只有跟计算属性相关的数据发生了改变，计算属性才会重新计算
Watch没有缓存性 deep: true 深度监听，这样便会对对象中的每一项进行监听。优化的话可以使用字符串形式监听

## vue3 新特性

基于 Proxy 的观察者机制
重写虚拟 Dom
更好的支持 ts
新工具 vite

## 做过哪些 webpack 配置

配置 proxy 跨域
配置 externals
配置别名
添加打包分析插件 BundleAnalyzerPlugin

chainWebpack

```js
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

// cdn
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
  ]
}

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')

    // 生产环境配置
    if (isProduction) {
      // 生产环境注入cdn ， 还需要修改index.html
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
  },

  configureWebpack: config => {
    // 配置 externals
    // 键：表示 导入包语法 from 后面跟着的名称
    // 值：表示 script 引入JS文件时，在全局环境中的变量名称
    config.externals = {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios'
    }

    // UglifyJsPlugin
    // 去掉 console.log  drop_console: true,

    // 开启gzip压缩
    // compression-webpack-plugin

  },

  css: {
    // css预设器配置项
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // 引入全局变量样式,@使我们设置的别名,执行src目录
        data: ` @import "@/stylePath/theme.scss"; `
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://yd.msword.top', // 代理的目标服务器地址   用‘/api'代替target里面的地址
        // https请求需要该设置
        secure: false,
        ws: true, // 代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  }
}
```

index.html 修改

```html
  <!-- 使用CDN的CSS文件 -->
  <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style">
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet">
  <% } %>
  <!-- 使用CDN的JS文件 -->
  <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
    <link href="<%= htmlWebpackPlugin.options.cdn.js[i] %>" rel="preload" as="script">
  <% } %>
```

## vue 自定义指令

全局
```js
Vue.directive('color', {
  // 只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次初始化设置；
  bind (el, binding) {
    console.log(binding)
    el.style.background = binding.value
  },
  // 被绑定元素插入父节点时调用；
  inserted () {},
  // 在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值；
  update () {}
})
```

组件内
```js
directives:{
  test:{
    inserted (el, binding) {// 指令的定义
      // el为绑定元素，可以对其进行dom操作
      console.log(binding) //一个对象，包含很多属性属性
    },
    bind (el, binding, vnode) {
      el.innerHTML = binding.value
    }
  }
},
```

## vuex 的五个状态

`state`

`mutations`：提供修改数据的方法

`getters`：可以认为是 store 的计算属性

`actions`：Action 提交的是 mutation，可以包含异步

`modules`：将 store 分割成模块

## vuex 异步

```js
const mutations = {
  addTodo (state, playload) {
    // 操作state
  }
}
const actions = {
  // 异步任务
  // context : 相当于 store
  // playload : 就是传过来的参数
  addTodoAsync (context, playload) {
    setTimeout(() => {
      context.commit('addTodo', playload)
    }, 1000)
  }
}

methods: {
  // 添加任务
  addTodo () {
    // 异步 : 分发 dispatch  => actions
    // dispatch => 找 actions
    this.$store.dispatch('addTodoAsync', {
      todoName: this.todoName
    })
  }
}
```


## Hash 和 History 路由的区别和优缺点？

- hash 路由模式的实现主要是基于下面几个特性：

URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送（hash 值改变，浏览器不会重新发起请求）
hash 值改变，会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 hash 的切换
可以通过 a 标签，或对 loaction.hash 进行赋值，来改变 URL 的 hash 值
可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）

- history 路由模式的实现主要基于存在下面几个特性：

pushState 和 repalceState 两个 API 来操作实现 URL 的变化，且不会重新发起请求
使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）
history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

- hash模式优缺点

优点

只需要前端配置路由表, 不需要后端的参与
兼容性好, 浏览器都能支持
hash值改变不会向后端发送请求, 完全属于前端路由

缺点
hash值前面需要加`#`, 不符合url规范, 也不美观

- history 模式的优缺点：

优点：
符合url地址规范, 不需要`#`, 使用起来比较美观

缺点：
需要服务端配合重定向，否则一刷新页面就404了
兼容性比较差, 利用了 HTML5 History对象中新增的 pushState() 和 replaceState() 方法, 需要浏览器的支持

https://cn.vuejs.org/v2/guide/components-custom-events.html#将原生事件绑定到组件


