---
title: dux 主题自定义代码高亮-使用 highlight.js
tags:
  - wordpress
id: '338'
categories:
  - - wordpress
date: 2019-12-14 12:02:12
---

> dux 主题默认使用 [Google Code Prettify](https://github.com/google/code-prettify) 实现代码高亮

### 下载

在 [highlight 官网](https://highlightjs.org/)下载 js 和 css 文件

可以使用官网提供的 [CDN 链接](https://highlightjs.org/download/)，也可以根据需要定制自己需要的语言

选择自己喜欢的[主题](https://highlightjs.org/static/demo/)，在[这里](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.17.1/build/styles/})进行下载

将 `highlight.main.js` 文件放到主题的 `/js/libs/` 文件夹中

### 编辑主题文件

编辑 `/js/loader.js` 文件，将 `highlight.min.js` 引入

```diff
tbquire.config({
  baseUrl: jsui.uri + '/js',
  urlArgs: 'ver=' + jsui.ver,
  paths: {
    'swiper'        : 'libs/swiper.min',
    'jquery.cookie' : 'libs/jquery.cookie.min',
    'jsrender'      : 'libs/jsrender.min',
    'router'        : 'libs/router.min',
    'lazyload'      : 'libs/lazyload.min',
    'prettyprint'   : 'libs/prettyprint',
+   'highlight'     : 'libs/highlight.min',
    'ias'           : 'libs/ias.min',
    'main'          : 'main',
    'comment'       : 'comment',
    'user'          : 'user'
  }
})
```

编辑 `/js/main.js` 注释掉 prettyprint 部分

```diff
/*
 * prettyprint
 * ====================================================
*/

-$('pre').each(function(){
-    if( !$(this).attr('style') ) $(this).addClass('prettyprint')
-})

-if( $('.prettyprint').length ){
-    tbquire(['prettyprint'], function(prettyprint) {
-        prettyPrint()
-    })
-}

+/*
+ * highlight
+ * ====================================================
+*/
+
+$('pre code').forEach((block) => {
+  tbquire(['highlight'], function() {
+    hljs.highlightBlock(block)
+})
```

此时 highlight 脚本已经生效，接下来就是应用 highlight 样式

### 应用 highlight 样式

你可以选择将下载好的 css 文件打开，将样式拷贝到 /libs/css/main.css 文件中

也可以在 `wordpress后台-外观-自定义-添加额外css` 中为主题定义样式
