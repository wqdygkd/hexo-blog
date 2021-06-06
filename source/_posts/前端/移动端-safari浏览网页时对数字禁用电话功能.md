---
title: 移动端(Safari)浏览网页时对数字禁用电话功能
tags: []
id: '388'
categories:
  - 前端
date: 2019-07-09 22:05:00
---

## 移动端(Safari)浏览网页时对数字禁用电话功能

- 标准的电话号码格式是：

```html
<a href="tel:+86-123-456-7890">1234567890</a>
```

- 有时候不是电话号码的数字会被浏览器自动解析为如上电话号码格式，导致样式和布局改变

- 忽略页面中的数字识别为电话号码, 只要把这个默认行为关闭就行

```html
<meta name="format-detection" content="telephone=no" />
```

- 这个关闭不会影响真正电话号码的识别

说明：Meta 标签中的 format-detection 属性及含义
format-detection 中文的意思是 “格式检测”，它是用来检测 html 里的一些格式的

```html
<!-- 禁止了把数字转化为拨号链接 默认为 yes -->
<meta name="format-detection" content="telephone=no" />
<!-- 禁止作为邮箱地址 默认为 yes -->
<meta name="format-detection" content="email=no" />
<!-- 禁止跳转至地图 默认为 yes -->
<meta name="format-detection" content="adress=no" />
<meta name="format-detection" content="telephone=no,email=no,adress=no" />
```
