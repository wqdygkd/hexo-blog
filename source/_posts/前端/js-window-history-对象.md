---
title: Window.history 对象
tags:
  - js
id: '383'
categories:
  - - web前端
date: 2019-07-12 13:38:26
---

Window.history 是一个只读属性，提供了操作浏览器会话历史（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口。HTML5 引入了 history.pushState() 和 history.replaceState() 方法，它们分别可以添加和修改历史记录条目。这些方法通常与 window.onpopstate 配合使用。

> 参考
>
> https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
>
> https://developer.mozilla.org/zh-CN/docs/Web/API/Window/history

在 history 中跳转

```js
window.history.back() // 向后跳转 相当于点击浏览器回退按钮
window.history.forward() // 向前跳转 相当于点击了前进按钮
window.history.go(-1) // 跳转 历史中的某一特定页面(go(-1) 等同于调用 back())
```

可以通过查看长度属性的值来确定的历史堆栈中页面的数量

```js
window.history.length
```

```js
history.pushState(stateObject, title, url)
```

状态对象（stateObject）--stateObject 是一个 JavaScript 对象，通过 pushState 方法可以将 stateObject 内容传递到新页面中。

标题（title）--几乎没有浏览器支持该参数，但是传一个空字符串会比较安全。

地址（url）--新的历史记录条目的地址（可选，不指定的话则为文档当前 URL）；浏览器在调用 pushState()方法后不会加载该地址；传入的 URL 与当前 URL 应该是同源的，否则，pushState()会抛出异常。

history.pushState()主要是在不刷新浏览器的情况下，创建新的浏览记录并插入浏览记录队列中

假设在 http://mozilla.org/foo.html 中执行了以下 JavaScript 代码:

```js
let stateObj = {
  foo: 'bar'
}
history.pushState(stateObj, 'page 2', 'bar.html')
```

这将使浏览器地址栏显示为 http://mozilla.org/bar.html，但并不会导致浏览器加载 bar.html ，甚至不会检查 bar.html 是否存在

history.replaceState() 的使用与 history.pushState() 非常相似，区别在于 replaceState() 是修改了当前的历史记录项而不是新建一个
