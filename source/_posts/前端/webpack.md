---
title: Webpack
tags:
  - webpack
id: '429'
categories:
  - 前端
date: 2019-01-05 22:33:14
---

- [webpack 官网](https://webpack.js.org/)
- [webpack 中文网](https://webpack.docschina.org/)
- [webpack 配置文件](https://github.com/cuilongjin/webpack-config/)

## 概述

webpack 是一个现代 JavaScript 应用程序的模块打包器（module bundler）

webpack 是一个模块化方案（预编译）

webpack 获取具有依赖关系的模块，并生成表示这些模块的静态资源

webpack 的两个特点：模块化、打包

四个核心概念：**入口(entry)**、**输出(output)**、**加载器(loader)**、**插件(plugins)**

模块化方案：webpack 和 requirejs（通过编写代码的方式将前端的功能，划分成独立的模块）
browserify 是与 webpack 相似的模块化打包工具

### webpack 起源

- webpack 解决了现存模块打包器的两个痛点：
  - Code Spliting - 代码分离
  - 静态资源的模块化处理方案

### webpack 与模块

- [前端模块系统的演进](http://zhaoda.net/webpack-handbook/module-system.html)

- 在 webpack 看来：所有的**静态资源都是模块**

- webpack 模块能够识别以下等形式的模块之间的依赖：

  - ES2015 `import` `export`
  - CommonJS `require()` `module.exports`
  - AMD `define` 和 `require`

  - css/sass/less 文件中的 `@import`
  - 图片连接，比如：样式 `url(...)` 或 HTML `<img src=...>`
  - 字体等

* 在 webpack 提供的模块化环境中
  - 想要加载一个 JS 文件，只需要 require('a.js')
  - 想要加载一个 CSS 文件，只需要 require('css/index.css')
  - 想要加载一个图片文件，只需要 require('images/a.png')

- [入门 Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f#)

### webpack 打包原理：

​ 入口文件： main.js

​ webpack 从入口出发，递归分析项目中所有的依赖项（模块），使用 loader 来处理对应的模块最终，打包生成一个 bundle.js 文件。

​ 如果配置了 webpack 中的 代码分离（Code Spliting），webpack 会根据 分离点 将这个模块生成一个独立的 JS 文件

​ 还可以通过配置，将 CSS 、 图片、 字体 等文件，从 bundle.js 中抽离为独立的文件

## webpack 的基本使用

安装：`npm i -D webpack webpack-cli`

webpack：是 webpack 工具的核心包

webpack-cli：提供了一些在终端中使用的命令

-D(--save-dev)：表示项目开发期间的依赖

webpack 的两种使用方式：命令行、配置文件（`webpack.config.js`）

### 命令行使用说明

- `package.json`中的`scripts`中可以存放一些 bash 命令，这些 bash 命令可以通过 `npm run 命令名称` 来执行
- 注意：npm 在执行 scripts 中的命令的时候，是在电脑系统后台默认开启一个 bash，将当前目录下的`./node_modules/.bin`这个文件夹临时加入了系统环境变量
- 使用方式：`npm run build`
- 设置开发状态： `mode` 如果没有设置 mode 配置项，webpack 会默认提供开发环境(production)
- 在入口文件中可以使用 `import` 引入 js css less 等文件

```json
"scripts": {
  // webpack 是 webpack-cli 提供的命令
  // src/js/main.js 为入口文件
  // --output dist/bundle.js 为出口文件
  // --mode development 生产环境
  "build": "webpack"
  "build1": "webpack src/js/main.js --output dist/bundle.js --mode development"
}
```

### 配置文件方式（推荐）

项目`根目录`下创建一个 `webpack.config.js`文件，运行 `webpack` 命令时的默认配置文件

指定其他文件：`--config webpack.XX.js`

配置 `package.json` 中的 `scripts` , 脚本命令为： `"build": "webpack"`

执行命令 : `npm run build`

示例代码

```js
// webpack 是基于 node的 , 所以配置文件符合 node 方式书写配置
// 注意 : 不要再这个文件中使用ES6的的模块化 import语法
const path = require('path')
module.exports = {
  // 入口
  entry: path.join(__dirname, './src/js/main.js'),

  // 出口
  output: {
    // 出口目录
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  // 开发模式
  mode: 'development'
}
```

## webpack-dev-server

安装：`npm i -D webpack-dev-server`

作用：配合 webpack，创建开发环境（启动服务器、监视文件变化、自动编译、刷新浏览器等），提高开发效率

注意：无法直接在终端中执行 `webpack-dev-server`，需要在 `package.json` 配置 `scripts` 后使用

### 使用说明

- `webpack-dev-server`将打包好的文件存储在内存中，提高编译和加载速度，效率更高（不会生成 dist 目录）
- 在内存中出口目录为项目根目录（命令行中的提示：`webpack output is served from /`）
  - 在`index.html`页面中引入文件不需要加`dist`

### CLI 配置

- `--contentBase` ：告诉服务器在哪个目录中提供服务（可以理解为：打开哪个目录中的 index.html）
  - `--contentBase ./src`：当前目录下的 src 文件夹
- `--open true` ：自动打开浏览器
- `--port 3000` ：指定端口号
- `--hot` ：热更新，只加载修改的文件(按需加载修改的内容)，而非全部加载
- `--progress`：显示进度条

```json
{
  "scripts": {
    "dev": "webpack-dev-server --contentBase src --open --port 8888 --hot"
  }
}
```

### 配置文件配置

配置 `package.json` 中的 `scripts` , 脚本命令为： `"dev": "webpack-dev-server --hot"`

执行命令 : `npm run dev`

```js
// --hot 热更新写在命令行里，不然的话还要配其他插件麻烦
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    // 自动打开浏览器
    open: true,
    // 端口号
    port: 3000,
    // hot: true,

    proxy: {
      '/api': {
        // api 表示当前项目请求的 key
        target: 'http://www.baidu.com', // 代理服务器路径
        pathRewrite: { '^/api': '/api' }, // 重写路径
        changeOrigin: true
      }
    }
    // 请求 localhost:8080/api/.. 会被代理到 http://www.baidu.com/api/..
  }

  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
}
```

## html-webpack-plugin 插件

- 安装：`npm i -D html-webpack-plugin`
- 作用：根据模板，在内存中自动生成 html 页面，并自动引入`bundle.js`、`css`等文件

配置文件配置：

```js
// 引入 html-webpack-plugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 配置插件
  plugins: [
    // html-webpack-plugin 配置
    new HtmlWebpackPlugin({
      // 模板页面路径
      template: path.join(__dirname, 'src/index.html')
    })
  ]
}
```

## 打包非 js 文件

webpack 默认只能处理 js 文件，非 js(css、less、图片、字体等)处理不了，借助 loader 加载器

### 处理 css 文件

在 `main.js`中引入 css 文件 `import '../css/main.css'`

安装 : `npm i -D style-loader css-loader`

在 `webpack.config.js` 中，添加个新的配置项 `module`

在 `module` 中添加 `loader` 来处理 `css`

```js
module.exports = {
  module: {
    rules: [
      // 处理 css
      // 注意点 use 执行loader 顺序 从右往左
      // css-loader: 读取css文件内容，将其转化为一个模块
      // style-loader: 拿到模块, 创建一个style标签，插入页面中
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

### 处理 less 文件

在 `main.js`中引入 less 文件 `import '../css/main.less'`

安装 : `npm i -D less-loader less style-loader css-loader`

在 webpack.config.js 中配置项 `module->rules`中添加 loader 来处理 `less`

```javascript
module.exports = {
  module: {
    rules: [
      //处理 css
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}
```

### 处理图片文件

安装 : `npm i -D url-loader file-loader`

在 webpack.config.js 中配置项 `module->rules`中添加 loader 来处理图片

```javascript
module.exports = {
  module: {
    rules: [
      // 处理图片
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //  图片大小 <= 10000 => 转化为base64
              //  图片大小 >= 10000 => 不会转base64 内部调用 file-loader 加载图片
              limit: 10000
            }
          }
        ]
      }
    ]
  }
}
```

**url-loader** 默认会将图片转化为 base64 编码格式，目的：提高性能

**file-loader** 在处理图片时，会对文件进行重命名

base64 编码格式的图片说明：

- 精灵图：将一些小图片合并为一张图片，减少请求次数，提高性能
- 字体图标：直接将一些小的图片,合并到字体文件中，并且不会失真
- base64：是一种编码格式,能够将图片、文字等常见的文件，转化为 base64 格式，这种字符串格式浏览器能够识别并且读取显示到页面中
- base64 是一个字符串，也可以直接被内嵌到页面中，或者 css 中
- 注意：大图片不适合用 base64 处理，只有小的图标才适合 base64 处理

### 处理字体文件

在 **main.js** 中引入 css 文件 `import '../css/iconfont/iconfont.css'`

在 webpack.config.js 中配置

```js
module.exports = {
  module: {
    rules: [
      // 处理字体图标
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader'
      }
    ]
  }
}
```

### 处理 ES6 语法

1. 现在的项目都是使用 ES6 开发的，但是这些新的 ES6 语法，并不是所有的浏览器都支持，所以就需要有一个工具，帮我们转成 es5 语法，这个就是：babel
2. [babel](https://babeljs.io/)
3. Babel is a JavaScript compiler. ==> babel 是一个 JavaScript 编译器
4. webpack 只能处理 import / export 这个 es6 模块化语法，而其他的 js 新语法，应该使用 babel 来处理

babel 的使用 :

- 安装： `npm i -D babel-core babel-loader@7`
  - babel-core 是 babel 的核心包
  - babel-loader 加载 js 文件，并将 js 代码内容交给 babel-core 解析为 es5 低版本的 js

* 安装：`npm i -D babel-preset-env babel-preset-stage-2`
  - babel-preset-env：表示能够解析 es2015、es2016、es2017、es2018 这些标准的语法
  - babel-preset-stage-2：用来解析还没有被采纳为标准的语法
  - `babel-polyfill与babel-plugin-transform-runtime` 也是做兼容处理的,以前都是用这个，兼容更早的

- 配置 : 在 webpack.config.js 中添加一个 loader

```js
module.exports = {
  module: {
    rules: [
      // 处理 ES6 语法
      {
        test: /\.js$/,
        use: 'babel-loader',
        // 设置忽略 node-modules 文件夹
        exclude: /node-modules/
      }
    ]
  }
}
```

- 在项目根目录中创建 babel 的配置文件，叫：`.babelrc`

```
{
  "presets": [
    "env",
    "stage-2"
  ],

  -----------
  // 暂时不用
  // 如果未来某一天真的用到了polify
  "plugins": [
    "transform-runtime", {
      "helpers": false,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }
  ]
}
```

## 项目打包上线

执行 : `npm run build` 对项目进行打包，生成 dist 文件

模拟本地服务器 : 安装 : `npm i -g http-server`

把 dist 文件里的内容放到服务器里即可，直接运行`http-server`

## webpack 和 gulp 区别

1. Gulp 侧重于前端开发的整个过程的控制管理（像是流水线），我们可以通过给 gulp 配置不通的 task（通过 Gulp 中的 gulp.task() 方法配置，比如启动 server、sass/less 预编译、文件的合并压缩等等）来让 gulp 实现不同的功能，从而构建整个前端开发流程
2. Webpack 也称之为模块打包机 ，由此也可以看出 Webpack 更侧重于模块打包，当然我们可以把开发中的所有资源（图片、js 文件、css 文件等）都可以看成模块，最初 Webpack 本身就是为前端 JS 代码打包而设计的，后来被扩展到其他资源的打包处理。Webpack 是通过 loader（加载器）和 plugins（插件）对资源进行处理的
3. gulp 是构建工具，Webpack 是 js 模块化的解决方案
