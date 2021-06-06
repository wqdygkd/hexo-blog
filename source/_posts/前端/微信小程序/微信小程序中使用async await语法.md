---
title: 微信小程序中使用 async/await 语法
tags: []
id: '1018'
categories:
  - 前端
date: 2020-03-24 15:47:04
---

旧文章害死人

研究了半天，突然发现开发工具在 1.02.1904282 以及之后版本中，增加了[增强编译](https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html#%E5%A2%9E%E5%BC%BA%E7%BC%96%E8%AF%91)已支持 Async/Await 语法

[2019-05-08更新日志](https://developers.weixin.qq.com/miniprogram/dev/devtools/uplog.html#_2019-05-08)第一条

已下内容已过期(文章刚发布一小时)

> 微信小程序中原生支持 async await 语法，前提是需要关闭 ES6 转 ES5 后

在开启 ES6 转 ES5 后 async 函数无法使用，可以使用 [regenerator](https://github.com/facebook/regenerator) 包来解决。新版本的 regenerator 在小程序中无法使用，会报如下错误：
![regenerator](/wp-content/uploads/2020/03/regenerator.png)

原因是 regenerator 包更新了 Function 函数，具体可参考：
https://github.com/facebook/regenerator/pull/369
https://github.com/facebook/regenerator/commit/063f14ef7f01bb29830e3f17e9ef151e7a5cb2f3

可以直接使用老版本来解决这个问题，或者修改源码，把 Function 改回去

直接使用老版本

```bash
npm install regenerator@0.13.1
```

如果使用了 npm 模块，之后在需要使用 async 语法的 js 中直接引入即可

```js
const regeneratorRuntime = require('regenerator-runtime')
```

如果没有使用 npm 模块，不能直接 require 包名，需要将包提取出来，并引入完整路径

```js
const regeneratorRuntime = require('../../libs/regenerator-runtime')
```

参考：[微信小程序中使用 npm 包](https://wqdy.top/1041.html)
