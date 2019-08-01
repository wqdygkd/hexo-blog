---
title: icon 图标的使用
date: 2019/08/01
categories:
  - [工具]
---

参考链接：
https://juejin.im/post/59bb864b5188257e7a427c09

iconfont 使用
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

第二步：加入通用 CSS 代码（引入一次就行）：

```html
<style>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
```

第三步：挑选相应图标并获取类名，应用于页面：

```html
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```

symbol 其实使用了 SVG Sprite 技术， 所有的 svg-sprite 都是通过 iconfont 的 iconfont.js 生成的，所以所有图标 icon 都很不直观，完全不知道哪个图标名对应什么图标，每次增删改图标，或者添加一些自定义的 svg 图标，只能将其也上传到 iconfont 和原有的图标放在一个项目库中，之后再重新下载，将整体 js 文件一起替换，而且也做不到按需加载

导出的 svg 包含大量的无用信息，例如编辑器源信息、注释等。通常包含其它一些不会影响渲染结果或可以移除的内容

vue 项目使用 svg-sprite-loader 打包 svg
