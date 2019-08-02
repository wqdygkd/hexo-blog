---
title: icon 图标的使用
date: 2019/08/01
updated: 2019/08/02
categories:
  - [工具]
---

参考链接：
https://juejin.im/post/59bb864b5188257e7a427c09

### 使用 iconfont

阿里开源图库 https://www.iconfont.cn/

下载代码到本地（也可以使用在线链接）打开 demo_index.html 使用说明，有三种使用方式 unicode font-class symbol
unicode 方式： <span class="iconfont">&#x33;</span> 这样，不直观，语意不明确，不支持多色图标
font-class 方式： <span class="iconfont icon-xxx"></span> 使用 class 定义，有语意，需要注意命名空间的问题，也是不支持多色图标
symbol 方式：使用 svg 不用再去请求 woff|eot|ttf| 这些字体库，且缩放不会失真，支持更加复杂的图标

symbol 方式使用步骤：

第一步：引入项目下面生成的 symbol 代码：

```html
<script src="./iconfont.js"></script>
```

或通过 import 导入

```js
import './iconfont.js'
```

第二步：加入通用 CSS 代码：

```css
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

第三步：挑选相应图标并获取类名，应用于页面：

```html
<svg class="icon" aria-hidden="true"><use xlink:href="#icon-xxx"></use></svg>
```

symbol 其实使用了 SVG Sprite 技术， 所有的 svg-sprite 都是通过 iconfont 的 iconfont.js 生成的，所以：

所有图标 icon 都很不直观，完全不知道哪个图标名对应什么图标，每次增删改图标，或者添加一些自定义的 svg 图标，只能将其也上传到 iconfont 和原有的图标放在一个项目库中，之后再重新下载，将整体 js 文件一起替换，而且也做不到按需加载

导出的 svg 包含大量的无用信息，例如编辑器源信息、注释等。通常包含其它一些不会影响渲染结果或可以移除的内容

### vue cli3 项目使用 svg-sprite-loader 打包 svg

vue cli3 默认使用 file-loader 处理 svg：

```js
/* config.module.rule('svg') */
{
  test: /\.(svg)(\?.*)?$/,
  use: [
    /* config.module.rule('svg').use('file-loader') */
    {
      loader: 'file-loader',
      options: {
        name: 'static/img/[name].[hash:8].[ext]'
      }
    }
  ]
}
```

并路径指定为在 img 文件夹下，但我们的 svg 并不在 img 文件夹，而且 svg-sprite-loader 已经自带了 file-loader 的功能，所以，我们可以在我们自定义的 vue.config.js 文件下将 rule(svg) 清除：

```js
module.exports = {
  chainWebpack: config => {
    config.module.rule('svg').uses.clear()
  }
}
```

或者添加忽略，然后加上自定义的 svg rule，最后的配置如下：

```js
/* 使用 svg-sprite-loader 处理 svg */
// 默认规则忽略 src/icons 文件夹
config.module
  .rule('svg')
  .exclude.add(path.resolve(__dirname, 'src/icons'))
  .end()

// src/icons 文件夹下的 svg 使用 svg-sprite-loader
config.module
  .rule('svg-sprite-loader')
  .test(/\.svg$/)
  .use('svg-sprite')
  .loader('svg-sprite-loader')
  .options({
    symbolId: 'icon-[name]'
  })
  .end()
  .include.add(path.resolve(__dirname, 'src/icons'))
  .end()
```

之后可以通过如下方式使用

```js
import '@/icons/qq.svg'
```

```html
<!-- xlink:href="#icon-图标文件名 -->
<svg><use xlink:href="#icon-qq" /></svg>
```

使用缺点：需要手动导入图标

### 自动导入

使用 webpack 的 [require.context](https://webpack.js.org/guides/dependency-management/#require-context) api

require.context 语法

```js
require.context(directory, (useSubdirectories = false), (regExp = /^\.\//))
// directory：说明需要检索的目录
// useSubdirectories：是否检索子目录
// regExp: 匹配文件的正则表达式
// Examples:
require.context('./test', false, /\.test\.js$/)
// 表示在 test 文件夹（不包含子目录）下面的找所有文件名以 .test.js 结尾的能被 require 的文件
```

自动引入 @/icons 下面所有的图标

```js
// 基础组件的自动化全局注册
const requireComponent = require.context('../../components', false)
// console.log(requireComponent.keys())
requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename)
  // console.log(componentConfig)

  const componentName = filename
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  // console.log(componentName)

  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

之后直接将图标放入 `@/icons` 文件夹下就可以直接使用了，删改图标同理

### 优化 svg

删除无用信息 [svgo](https://github.com/svg/svgo)
