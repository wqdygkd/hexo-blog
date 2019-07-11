---
title: vue-cli webpack打包后 index.html 引入文件没有引号
data: 2019/07/11
---



解决办法：

vue-cli2：

找到 webpack.prod.conf.js，在webpack.prod.conf.js 找到 minify

把minify中的  removeAttributeQuotes: true 改为 removeAttributeQuotes: false（如果该方法没有用那就把整个minify去掉）

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