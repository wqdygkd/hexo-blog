---
title: jquery 中 AJAX 的全局事件
tags:
  - ajax
  - jquery
id: '414'
categories:
  - 前端
date: 2018-10-16 22:24:10
---

## jquery 中 AJAX 的全局事件

> ajax 提供了 6 个全局函数，会被页面中所有的 ajax 请求触发，在不同时间点会触发不同的全局事件。

https://api.jquery.com/category/ajax/global-ajax-event-handlers/

在页面中会有很多的 ajax 请求，但是这些 ajax 请求都有相同的消息机制，比如我们需要在 ajax 请求发送之前弹出了一个提示框，提示"正在读取数据...." 在 ajax 请求成功时显示"获取数据成功...",在 ajax 结束后隐藏提示框。如果不使用全局事件，那么需要在每一个 ajax 的 beforeSend、success、complete 回调函数中都加上相同的代码。

- jquery 的全局事件需要给 `document` 注册（固定写法）

```javascript
$(document).ajaxStart(function() {})
```

- 全局事件的执行时机

1. `ajaxStart`： 在第一个 ajax 请求开始时触发 first start
2. `ajaxSend`： 在一个 ajax 请求开始之前触发（在 beforeSend 回调函数之后）one start
3. `ajaxSuccess`： 在一个 ajax 请求成功之后触发（在 success 回调函数之后触发）one success
4. `ajaxComplete`： 在一个 ajax 请求完成时触发（在 complete 回调函数之后触发） one complete
5. `ajaxError`： 在一个 ajax 请求失败时触发（在 error 回调函数之后触发）
6. `ajaxStop`： 在所有的 ajax 请求完成之后触发 all complete

若`$.ajax()` global 参数设置为 false，则 ajax 全局事件不会被触发，global 参数默认为 true
