---
title: vue基础知识点复习
id: 2046
categories:
  - 前端
date: 2022-03-09
updated: 2022-03-09
---

### 生命周期介绍

[vue 生命周期钩子函数](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)

beforeCreate：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用；此时组件的选项还未挂载，因此无法访问 methods，data，computed 上的方法或数据；使用场景 : 几乎不用

created：在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见；可以调用 methods 中的方法、改变 data 中的数据、获取 computed 中的计算属性等；使用场景：发送 ajax、本地存储获取数据

beforeMounted()：在挂载开始之前被调用（挂载：DOM 渲染）

mounted()：这个周期可以获取 DOM；指令的生效在 mounted 周期之前；在这个周期内，对 data 的改变可以生效。但是要进下一轮的 DOM 更新；使用场景：发送 ajax、操作 DOM

beforeUpdate()：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程；此处获取的数据是更新后的数据，但是获取页面中的 DOM 元素是更新之前的

updated()：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子；组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作

beforeDestroy()：实例销毁之前调用。在这一步，实例仍然完全可用；使用场景：实例销毁之前，执行清理任务，比如清除定时器等

destroyed()：Vue 实例销毁后调用。调用后，Vue 实例的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

**组件生命周期调用顺序**

组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。
组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted

子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程
父 beforeUpdate -> 父 updated

销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

### 组件通讯

父组件到子组件：通过绑定属性传递给子组件

子组件到父组件：自定义事件，父组件给子组件传递一个函数，由子组件调用（$emit()）这个函数

非父子组件通讯

- 是通过 `事件总线 (event bus 公交车) 机制` 来实现的
- 事件总线：实际上就是一个 `空 Vue 实例`
- 可以实现任意两个组件之间的通讯而不管两个组件到底有什么样的层级关系

- `$emit()`：发送数据
- `$on()`：接收数据

```js
// 实例化事件总线 bus
const bus = new Vue()

// 触发组件 A 中的事件
bus.$emit('id', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id', id => {
  // ...
})
```

### 双向数据绑定

https://cn.vuejs.org/v2/guide/forms.html
https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model

vue 数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的。其实主要是用了 Es5 中的 `Object.defineProperty` 来劫持每个属性的 getter 和 setter。这也正是 Vue 不兼容 IE8 以下的原因。

v-model 原理（语法糖）：v-model是 :value="msg" @input="msg=$event.target.value" 的语法糖

`Object.defineProperty` 不可以用来监听数组

vue 是通过重写数组的方法（变异方法）实现对数组的监听

## key属性作用

官方文档中说：

当 Vue.js 用`v-for`正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

没有`key`属性，Vue 无法跟踪每个节点

