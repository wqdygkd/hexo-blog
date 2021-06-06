---
title: 关于 a 标签 target_blank 使用 rel=noopener
tags: []
id: '798'
categories:
  - 前端
date: 2020-03-06 00:10:51
---

为什么要使用rel='noopener'？

举个例子: a.html 和 b.html 两个页面

a.html
```html
<a href="b.html" target="_blank">da</a>
```

b.html

```html
<script>window.opener.location.href ="http://wqdy.top"</script>
```

其中在 `a.html` 中有个超链接，点击后在新标签页打开 `b.html`页面，但是发现原 `a.html` 页面已经变成了其他页面。原因是使用 `target=_blank` 打开新的窗口时，赋予了新的窗口一些权限可以操作原窗口，其中 `window.location` 就是一个。

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@main/img/20210102203759.png)

为了防止 `window.opener` 被滥用，提高网站的安全性，在使用 `targrt=_blank` 时需要加上 `rel=noopener`，同时为了兼容也可以加上 `rel=noreferrer`。
