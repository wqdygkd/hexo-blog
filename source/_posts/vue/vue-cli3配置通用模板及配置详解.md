---
title: vue-cli3 配置通用模板及配置详解
categories:
  - [vue]
date: 2019/07/22
---

安装：

```bash
npm install -g @vue/cli
```

创建一个项目：

```bash
vue create my-project
# OR
vue ui
```

如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

### 在现有的项目中安装插件

每个 CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 webpack 核心配置和注入命令的) 运行时插件。当你使用 `vue create` 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，可以使用 `vue add` 命令：

```bash
vue add @vue/eslint
```

提示

`vue add` 的设计意图是为了安装和调用 Vue CLI 插件。对于普通的 npm 包而言，这不意味有一个替代（命令）。对于这些普通的 npm 包，你仍然需要（根据所选的 npm 包）使用包管理器。

## vue.config.js 配置

[官网配置参考](https://cli.vuejs.org/zh/config)

```js
// vue.config.js
module.exports = {
  // 选项...
}
```

### publicPath

基本路径

vue-cli3.3 以下版本使用 baseUrl

vue-cli3.3+ 使用 publicPath

默认 '/'

'./' 或为空('') 所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径, 当使用 pages 选项构建多页面应用时,应当避免使用相对路径

```js
publicPath: './'
```

### outputDir

默认 'dist'

当运行 vue-cli-service build 时生成的生产环境构建文件的目录

```js
outputDir: 'dist'
```

### assetsDir

默认 ''

放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录

```js
assetsDir: 'static'
```

### indexPath

指定生成的 `index.html` 的输出路径 (相对于 `outputDir`)。也可以是一个绝对路径

```js
indexPath: 'index.html'
```

### filenameHashing

默认 true

默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希

### pages

默认 undefined

是否以多页模式构建应用程序

每个 'page' 应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的) 或一个指定其 entry 的字符串

```js
module.export = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/pages/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page'
    },
    pageA: {
      entry: 'src/pages/pageA/main.js',
      template: 'public/index.html',
      filename: 'pageA.html'
    },

    // 当使用只有入口的字符串格式时, 模板会被推导为 `public/pageB.html`
    // 并且如果找不到的话，就回退到 `public/index.html`, 输出文件名会被推导为 `pageB.html`
    pageB: 'src/pages/pageB/main.js'
  }
}
```

### lintOnSave

默认 true

是否在保存的时候检查，如果为 true ，build 时会启用 eslint-loader 进行代码检查，可以使用如下配置禁用

```js
lintOnSave: process.env.NODE_ENV !== 'production'
```

### runtimeCompiler

默认 false

是否使用包含运行时编译器的 Vue 构建版本

使用 template 语法需要开启，但是这会让你的应用额外增加 10kb 左右，使用渲染函数不需要开启

```js
runtimeCompiler: false
```

### productionSourceMap

默认 true

生产环境是否生成 sourceMap 文件，一般情况不建议打开

map 文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。有了 map 就可以像未加密的代码一样，准确的输出是哪一行哪一列有错

```js
productionSourceMap: false
```

### chainWebpack

对内部的 webpack 配置进行更细粒度的修改

```js
const chainWebpack = config => {
  // 删除预加载模块的 prefetch，降低带宽压力
  // https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
  // 移除 prefetch 插件
  config.plugins.delete('prefetch')
  // 移除 preload 插件
  config.plugins.delete('preload')

  // config.plugin('html').tap(args => {
  //   args[0].minify = false
  //   return args
  // })

  /* 配置绝对路径 */
  config.resolve.alias.set('~', path.resolve('public'))

  // 修改静态资源打包方式，下例为超过10k才用文件导入的方式，否则为base64.默认为4k
  config.module
    .rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => Object.assign(options, { limit: 10240 }))
}
module.export = {
  chainWebpack
}
```

https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload

[`<link rel="preload">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)是一种 resource hint，用来指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload。

[`<link rel="prefetch">`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ) 是一种 resource hint，用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。

### configureWebpack

```js
// webpack 自定义配置
// https://cli.vuejs.org/zh/guide/webpack.html
const configureWebpack = config => {
  // 生产 and 测试环境
  let pluginsPro = [
    new CompressionPlugin({
      // 文件开启 Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      threshold: 8192,
      minRatio: 0.8
    }),

    // Webpack 包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
    new BundleAnalyzerPlugin(),

    // 打包时删除 debugger 和 console
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      },
      sourceMap: true,
      parallel: true
    })
  ]
  // 开发环境
  let pluginsDev = [
    //  移动端模拟开发者工具 (https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
    // new vConsolePlugin({
    //   filter: [], // 需要过滤的入口文件
    //   enable: true // 发布代码前记得改回 false
    // })
  ]
  if (process.env.NODE_ENV === 'production') {
    // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    config.plugins = [...config.plugins, ...pluginsPro]
  } else {
    // 为开发环境修改配置...
    config.plugins = [...config.plugins, ...pluginsDev]
  }
}

module.export = {
  configureWebpack
}
```

### 环境变量与分环境打包

[vue-cli-service-build](https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-build)
vue-cli-service build --mode 指定环境模式(默认值：production)

npm run build 默认模式为 production ，命令执行时会把 process.env.NODE_ENV(环境变量) 设置为 'production'
npm run serve 时会把 process.env.NODE_ENV 设置为 'development'

所以可以根据 process.env.NODE_ENV 简单的区分出本地和线上环境

但是线上环境也可能分多种，比如测试环境和预发布环境等

**配置 vue-cli3 区分不同的线上环境**

在项目根目录创建下列文件来制定环境变量

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

`.env.test`

```
/* VUE_APP_CURRENTMODE 当前环境变量 */
VUE_APP_CURRENTMODE = 't' // 表明开发环境模式信息
NODE_ENV = 'development' // 使用开发环境（因为默认开启 devtool，便于调试）
// VUE_APP_BASEURL='' // 测试服务器地址
VUE_APP_ENV = 'test 环境'
```

在 package.json 中添加

```json
"scripts": {
  "test": "vue-cli-service build --mode t",
}

```

修改 baseUrl.js 文件通过环境变量改变 baseUrl

```js
if (process.env.VUE_APP_CURRENTMODE === 't') {
  // 测试环境
  baseUrl = ''
} else {
  // 正式环境
  baseUrl = ''
}
```

当需要为测试环境进行打包的时候 , 只需要运行下面指令进行打包

```bash
npm run test
```

但是将打包环境设置为 NODE_ENV = 'development' 导致打包出来的 js 文件只有 index.js 文件并且在根目录下, 并不是我们想要的

所以我们可以这样配置

.env.test

```
VUE_APP_CURRENTMODE = 't'
NODE_ENV = 'production'
VUE_APP_ENV = 'test 环境'
```

main.js 配置

```js
const isDebugMode = process.env.VUE_APP_CURRENTMODE === 't'
Vue.config.debug = isDebugMode
Vue.config.devtools = isDebugMode
Vue.config.productionTip = isDebugMode
```

### vue 公共路径提取

vue 项目中公共路径在打包之后一旦遇到整体的路径更改就需要再次打包。我们可以将公共路径提取出来，修改公共路径后不需要重新打包就能生效

在 public 文件夹下创建 config.js 文件，并配置

```js
const serverConfig = {
  baseUrl: '' // 配置 url
}
```

在 index.html 中引入该文件，之后在开发时就可以通过 `serverConfig.baseUrl` 使用变量

```bash
vue add router
vue add vuex
```

### 配置 externals

如果我们想引用一个包，但是又不想让 webpack 打包，并且又不影响我们在程序中以 CMD、AMD 或者 window/global 全局等方式进行使用，那就可以通过配置 externals 将包抽离出来。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。

```html
<!-- script 标签引入vue  element-ui -->
<script src="cdn/vue.js"></script>
<script src="cdn/element-ui.js"></script>
```

```js
configureWebpack: config => {
  config.externals = {
    vue: 'Vue', // key 为库名称，value 为库在你项目中使用的关键字
    'element-ui': 'ELEMENT'
  }
}
```

### 修改本地 host 通过域名访问项目

配置 host

```
# host
127.0.0.1 abc.baidu.com
```

```js
devServer: {
  host: 'abc.baidu.com'
}
```

npm run serve 启动服务后可以通过 abc.baidu.com 访问

如果访问不了，可能需要清理 dns 缓存

清空电脑的 DNS 缓存：cmd 运行 ipconfig /flushdns

清理浏览器中的 dns 缓存：浏览器打开 chrome://net-internals/#dns

如果 host 为 127.0.0.1 或 localhost，需要配置 disableHostCheck: true

```js
devServer: {
  host: 'localhost',
  disableHostCheck: true
}
```

新版的 webpack-dev-server 出于安全考虑，默认检查 hostname
disableHostCheck: true 目的是解决通过域名访问时出现 Invalid Host header

经测试 依然会出现 Invalid Host header，导致项目不能正常访问
