---
title: vue 中 hock 的使用
tags:
  - js
  - vue
id: 2026
categories:
  - web前端
date: 2021-05-13
---

在 Vue 组件中，可以用过 `$on`, `$once` 去监听所有的生命周期钩子函数，如监听组件的 updated 钩子函数可以写成 this.$on('hook:updated', () => {})


### 使用$.once('hook:beforeDestory',() => {})清理定时器

https://cn.vuejs.org/v2/guide/components-edge-cases.html#程序化的事件侦听器

```js
const timer = setInterval(() => {
  console.log('1')
}, 1000)
// 直接在需要定时器的方法或者生命周期函数中声明并销毁
this.$once('hook:beforeDestory', () => {
  clearInterval(timer)
  timer = null
})
```

### 在父组件监听子组件的生命周期方法

```html
<!-- 父组件中 -->
<child-component @hook:mounted="handleChildMounted" />
```

监听第三方组件数据的变化，但是组件又没有提供change事件，可以在外部监听组件的updated钩子函数

```html
<child-component @hook:updated="handleChildUpdated" />
```
