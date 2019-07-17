---
title: vue-cli 常用配置
categories:
  - [vue]
date: 2019/07/11
updated: 2019/07/12
---

- ## vue-cli webpack 打包后 index.html 引入文件没有引号

解决办法：

vue-cli2：

在 webpack.prod.conf.js 中修改：

```js
plugins: [
  new HtmlWebpackPlugin({
    minify: {
      removeAttributeQuotes: false // 如果该方法没有用那就把整个 minify 去掉
    }
  })
]
```

vue-cli3:

在 vue.config.js 中添加：

```js
chainWebpack: config => {
  config.plugin('html').tap(args => {
    args[0].minify = false
    return args
  })
}
```

- ## svue-cli 打包时删除 console、deugger、注释

vue-cli2：

在 webpack.prod.conf.js 中添加：

```js
plugins: [
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true
      },
      output: {
        comment: false
      }
    }
  })
]
```

vue-cli3：

安装 uglifyjs-webpack-plugin

在 vue.config.js 中添加：

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  configureWebpack: config => {
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        },
        output: {
          comment: false
        }
      },
      parallel: true,
      cache: true
    })
  }
}
```
