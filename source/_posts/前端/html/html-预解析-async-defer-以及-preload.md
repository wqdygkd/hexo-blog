---
title: '预解析, async, defer 以及 preload'
tags:
  - js
id: '391'
categories:
  - 前端
date: 2019-10-24 22:07:18
---

### 预解析

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Optimizing_your_pages_for_speculative_parsing

### link 标签 ref 属性值 prefetch preload 用于预加载

```html
<link ref="preload" href="*.js" as="script" />
<!-- preload需要写上正确的as属性,如果不写或错误，等同于XHR请求，优先级非常低 -->
<link rel="preload" href="font.woff" as="font" crossorigin />
<!-- 预加载字体你还必须设置crossorigin 属性 -->
```

- preload 是用于预加载当前页的资源，浏览器会优先加载它们(加载后并不执行，在需要执行的时候再执行)

将加载和执行分离开，可不阻塞渲染和 document 的 onload 事件
提前加载指定资源，不再出现依赖的 font 字体隔了一段时间才刷出

- prefetch 是用于预加载后续页面使用的资源，浏览器也会加载它们，但优先级不高

- 避免混用 preload 和 prefetch，混用的话，并不会复用资源，而是会重复加载

插入的脚本（无论在什么位置）在网络优先级中是很低级

### script 标签的 defer 和 async 异步加载

这两个属性都告诉浏览器，它可以 “在后台” 加载脚本的同时继续解析 HTML，并在脚本加载完之后再执行。这样，脚本下载就不会阻塞 DOM 构建和页面渲染了

defer 和 async 之间的不同是他们开始执行脚本的时机的不同

async(H5) 一旦脚本可用，则会异步执行（仅适用于外部脚本） 脚本在它们完成下载完成后的第一时间执行，如果一个指定 async 的脚本很快就完成了下载，那么它的执行会阻塞 DOM 构建以及所有在之后才完成下载的同步脚本。

defer 规定当页面已完成解析后，执行脚本（仅适用于外部脚本） 脚本会按照它在 HTML 中出现的顺序执行，并且不会阻塞解析。
