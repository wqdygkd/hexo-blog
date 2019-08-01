---
title: addEventListener 以及 vue 中的 .passive 修饰符
date: 2019/07/31
categories:
  - [js]
  - [vue]
---

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

添加事件

```js
// 语法
target.addEventListener(type, listener[, useCapture])
// type: 事件的类型: click mouseover  字符串类型，不带 on
// listener: 函数，每次点击，执行这个函数
// useCapture: 可选，true: 事件在捕获阶段执行，false: 事件在冒泡阶段执行(默认)

target.addEventListener(type, listener[, options])
```

options 可选，可用的选项如下：
capture: Boolean，默认 false，等价于以前的 useCapture 参数
once: Boolean，默认 false，如果是 true，表示 listener 在添加之后最多只调用一次。 listener 也会在其被调用之后自动移除
passive: Boolean，默认 false，设置为 true 时，表示 listener 永远不会调用 preventDefault() 如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

浏览器无法预先知道一个监听器会不会调用 preventDefault()，它能做的只有等监听器执行完后再去执行默认行为，而监听器执行是要耗时的，有些甚至耗时很明显，这样就会导致页面卡顿

`.passive` 修饰符尤其能够提升移动端的性能
[vue .passive 事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

移除事件

removeEventListener

在第三个参数是布尔值的时候，addEventListener("foo", listener, true) 添加的监听器，必须用 removeEventListener("foo", listener, true) 才能删除掉, 因为这个监听器也有可能还注册在了冒泡阶段, 如果第三个参数为 false 则直接通过 removeEventListener("foo", listener) 就可以删除

通过 addEventListener("foo", listener, {capture: true}) 添加的监听器删除时也同样需要添加 {capture: true} 来删除，当然 {capture: true} 换成 true 也可以

通过 addEventListener("foo", listener, {passive: true}) 添加的监听器直接通过 removeEventListener("foo", listener) 就可以删除了
因为一个监听器同时是 passive 和非 passive（以及同时是 once 和非 once）是说不通的，如果你添加了多个，那么后添加的会忽略

removeEventListener("foo", listener, {capture: true}) // {capture: true} 必须加，当然 {capture: true} 换成 true 也可以
