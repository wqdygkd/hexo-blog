---
title: webpack 打包速度优化
date: 2019-10-16
---

## 关闭 sourceMap

```js
module.exports = {
  css: {
    css.sourceMap: false // 默认 false
  }
}
```

## 关闭 productionSourceMap

```js
module.exports = {
  productionSourceMap: false // 默认 true
}
```

## 使用 webpack-parallel-uglify-plugin

使用 webpack-parallel-uglify-plugin 代替默认的 uglifyjs-webpack-plugin

```js
module.exports = {
  configureWebpack: config => {
    config.plugins = [new parallelUglifyJsPlugin({})]
  }
}
```

## 缓存 loader 的执行结果(cacheDirectory)

## 优化构建时的搜索路径

<!-- ## HappyPack -->

## DLL 动态链接库

打包生成动态链接库
https://www.jianshu.com/p/d580afda233e
https://segmentfault.com/a/1190000011795931

```js
//  新建 webpack.config.dll.js 文件
const path = require('path')
const webpack = require('webpack')
const DllPlugin = require('webpack/lib/DllPlugin')
module.exports = {
  entry: {
    vendor: ['vue', 'vue-router']
  },
  // resolve: {
  //   alias: {
  //     vue: path.resolve(__dirname, './node_modules/vue/dist/vue.min.js'),
  //     'vue-router': path.resolve(__dirname, './node_modules/vue-router/dist/vue-router.min.js')
  //   }
  // },
  output: {
    path: path.resolve(__dirname, 'public/static/lib'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, 'dll', '[name].manifest.json') // 描述生成的manifest文件
    })
  ]
}
```

运行 `webpack -p --progress --config webpack.config.dll.js`

在主配置文件中使用动态链接库文件

```js
// webpack.config.js
const webpack = require('webpack')
configureWebpack: config => {
  config.plugins = [
    // 当我们需要使用动态链接库时 首先 会找到 manifest 文件 得到 name 值记录的全局变量名称 然后找到动态链接库文件进行加载
    new webpack.DllReferencePlugin({
      manifest: require('./dist/vendor.manifest.json')
    })
  ]
}
```
