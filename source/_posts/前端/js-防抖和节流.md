---
title: 防抖和节流
tags:
  - js
id: '398'
categories:
  - 前端
date: 2018-12-12 22:13:29
---

> 防抖和节流都是为了解决**短时间内大量触发某函数**而导致的**性能问题，**比如触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象

## 防抖（debounce）

在事件被触发 n 秒后再执行回调函数，如果在这 n 秒内又被触发，则重新计时（只会触发最后一次）

应用场景

- 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询 ajax 请求，这样可以有效减少请求次数，节约请求资源

- window 的 resize、scroll 事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次

## 节流（throttle）

规定一个单位时间 n，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内事件被触发多次，只有一次能生效（每 n 秒触发一次）

应用场景

- 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次

- 在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次 ajax 请求，而不是在用户停下滚动页面操作时才去请求数据

- 监听滚动事件，比如是否滑到底部自动加载更多，用 throttle 来判断

## 区别

防抖的作用是将多个连续的`debounced`调用合并为一次`callback`调用。防抖是基于最近次 `debounced` 调用来重置 `waitTime`，如果`debounced`事件触发间隔小于 `waitTime`，`callback`就不会执行；

节流的作用是限制`callback`调用的频率（每`waitTime`调用一次）。是基于上次 `callback` 调用来计算 `waitTime` 的，不管`callback` 事件触发有多频繁，只要距离上次 `callback` 调用超过了 `waitTime`，就一定会进行下次 `callback` 调用。

-- 原理：

防抖是 `debounced` 维护了一个计时器，规定在 `waitTime` 时间后触发 `callback`，但是在 `waitTime` 时间内再次触发 `debounced` 的话，会清除当前的 timer 然后重新计时，这样一来，只有最后一次`debounced` 操作才能触发 `callback`；

节流是通过判断是否到达一定时间 (`waitTime`) 来再次触发 `callback` ， `func` 在 `waitTime` 时间内不能被再次触发。

实现

throttle-debounce 插件 https://www.npmjs.com/package/throttle-debounce

```html
<input id="input" type="text" />
```

```js
input.oninput = throttle(1000, function() {
  console.log(this.value)
})

function b() {
  console.log(this.name)
}
const a = debounce(1000, b)
a.call({ name: 'zs' })

// 节流
function throttle(delay, callback) {
  let timer = null
  let lastExec = 0
  return function() {
    const self = this
    const elapsed = Number(new Date()) - lastExec
    const args = arguments
    function exec() {
      callback.apply(self, args)
      lastExec = Number(new Date())
    }

    clearTimeout(timer)

    if (elapsed > delay) {
      exec()
    } else {
      timer = setTimeout(function() {
        exec()
      }, delay - elapsed)
    }
  }
}

// 防抖
function debounce(delay, callback) {
  let timer = null
  return function() {
    const self = this
    const args = arguments
    function exec() {
      callback.apply(self, args)
      lastExec = Number(new Date())
    }

    clearTimeout(timer)
    timer = setTimeout(function() {
      exec()
    }, delay)
  }
}
```
