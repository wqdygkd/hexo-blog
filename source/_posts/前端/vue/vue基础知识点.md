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

### key属性作用

https://cn.vuejs.org/v2/api/#key
https://cn.vuejs.org/v2/guide/list.html#维护状态

当 Vue.js 用`v-for`正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

没有`key`属性，Vue 无法跟踪每个节点

### nextTick

https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列

### vdom

用js对象描述真实dom结构

1. 数据更新需要手动更新DOM，且DOM API细节比较多，操作复杂，容易出错且代码难以维护
2. 直接DOM对比的话，dom的查找和创建等操作是很耗费资源的，且dom的大部分属性对于diff操作是没有意义的

引入 Virtual DOM 在性能方面的考量仅仅是一方面。更重要的原因是为了解耦 HTML 依赖
将 Virtual DOM作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
同样的，通过 Virtual DOM我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
实现组件的高度抽象化

### native修饰符

在组件的根元素上监听一个原生事件

```
<my-component v-on:click.native="doTheThing"></my-component>
```

可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，并且该修饰符对普通HTML标签是没有任何作用的。

为什么vue组件要设计一个native修饰符

DOM本身具有事件属性，所以原生元素(div, button 等)的所有事件都是DOM事件
vue组件有自己的自定义事件系统，你在component组件上定义事件，vue必须要知道是那种类型的事件好进入相应的处理逻辑，.native 就是区分的标识。

## $set原理

如果在实例创建之后添加新的属性到实例上，它不会触发视图更新

Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性，可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上，或者创建一个包含原对象属性和新属性的对象替换掉原对象

```js
// src/core/observer/index.js
export function set (target, key, val) {
  // 如果 set 函数的第一个参数是 undefined 或 null 或者是原始类型值，那么在非生产环境下会打印警告信息
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target)) ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${target}`)
  }

  // target为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式
    target.splice(key, 1, val)
    return val
  }

  // target为对象, key在target或者target.prototype上
  // 同时必须不能在 Object.prototype 上
  // 直接修改即可, 有兴趣可以看issue: https://github.com/vuejs/vue/issues/6845
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 以上都不成立, 即开始给target创建一个全新的属性
  // 获取Observer实例
  const ob = target.__ob__
  // Vue 实例对象拥有 _isVue 属性, 即不允许给Vue 实例对象添加属性
  // 也不允许Vue.set/$set 函数为根数据对象(vm.$data)添加属性
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // target本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```


## scoped原理

`<style scoped></style>`

Vue的作用域样式实现思路如下：1. 加了scoped，PostCSS给一个组件中的所有dom添加了一个独一无二的动态属性，`<div data-v-实例标识 >`；2. 然后给CSS选择器的最后一个选择器单元增加了属性选择器，假设原选择器为 `.page .title`，则更改后的选择器为 `.page .title[data-v-实例标识]`。这种做法使得样式只作用于当前组件内部dom，可以使得组件之间的样式不互相污染。

如果这时候需要改子组件的样式，但是又不影响其他页面使用这个子组件的样式的时候，我们可以使用深度作用选择器 `>>>、/deep/、::v-deep`

使用深度作用选择器后， postcss会在每一个深度作用选择器前面的一个选择器单元增加一个属性选择器[data-v-实例标识]，假设原选择器为 `.page /deep/.title`，则更改后的选择器为 `.page[data-v-实例标识] .title`

## vue中ref

https://cn.vuejs.org/v2/api/#ref

给元素或子组件注册引用信息，引用信息将会注册在父组件的 `$refs`对象上；
如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

## Vue中.sync和v-model的区别

1. v-model: @input + value
2. :val.sync: @update:val
3. v-model只能用一次；.sync可以有多个
