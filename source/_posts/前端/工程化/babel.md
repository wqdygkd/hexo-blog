---
title: Babel 入门
tags:
  - Babel
  - Polyfill
id: '2028'
categories:
  - 前端
date: 2021-07-28
---

Babel与Polyfill的关系和区别
Babel 默认只转换新的 js 句法（syntax），而不转换新的 API，例如箭头函数等
Polyfill 用于实现浏览器并不支持的原生API的代码，如新增的方法等

Babel

Babel的安装，配置

创建 `babel.config.js` 文件，内容如下

> babel.config.js 是Babel执行时会默认在当前目录寻找的Babel配置文件，除了babel.config.js，我们也可以选择用.babelrc或.babelrc.js这两种配置文件

```js
module.exports = {
  presets: ["@babel/env"]
}
```

安装如下包

```bash
npm i -D @babel/cli @babel/core @babel/preset-env
```

* @babel/cli是Babel命令行转码工具，如果我们使用命令行进行Babel转码就需要安装它。
* @babel/cli依赖@babel/core，因此也需要安装@babel/core这个Babel核心npm包。
* @babel/preset-env这个npm包提供了ES6转换ES5的语法转换规则，我们在Babel配置文件里指定使用它。如果不使用的话，也可以完成转码，但转码后的代码仍然是ES6的，相当于没有转码。

创建 `index.js` 文件，如下

```js
const fn = (num) => num + 1
new Promise(() => {})
```

执行命令

```bash
npx babel index.js -o output.js
```

输出结果为

```js
"use strict";

var fn = function fn(num) {
  return num + 1;
};

new Promise(() => {});
```

可以看到，ES6的箭头函数语法转换成了 ES5 的函数定义语法，但是并没有对ES6的Promise进行转换。因为Babel默认只转换新的 js 语法（箭头函数，解构...），而不转换新的 API。新的API分类两类，一类是Promise、Map、Symbol、Proxy、Iterator等全局对象及其对象自身的方法，例如Object.assign，Promise.resolve；另一类是新的实例方法，例如数组实例方法[1, 2, 3].find((item) => item < 2)

polyfill

安装
```
npm install --save @babel/polyfill
```

在 index.js 中引入 `import '@babel/polyfill'`

执行命令

```bash
npx babel index.js -o output.js
```

输出结果

```js
"use strict";

require("@babel/polyfill");

var fn = function fn(num) {
  return num + 1;
};

new Promise(function () {});
```

输出结果中 `require("@babel/polyfill");`

import被编译成了require，如果想要编译出来的模块引入规范还是import，则可以在preset-env的配置项中添加"modules": false即可

有时候我们项目里并没有用到那么多的新增API，但是 @babel/polyfill 会把所有浏览器环境的的polyfill都引入，整个包的体积就会很大，我们想要对目标环境按需引入相应的polyfill应该怎么办呢，这个时候我们就可以使用 preset-env 的配置项中的 useBuiltIns 属性来按需引入 polyfill。

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        "modules": false, // 用来设置是否把ES6的模块化语法改成其它模块化语法
        "useBuiltIns": "usage",
      }
    ]
  ]
}
```

使用useBuiltIns:"usage"后，Babel除了会考虑目标环境缺失的API模块，同时考虑我们项目代码里使用到的ES6特性，且不需要在项目入口处手动引入polyfill

```js
import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.promise.js";

var fn = function fn(num) {
  return num + 1;
};

new Promise(function () {});
```

可以看到 多了 `import "core-js/...` 的引用，因为 @babel/polyfil 是由core-js2和regenerator-runtime组成的一个集成包，
Babel 7.4.0 之后已经弃用了 @babel/polyfill，所以core-js官方现在推荐我们使用polyfill的时候直接引入core-js和regenerator-runtime/runtime这两个包完全取代 @babel/polyfil

[core-js](https://github.com/zloirock/core-js#babelpolyfill)
[babel-polyfill](https://www.babeljs.cn/docs/babel-polyfill)
