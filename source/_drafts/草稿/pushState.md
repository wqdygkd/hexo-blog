---
title: pushState
date: 2019/07/12
categories:
---

history.pushState()主要是在不刷新浏览器的情况下，创建新的浏览记录并插入浏览记录队列中

history.pushState(stateObject, title, url)
状态对象（stateObject）--stateObject 是一个 JavaScript 对象，通过 pushState 方法可以将 stateObject 内容传递到新页面中。

标题（title）--几乎没有浏览器支持该参数，但是传一个空字符串会比较安全。

地址（url）--新的历史记录条目的地址（可选，不指定的话则为文档当前 URL）；浏览器在调用 pushState()方法后不会加载该地址；传入的 URL 与当前 URL 应该是同源的，否则，pushState()会抛出异常。
