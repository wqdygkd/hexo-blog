---
title: Vue
tags: vue
categories:
- [vue]
date: 2019/01/08 18:00:00
updated: 2019/03/22 02:35:00
---


# Vue

* [vue 中文网](https://cn.vuejs.org/)

* [github 下载地址](https://github.com/vuejs/vue)

* Vue.js (读音 /vju:/ view)

* 渐进式 JavaScript 框架

  * 渐进式：小型项目使用 vue 就够了，随着页面的复杂程度提高，就要学习 vue-rouer 来管理更多的页面，再随着项目的数据越来越多，管理数据也变得麻烦起来了，就开始使用 vuex 来管理数据

  * 框架 : 一整套的解决方案

## 框架和库的区别

### 库(Library) ，代表 : jquery
- 库就是一系列函数的集合，我们开发人员在使用库的时候，想要完成什么样的功能，就调用库中提供的某个方法

比如：想要添加样式，就调用 jquery 中的 .css() / .addClass()

- 库起到了一个辅助的作用，在使用库的是时候，是由开发人员说了算，也是由开发人员起主导作用

### 框架 (Framework)，代表 : vue

- 在使用框架的时候，是由框架说了算，由框架起到了主导作用

- 框架是一套完整的解决方案，框架中制定了一套规则，使用框架的时候，只需要按照规则把代码放到合适的地方，然后框架会在合适的时机，主动调用开发人员的代码

比如 : 想用vue组件里遍历就得使用 v-for，使用 for 不行

### 主要区别：控制反转

> 也就是 : 谁起到了主导作用

- 使用库的时候：开发人员起主导作用

- 使用框架的时候：框架起到了主导作用

- 从体量上看，框架一般比库大

- 会发现使用框架的时候，会受到很多限制

- [我们所说的前端框架与库的区别？](https://zhuanlan.zhihu.com/p/26078359?group_id=830801800406917120)



## MVC + MVVM

### MVC

1. MVC 是一种软件架构模式，也有人叫做设计模式

2. M : Model 数据模型 (专门用来操作数据，数据的 CRUD)

3. V : View 视图 (对于前端来说就是页面)

4. C : Controller 控制器 (是视图和数据模型沟通的桥梁，用于处理业务逻辑)

### MVVM

> Vue 使用的是 MVVM 模式

- MVVM ===> M / V / VM

- M : model 数据层

- V : view 视图层

- VM : ViewModel 视图模型

- 核心 : M <===> VM <===> V

### MVVM 优势

- MVC 模式将应用程序划为三个部分，实现职责分离

  - 但是，在前端中，经常要通过 js 代码来进行一些逻辑操作，最终还要把这些逻辑操作展示页面中，也需要`频繁的操作DOM`

  - 比如 : ajax 请求、添加、修改、设置样式、动画

- MVVM 的思想通过 `数据双向绑定` 让数据自动的双向同步

  - V (修改视图) --> M

  - M (修改数据) --> V

- 采用的是 : **数据驱动视图**的思想，**数据是核心**。不要再想着怎么操作 DOM，而是想着如何操作数据

### Vue 中的 MVVM

- 注意 : 不推荐直接手动操作 DOM

> 每个人操作 DOM 的方法不一样，会造成性能不一样
> 官网 : 虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例

## Vue 基本使用

1. 安装 : `npm i vue`

2. 导入 : `<script src='./vue.js'></script>`

3. 实例化 vue

```js
const vm = new Vue({
  // 指定 vue 管理的边界，不能是 body 或 html 节点
  el: '#app',
  // 提供视图中需要的数据
  // 视图可以直接使用 data 中的数据
  data: {
    msg: 'xxx'
  }
})
```

### 使用注意点

使用 vm 表示 vue 实例

Vue 构造函数首字母大写

参数是一个对象

id='#app'，其他也可以

边界外无法使用 msg

###  插值表达式

```
1. {{}} : mustache 语法，小胡子语法，插值表达式
2. 作用 : 使用`{{}}` 从`data`中获取数据，并展示在模板中
3. 说明 : `{{}}` 中只能出现 js 表达式
4. `{{}}` 语法不能作用在 HTML 元素的属性上
```



表达式 (有返回值的)：
- 基本的数据类型 `1 'abc' false [] {}`
- 数据类型 和 运算符结合在一起`1+2 arr.join('-') true ? 123 : 321`

语句： `if 语句 for 语句`



## 双向数据绑定

### input + v-model

 v-model 指令：数据双向绑定的指令

* 作用：把 data 中的 num 值 和 input 上的值绑定到一起，一方的值发生了改变，另 一方也会跟着改变
* 注意：v-model 只能用在表单控件上（input checkbox 等）



### Object.defineProperty()

```js
let obj = {}
let temp
// 参数1：要给哪个对象设置属性
// 参数2：给对象设置什么属性
// 参数3：属性的修饰符
Object.defineProperty(obj, 'name', {
  set: function(newVal) {
    console.log('赋值了', newVal)
  },
  get: function() {
    console.log('取值了')
    return temp
  }
})
```



### 数据双向绑定的原理

```html
<div id="app">
  <input id="input" type="text">
</div>
```

```javascript
let obj = {}
let temp
Object.defineProperty(obj, 'name', {
  set: function (newVal) {
    // 设置属性时会触发该函数
    console.log('设置', newVal)
    temp = newVal
    input.value = newVal
  },
  get: function () {
    // 获取属性时会触发该函数
    console.log('获取')
    return temp
  }
})

input.oninput = function () {
  // console.log(this.value)
  obj.name = this.value
  console.log(obj.name)
}
```



### 深入响应式原理

检测变化注意：受现代 JavaScript 的限制 (而且 `Object.observe` 也已经被废弃)，Vue **不能检测到对象属性的添加或删除**。由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的



**Vue 不允许在已经创建的实例上动态添加新的根级响应式属性**，可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上，或者创建一个包含原对象属性和新属性的对象替换掉原对象



### 列表渲染数组更新检测

数组的方法可以触发视图更新：方法如下：

`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`



替换数组

用一个含有相同元素的数组去替换原来的数组并不会导致 Vue 丢弃现有 DOM 并重新渲染整个列表



注意：由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`



解决第一类问题：

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```



解决第二类问题：

```javascript
vm.items.splice(newLength)
```



## 指令学习

### 指令

- 指令：就是一个特殊的标记，起一个辅助作用，使 html 具备原来没有的功能
- vue 中所有的指令都是以 `v-` 开头的，比如 : v-model v-bind v-if v-for 等等



### v-model (常用)

> 说明：用在`表单`元素中，用来实现`数据双向绑定` (input checkbox 等等)
> 作用：将 `数据` 和 `文本框的值` 绑定到一起，任何一方发生改变，都会引起对方的改变
> 注意：v-model 在不同类型的表单元素中作用不同
> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 的初始值而总是将 Vue 实例的数据作为数据来源

```html
<div id="app">
  <!-- 文本输入框 绑定的是值 -->
  <input type="text" v-model="num" />
  <!-- 多选框  绑定的选中状态 -->
  <input type="checkbox" v-model="isChecked" />
</div>
```

```javascript
const vm = new Vue({
  el: '#app',
  data: {
    num: 0,
    isChecked: true
  }
})
```



### v-text 和 v-html

> 说明 : 设置文本内容

v-text :  相当于之前的 innerText

v-html :  相当于之前的 innerHTML，会解析 html 标签，（已经废弃三大括号的插值）

```html
<div id="app">
  <h1 v-text="msg1"></h1>
  <h1 v-html="msg2"></h1>
</div>
```

```javascript
const vm = new Vue({
  el: '#app',
  data: {
    msg1: '<a href="#">haha</a>',
    msg2: '<a href="#">haha</a>'
  }
})
```



### v-bind (常用)

> 说明：动态绑定数据 (单向)
> 出现原因：在 HTML 属性中，无法使用插值表达式

```html
<div id="app">
  <a v-bind:href="href">hahaha</a>
  <!-- v-bind 可以直接省略 -->
  <a :href="href">hahaha</a>
</div>
```

```javascript
// v-bind：
// 说明：动态数据绑定 (单向)，因为html的`属性`不能使用{{}} 来动态的读取数据, 需要使用 v-bind

const vm = new Vue({
  el: '#app',
  data: {
    href: 'https://www.baidu.com'
  }
})
```



#### v-bind 和 v-model 的区别

```html
<!-- v-model 数据双向绑定 -->
<!--场景：表单元素中 -->
<input type="checkbox" v-model="isChecked1">

<!--  v-bind 数据动态绑定 (单向) -->
<!--场景：主要用在属性中 -->
<input type="checkbox" :checked="isChecked2">
```



#### 操作样式

```html
<div id="app">
  <!-- 操作样式 -->
  <!-- 1. 动态添加类，但不符合vue数据是核心的思想 -->
  <h1 :class="cls">hahaha</h1>

  <!-- 2. class值是一个对象 -->
  <!-- 属性名为类名 -->
  <!-- 属性值为布尔值 -->
  <h1 :class="{red: isRed, fz: isFz}">hahaha</h1>

  <!-- 3. style -->
  <h1 :style="{backgroundColor: 'red', fontSize: fz + 'px'}">hahaha</h1>
</div>
```

```javascript
// v-bind :
// 说明 : 动态数据绑定 (单向)，因为html的`属性`不能使用{{}} 来动态的读取数据 , 需要使用 v-bind

const vm = new Vue({
  el: '#app',
  data: {
    href: 'https://www.baidu.com'
  }
})
```



其他操作

```html
<div id="app">
  <div :class="['red', 'fz']">heheheh</div>
  <!-- ===> <div class="red fz"></div> -->

  <!-- 多个样式对象写成数组的形式，如果有相同样式后面会覆盖前面 -->
  <div :class="[{red: true}, 'fz']">hehehe</div>
  <!-- ===> <div class="red fz"></div> -->
</div>
```



### v-on

> 注册事件/绑定事件

1. v-on:click 绑定了一个 click 事件

2. 缩写 : @click='fn'

3. 函数写在 `methods` 里面

```html
<div id="app">
  <button v-on:click="fn">按钮</button>
  <!-- 简写 @ -->
  <button @click="fn1">按钮</button>
  <!-- 传参 -->
  <button @click="fn2(123)">按钮</button>
</div>
```

```javascript
// v-on 注册事件
// v-on:click => 绑定点击事件

const vm = new Vue({
  el: '#app',
  data: {},
  // 事件函数写在 methods 中
  methods: {
    fn () {
      console.log('haha')
    },
    fn1 () {
      console.log('haha')
    },
    fn2 (ref) {
      console.log(ref)
    }
  }
})
```



4. 函数里面的 this 指的就是 vm 实例

```js
this === vm // true
this.msg // 获取数据
this.msg = 'XXX' // 修改数据
```



5. 事件对象 \$event

```html
<!-- 绑定事件对象的时候, 没有添加小括号，此时，直接在方法中，通过参数 e 就可以获取到事件对象 -->
<button @click="fn">按钮</button>

<!-- 如果绑定事件的地方,事件函数有()  @click='fn()' 则需要通过 $event 获取 -->
<button @click="fn1($event, 123)">按钮</button>
```

```javascript
const vm = new Vue({
  el: '#app',
  data: {},
  methods: {
    fn (e) {
      console.log(e)
    },
    fn1 (e, ref) {
      console.log(e)
      console.log(ref)
    }
  }
})
```



### v-for

遍历数据，为数据中的每一项生成一个指令所在的标签

```html
<!-- 1: 最常用 遍历数组 -->
<li v-for="(item, index) in list1">{{ item }} - {{ index }}</li>

<!-- 2: 遍历元素是对象的数组 -->
<li v-for="item in list2">{{ item.name }} - id:{{ item.id }}</li>

<!-- 3: 遍历对象 -->
<!-- item 是 属性值，key 是属性名 -->
<li v-for="(item, key) in obj">{{ item }}-{{key}}</li>

<!-- 4: 生成10个h1 （item是1-10）-->
<h1 v-for="item in 10">我是h1 {{ item }}</h1>
```



### v-if 和 v-show

```html
<h1 v-if='isShow'>我是h1 v-if</h1>
<h1 v-show='isShow'>我是h1 v-show</h1>
```

v-if 和 v-show 的异同点：

* 相同点: 可以切换元素的显示与隐藏

* 不同点: 切换显示和隐藏的实现不同
  * v-if：显示：创建节点；隐藏：删除节点
  * v-show：显示：display:block；隐藏： display:none

* 使用场景 :
  * v-if 因为要不断的创建和删除来切换显示与隐藏，所以性能不高
  * v-if：切换次数不频繁的时候
  * v-show：切换次数频繁的时候



### v-else-if 和 v-else

- v-else：两种情况的

```html
<h1 v-if="num > 40">第一个</h1>
<h1 v-else>第三个</h1>
```

- v-else-if：三种以上情况

```html
<h1 v-if="num >= 40">第一个</h1>
<h1 v-else-if="num >= 30 && num < 40">第二个</h1>
<h1 v-else>第三个</h1>
```



### v-once

作用：告诉 vue 这个标签中的内容只需要解析一次，即便是数据再发送改变，这个标签中的内容也不会被更新

```html
<p>{{ num }}</p>
<p v-once>带 onece 的 {{ num }}</p>
```



### v-pre

作用：告诉 vue 这段节点中没有指令或表达式，不需要解析，从而，提升性能

```html
<p>{{ num }}</p>
<p v-pre>带 v-pre {{ num }}</p>
```



### v-cloak

使用遮盖

- 给要遮盖的元素添加一个 v-cloak 指令：
```html
<h1 v-cloak>{{ msg }}</h1>
```

- 使用属性选择器，添加样式：`[v-cloak] { display: none }`

- vue 会在解析模板后将 v-cloak 指令从页面中移除，移除指令的时候，差值表达式已经变为对应的数据



## 按键修饰符

在监听键盘事件时，我们经常需要检查常见的键值。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符

 Vue 为最常用的按键提供了别名：

```html
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">

<!-- 同上 -->
<input v-on:keyup.enter="submit">

<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

全部的按键别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`



## 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。



## 系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```



### 鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮



## 计算属性

写起来像一个方法，用起来像一个属性

```js
computed: {
  fn () {}
}
```

特点：只有跟计算属性相关的数据发生了改变，计算属性才会重新计算
注意点:

- 计算属性必须返回一个值

- 计算属性只能当属性用，不能当方法用
- 不能和 data 中的属性名重名



## key

当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。它的工作方式类似于一个属性，所以你需要用 `v-bind` 来绑定动态值

建议尽可能在使用 `v-for` 时提供 `key`，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升

* `就地复用`

```html
<!-- 显示组件 -->
<p v-for="(item, index) in list" :key="index">
  {{item.name}} <input type="text" />
</p>
<!-- 数据 -->
data: {list: [{id: 1, name: 'zs'}, {id: 2, name: 'ls'}, {id: 3, name: 'ww'}]
<!-- 演示  -->
vm.list.unshift({id:4, name:'zl'})
```

* 使用 key
  * 如果数组的元素是一个对象，使用对象里固定属性，一般情况下，对象里都有 id
  * 如果数组的元素是一个简单类型，不是一个对象，就可以取索引作为 key



## 异步 DOM 更新

1. Vue 中采用了 `异步DOM更新` 的机制
2. 数据发生改变后，vue 没有立即将数据的改变更新到视图中，而是等到数据不再变化的时候 一次性的将数据的改变更新到视图中


为什么是异步 DOM 更新?

- 性能的考虑
- 因为对于前端来说，修改数据进行 DOM 操作是常有的事情，如果频繁操作 DOM，会严重影响页面的加载性能
- DOM 操作这是前端的性能的瓶颈
- 比如 : for (let i = 1; i < 10000; i++>) 如果同步 就要重新渲染 1000 次

验证异步 DOM 更新：

```js
// 通过dom来获取count的值
// this.$el ==> vue 边界元素
console.log(this.$el.children[0].innerText) // 0
this.count = 100
console.log(this.$el.children[0].innerText) // 0
```

需求：在数据更新后，立即获取到更新后的内容

```js
this.$nextTick(() => {
  // DOM 更新后，会执行 this.$nextTick() 的回调函数，所以能拿到值
  console.log(this.$el.children[0].innerText) // 100
})
```



## 监听 watch

vue 中可以通过 watch 配置项来监听 vue 实例中数据的变化

* 基本使用

```javascript
data: {
  num: 0
},
//  监听
watch: {
  // 监听 num 属性的数据变化
  // 作用: 只要 num 的值发生变化，这个方法就会被调用
  // 第一个参数: 新值
  // 第二个参数: 旧值
  num (newVal, oldVal) {
    console.log('新:', newVal)
    console.log('旧:', oldVal)
  }
}
```



* 监听对象

```js
data: {
  msg: '',
  obj: {
    age: 18
  }
}

watch: {
  // 监听对象
  obj (newVal) {
    // 虽然 obj 中的属性值发生改变了，但 obj 引用的地址没有发生改变，所以不会触发事件
    console.log(newVal)
  },
  // 监听对象的属性
  // 从对象的角度来监听的
  obj: {
    // 深度监听 监听对象里面的属性
    deep: true,

    // 页面刚进入立即触发监听，以表达式的当前值触发回调
    immediate: true,

    // 对象里的属性值发生变化，调用 handler 方法
    handler (newVal) {
      this.msg = `obj.age 值变化了，新值：${newVal.age}`
    }
  },
  // 从属性的角度来监听
  'obj.age' (newVal) {
    this.msg = `obj.age 值变化了，新值：${newVal}`
  }
}
```



* 使用案例：需求 : 监听文本框字符个数，并显示格式验证码

```html
<input type="text" v-model="val"><span v-show='isTrue'>{{ msg }}</span>
```

```javascript
data: {
  val: '',
  msg: '请输入 6-12 位',
  isTrue: false
},
watch: {
  val (newVal) {
    if (/^[0-9a-zA-z]{6,12}$/.test(newVal)) {
      this.isTrue = false
    } else {
      this.isTrue = true
    }
  }
}
```



## 生命周期函数

- 所有的 vue 组件，都是 vue 实例，一个组件对应一个实例，并且接收相同的选项对象（一些根实例特有的选项除外）
- 实例生命周期也叫做：组件生命周期
- 声明周期图：[01](/zh-cn/_vue/Vue实例生命周期图)

### 生命周期介绍

[vue 生命周期钩子函数](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

- 简单说：一个组件（实例）从开始到最后消化所经历的各种状态，就是一个组件的生命周期
- 生命周期钩子函数的定义：从组件被创建，到组件挂在到页面上运行，再到页面关闭组件被销毁，这三个阶段总是伴随着组件的各种事件，这些事件，统称为组件的生命周期函数（简称 : 钩子函数）
- 开发人员可以通过 vue 提供的钩子函数，让我们写的代码参与到 vue 的生命周期里面来，让我们的代码在合适的阶段起到相应的作用

注意：

- vue 在执行过程中会 **自动调用** `生命周期钩子函数`，我们只需要提供这些钩子函数即可
- 钩子函数的名称都是  vue 中规定好的



[vue 实例生命周期 参考 1](https://segmentfault.com/a/1190000008879966)

[vue 实例生命周期 参考 2](https://segmentfault.com/a/1190000008010666)



### 钩子函数 - beforeCreate

- 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
- 此时组件的选项还未挂载，因此无法访问 methods，data，computed 上的方法或数据
- 使用场景 : 几乎不用



### 钩子函数 - created (掌握)

- 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见
- 可以调用 methods 中的方法、改变 data 中的数据，并且修改可以通过 vue 的响应式绑定体现在页面上、获取computed 中的计算属性等
- 使用场景：发送 ajax、本地存储获取数据



### 钩子函数 - beforeMounted()

- 在挂载开始之前被调用（挂载：DOM 渲染）



### 钩子函数 - mounted() (掌握)

- `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。
- 这个周期可以获取 DOM
- 指令的生效在 mounted 周期之前
- 在这个周期内，对 data 的改变可以生效。但是要进下一轮的 DOM 更新，DOM 上的数据才会更新
- 使用场景：发送 ajax、操作 DOM



### 钩子函数 - beforeUpdate()

- 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程

- 此处获取的数据是更新后的数据，但是获取页面中的 DOM 元素是更新之前的

  > 小提示 : 打印 this.\$el ，打开小三角是之后的，是因为打印是有监听的功能，展示的是后面更改之后的



### 钩子函数 - updated()

- 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
- 组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作
- 应该避免在此期间更改状态。如果要相应状态改变，通常最好使用 **计算属性** 或 **watcher** 取而代之



### 钩子函数 - beforeDestroy()

- 实例销毁之前调用。在这一步，实例仍然完全可用。
- 使用场景：实例销毁之前，执行清理任务，比如：清除定时器等

```js
created () {
  this.timerId = setInterval(() => {
    console.log(1111)
  }, 500)
},

 // 如果当组件销毁了,还不清除定时器会出现性能问题
 // 在浏览器中可以尝试销毁 vm.$destroy()
 // 最后销毁
beforeDestroy () {
  clearInterval(this.timerId)
}
```



### 钩子函数 - destroyed()

- Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。



## 使用接口的形式发送数据

### json-server 提供假数据接口

- 作用：根据指定的 JSON 文件，提供假数据接口
- 地址：[json-server](https://github.com/typicode/json-server)
- 使用步骤

```js
1. 全局安装 json-server: `npm i -g json-server`
2. 准备一个json数据
3. 执行：`json-server data.json`

data.json
{
  "todos": [
    {
      "id": 1,
      "name": "张三",
      "age": 20
    }
  ]
}
```

- REST API格式

```js
1. 查询：GET
2. 添加：POST
3. 删除：DELETE
4. 更新：
	PUT：需要将对象里的所有属性提交
  PATCH(打补丁)：只需要提交需要修改的属性
```

- 具体接口
  - 查询全部数据 http://localhost:3000/todos
    查询指定数据 http://localhost:3000/todos/2
  - 添加一个对象 http://localhost:3000/todos
    POST
    id 会自动帮我们添加
  - 更新数据 http://localhost:3000/todos/3
    PUT 或者 PATCH
    PUT 需要提供该对象的所有数据
    PATCH 只需要提供要修改的数据即可
  - 删除数据http://localhost:3000/todos/3
    DELETE
- 可以借助 `postman` 测试接口



### axios 发送请求

- **作用** : 一个专门用来发送 ajax 请求的库,  可以在浏览器或者node.js 中使用
- **使用步骤**
  - 本地安装 axios : `npm i -g axios`
  - 导入 axios
- [axios 使用说明](https://github.com/axios/axios)
- **GTE 方式发送请求**

```js
// 方式1
axios.get('http://localhost:3000/todoList/1')
  .then(res => {
  console.log('获取到数据了：', res.data)
})
// 方式2
axios.get('http://localhost:3000/todoList',{
  params : {
    id : 1
  }
})
  .then(res => {
  console.log('获取到数据了：', res.data)
})
```

- **POST 方式发送请求**

```js
// post 请求
axios
// 第一个参数：表示接口地址
// 第二个参数：表示接口需要的参数
  .post('http://localhost:3000/todoList', {
  	name: 'haha',
  	done: true
}).then(res => {})
```



## 过滤器

**概念 :**

- vue 中的过滤器(filter)：**数据格式化**，让数据按照我们规定的格式输出
- 比如 : 对于日期来说，将日期格式化转化为 `年-月-日 小时:分:秒`

```html
 <!-- 直接显示 -->
 <h1>{{ date }}</h1>
 显示：2019-01-11T10:11:19.566Z
 不是我们想要的
 我们想要的：2019-01-11 18-11-53
```



**全局过滤器 和 局部过滤器**

- 全局方式创建的过滤器，在任何一个 Vue 实例中都可以使用 (一般情况下，为了项目方便管理，都是一个 vue 实例)
- 局部创建的过滤器只能在当前 vue 实例中使用
- 全局过滤器应在 Vue 实例创建之前创建



**注册全局过滤器**

```js
// 第一个参数：过滤器的名字
// 第二个参数：是一个回调函数，只要使用过滤器的时候，这个回调函数就会执行，res => 原始数据
// 必须要有返回值：通过回调函数的返回值得到格式化后的数据
Vue.filter('date', res => {
  return res
})
```



**注册局部过滤器**

在 vm 的配置项里写一个 `filters`，对应的是一个对象

```js
filters: {
  date (res) {
		return res
  }
}
```



**moment 插件**

- [moment](http://momentjs.cn/)

- 使用：`npm i moment`

- 日期 => 指定格式`moment(res).format('YYYY-MM-DD HH-mm-ss')`

- 时间戳 => 指定格式`moment(res).format('YYYY-MM-DD HH-mm-ss')`

- ```js
  Vue.filter('dataFilter', res => {
    return moment(res).format('YYYY-MM-DD HH-mm-ss')
  })
  ```



**使用过滤器**

```html
<!-- data: 原始数据  dataFilter: 过滤器名称  |：管道-->
<h1>{{ date | dataFilter }}</h1>
```

```javascript
// 全局
Vue.filter('dataFilter', res => {
  return moment(res).format('YYYY-MM-DD HH-mm-ss')
})

// 局部
filters: {
  date (res, format = 'YYYY-MM-DD', arg) {
    return moment(res).format(format)
  }
}
```



**参数问题**

```html
<h1>{{ date | dateFilter('YYYY-MM-DD HH-mm-ss', 888) }}</h1>
```

```javascript
Vue.filter('dateFilter', (res, format = 'YYYY-MM-DD', arg) => {
  // res: 原始数据
  // format：dateFilter 中的第一个参数，等号后面为默认值
  // arg: dateFilter 中的第二个参数
  console.log(arg) // 888
  return moment(res).format(format)
})
```



## 组件

> 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常 **可复用** 的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树

![组件化图释](vue/components.png)

- 注册组件的两种方式：全局组件、局部组件
- Vue实例中的配置项（如：methods、filters、watch、computed、directives、生命周期钩子函数）都可以在组件中使用



### 全局组件

- 说明：全局组件在所有的 vue 实例中都可以使用
- 注意：
  - 注册全局组件应放在 vm 实例之前
  - 模板只允许有一个根节点
  - 组件中的 `data` 必须是函数，并且要返回一个对象
  - 组件复用时如果 data 为对象，所有复用的组件的 data 指向同一片内存空间，一个组件被修改了会影响其他组件，这不是我们想要的

```js
// 注册全局组件
Vue.component('hello', {
  template: '<p>A custom component!</p>',
  data () {
    return {
      msg: '注意：组件的data必须是一个函数！！！'
    }
  }
})

// 给组件指定返回值
// 组件名称为 One
const One = Vue.component('hello', {
  template: '<p>A custom component!</p>'
})
// 可以简写为 ==>
const One = {
  template: '<p>A custom component!</p>'
}
```

```html
<!-- 使用：以自定义元素的方式 -->
<div id="example">
  <hello></hello>
</div>

<!-- 渲染结果 -->
<div id="example">
  <p>A custom component!</p>
</div>
```



### 局部组件

- 局部组件是在某一个具体的vue实例（组件）中定义的，只能在当前 vue 实例（组件）中使用

```js
const vm = new Vue({
  el: '#app',

  // 局部组件
  components: {
    // 子组件 com-a
    'com-a': {
      template: `<h1>局部组件：{{ num }}</h1>`,
      data () {
        return {
          num: 10
        }
      }
    }
  }
})
```



### 组件通讯

- 组件是一个独立、封闭的个体
- 也就是说：组件中的数据默认情况下，只能在组件内部使用，无法直接在组件外部使用
- 可以将 vue 实例看做一个组件
- 对于组件之间需要相互使用彼此的情况，应该使用 **组件通讯机制** 来解决
- 组件通讯的三种情况 :
  - 父组件将数据传递给子组件(父 -> 子)
  - 子组件将数据传递给父组件 (子 => 父)
  - 非父子组件(兄弟组件)


#### 父组件到子组件

- 将要传递的数据，通过属性传递给子组件

```html
<child :msg="pmsg"></child>
```

- 子组件通过 `props` 配置项来指定要接收的数据，props 是一个数组
  - 在使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名代替
  - 如果使用字符串模板，那么这个限制就不存在了

```javascript
props: ['msg']
```

- 传递过来的 `props` 属性的用法与 `data` 属性的用法相同
- 子组件不能直接修改父组件传过来的数据，可以将父组件传过来的值保存在一个临时变量中
  - 如果 props 传过来的数据为引用类型，只要不是重新赋值，修改数据不会报错，但不推荐这样做

```html
<!-- 第一步：将你要传递的数据,作为属性传递给子组件 -->
<hello :num="pnum"></hello>
```

```javascript
Vue.component('hello', {
  template: `<div>{{ num }}</div>`,

  // 第二部：子组件通过 props 配置项来指定要接收的数据
  props: ['num']
})
```



#### 子组件到父组件

- 方式：父组件给子组件传递一个函数，由子组件调用这个函数
- 说明：借助 vue 中的自定义事件(v-on:cunstomFn="fn")
- `$emit()`：触发事件
- 第一步：父组件了里准备一个方法

```javascript
const vm = new Vue({
  el: '#app',
  data: {},
  methods: {
    pfn (num) {
      console.log(num)
    }
  }
})
```

- 第二步：把这个方法作为事件传递给子组件

```html
<hello @fn="pfn"></hello>
```

- 第三步：子组件调用父组件传过来的方法

```javascript
Vue.component('hello', {
  template: `<button @click='click'>按钮</button>`,
  data () {
    return {num: 5}
  },
  methods: {
    click () {
      // 第一个参数：表示要触发的自定义事件名称，也就是 @fn
    	// 第二个参数：表示要传递给父组件的数据
      this.$emit('fn', this.num)
    }
  }
})
```



#### 非父子组件通讯

- 是通过 `事件总线 (event bus 公交车) 机制` 来实现的
- 事件总线：实际上就是一个 `空 Vue 实例`
- 可以实现任意两个组件之间的通讯而不管两个组件到底有什么样的层级关系

- `$emit()`：发送数据
- `$on()`：接收数据

```js
// 第一步：实例化事件总线 bus
const bus = new Vue()

// 触发组件 A 中的事件
bus.$emit('id', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id', id => {
  // ...
})
```



示例：组件A ---> 组件B

```html
<div id="app">
  <com-a></com-a>
  <com-b></com-b>
</div>
```

```javascript
// 第一步：实例化事件总线 bus
const bus = new Vue()

// 组件 A
Vue.component('com-a', {
  template: `<h1 @click="click">组件A</h1>`,
  methods: {
    click () {
      // 第二部：发送数据
      bus.$emit('hello', '你好')
    }
  }
})

// 组件 B
Vue.component('com-b', {
  template: `<h1>组件B</h1>`,
  created () {
    // 第三步：接收数据
    bus.$on('hello', res => {
      console.log('接收到数据', res)
    })
  }
})
const vm = new Vue({
  el: '#app',
  data: {}
})
```

[开关灯案例]



### 单向数据流(组件与组件之间)

所有的 prop 都使得其父子 prop 之间形成了一个`单向下行绑定`：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

当 todo-head 中的 todoName 设置数据后回车添加到 todoList，todoList 的长度就会发生变化，然后就会根据(组件与组件之间的)单向数据流，把数据单向下流到子组件中
而且必须是通过 props 往下传递的才可以



## refs

 `vm.$refs` 一个对象，持有已注册过 ref 的所有子组件 ( HTML 元素)



* 使用 :

```html
<!-- 在 HTML元素 中，添加ref属性 -->
<div ref="div">哈哈</div>
<child ref="child"></child>
```

```js
// 在JS中通过 $refs.属性 来获取
// 在 mounted 函数中使用
Vue.component('child', {
  template: `<h1>组件A</h1>`,
  data () {
    return {num: 100}
  },
  methods: {
    fn () {}
  }
})

const vm = new Vue({
  el: '#app',
  data: {},
  mounted () {
    console.log(this.$refs)
    console.log(this.$refs.div) // div 标签
    console.log(this.$refs.child) // child 组件
  }
})
```



* 如果获取的是一个子组件，那么通过 ref 就能获取到子组件中的 `data` 和 `methods`

```js
console.log(this.$refs.child.num) // 100
console.log(this.$refs.child.fn) // fn
```



* 一般在第三方的组件中， 可能会用到这个功能



## 单页面应用程序

SPA : **Single Page Application** 单页面应用程序

MPA : **Multiple Page Application** 多页面应用程序

* 单页 web 应用，就是只有一个 web 页面的应用，是加载单个 HTML 页面，并在用户与应用程序交互时动态更新该页面的 web 应用程序



* 区别
  * 对于传统的多页面应用程序来说，每次请求服务器返回的都是一个完整的页面
  * 对于单页应用程序来说，只有第一次会加载页面，以后的每次请求，仅仅是获取必要的数据，然后由页面中js解析获取的数据展示在页面中



* 优势 :
  * 减少了请求体积，加快页面响应速度，降低了对服务器的压力
  * 更好的用户体验，让用户在 web app 感受 native app 的流畅



## 路由

- **路由** : 是浏览器 URL 中的`哈希值`( # hash) 与 `展示视图内容` 之间的`对应规则`
  - 在 web App 中，通过一个页面来展示和管理整个应用的功能。SPA 往往是功能复杂的应用，为了有效管理所有视图内容，前端路由应运而生。简单来说，路由就是一套映射规则(一对一的对应规则)，由开发人员制定规则。当 URL 中的哈希值( `#` hash) 发生改变后，路由会根据制定好的规则，展示对应的视图内容。
- **vue 中的路由**；是 **hash** 和 **component** 的对应关系，一个哈希值对应一个组件



### 基本使用

安装路由 : `npm i vue-router`

引入路由

```html
<script src="./vue.js"></script>
<script src="./node_modules/vue-router/dist/vue-router.js"></script>
```

详细使用步骤

- 实例路由对象并挂载到 vue 实例 上

```javascript
// 路由实例 与 Vue 实例 关联到一起
const router = new VueRouter()
const vm = new Vue({
  el: '#app',
  router
})
```



- 入口 (#哈希值)

```html
<!--
方式1 : url地址为入口 输入url地址改变哈希值
router.html#/one

方式2 : router-link+to
to 属性：实际上就是哈希值，将来要参与路由规则中进行与组件匹配
router-link 标签最终会转化为 a 标签，to 属性转化为 a 标签的 href 属性
-->
<router-link to="/one">One</router-link>
<router-link to="/two">Tow</router-link>
```



- 注册组件并设置返回值

```javascript
const One = {
  template: `<div>组件 One</div>`
}

const Two = {
  template: `<div>组件 Two</div>`
}
```



- 设置规则

```js
// path : 路由路径
// component : 将来要展示的路由组件
const router = new VueRouter({
  routes: [
    {path: '/one', component: One},
    {path: '/two', component: Two}
  ]
})
```



- 出口

```html
<!--  出口：组件要展示的地方-->
<div id="app">
  <router-view></router-view>
</div>
```



- 示例 ：

```html
<div id="app">
  <!-- 入口 -->
  <!-- 可以直接通过url地址访问路由 -->

  <!-- to 属性：路由匹配路径
router-link 最终会转化为 a 标签
-->
  <router-link to="/one">One</router-link>
  <router-link to="/two">Tow</router-link>

  <!-- 5. 出口 -->
  <router-view></router-view>
</div>
```

```js
// 3. 注册组件并设置返回值
const One = {
  template: `<div>组件 One</div>`
}

const Two = {
  template: `<div>组件 Two</div>`
}

// 1. 实例化路由对象
const router = new VueRouter({
  routes: [
    // 4. 配置路由规则，路由和实例一一对应
    {path: '/one', component: One},
    {path: '/two', component: Two}
  ]
})

const vm = new Vue({
  el: '#app',
  data: {},
  // 2. 将路由挂载到 vue 实例上，让 vue 和路由关联在一起
  router
})
```



多出口情况

```html
<div id="app">
  <!-- 多个出口的形式 -->
  <router-view name="one"></router-view>
  <router-view name="two"></router-view>
</div>
```

```javascript
const One = {
  template: `<div>组件 One</div>`
}

const Two = {
  template: `<div>组件 Two</div>`
}

const router = new VueRouter({
  routes: [
    // 配置路由规则，一个路由对应多个实例
    {
      path: '/',
      // conponents 为一个对象
      components: {
        // key 为出口的 name 属性值
        // value 为组件实例
        one: One,
        two: Two
      }
    }
  ]
})
```







### 入口菜单高亮处理

点击导航会给链接添加两个类名：

```html
<a href="#/one" class="router-link-exact-active router-link-active">One</a>
<a href="#/two" class="">Two</a>
```



修改方式 1：直接修改类的内容

```css
.router-link-exact-active,
.router-link-active {
  color: red;
  font-size: 50px;
}
```



修饰方式 2：给默认高亮类名设置别名，别名为已经定义好样式的类名 (推荐)

```js
const router = new VueRouter({
  routes: [],

  // 修改默认高亮的a标签的类名
  linkActiveClass: 'red'
})
```



### 精确匹配和模糊匹配

- 精确匹配：router-link-exact-active 类名 : 只有当浏览器地址栏中的哈希值 与 router-link 的 to 属性值完全匹配才会添加该类
- 模糊匹配：router-link-active 类名 : 只要浏览器地址栏中的哈希值包含 router-link 的 to 属性值就会添加该类名
- 解决办法：加个 exact

```html
<router-link to="/" exact>
  One
</router-link>
```

- 注意：精确匹配和模糊匹配，只对添加类名这个机制有效，与路由的匹配规则无关



### 路由参数



入口

```html
<!-- 1. 入口  -->
<router-link to="/detail/1">手机1</router-link>
<router-link to="/detail/2">手机2</router-link>
<router-link to="/detail/3">手机3</router-link>
```



传参

[动态路由匹配](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)

```js
const Detail = Vue.component('detail', {
  template: `<div>{{ $route.path }}</div>`
})
routes: [
  // 方式1：手动一个一个配置
  {path: '/detail/1', component: Detail},
  {path: '/detail/2', component: Detail},
  {path: '/detail/3', component: Detail}，

  // 正确的方式：把传过去的 1/2/3 当成参数
  {path: '/detail/:id?', component: Detail}
]
```



`?` 代表参数可传可不传，即可识别的路径包括：`detail`、`detail/1`、`detail2`、`detail3`



获取参数的三种正确方式

```js
// $route => 路由配置对象

const Detail = Vue.component('detail', {
  // 方式1：组件中直接读取
  // $route.path 为路由路径
  // $route.params.id 为路由参数
  template: `
    <div>{{ $route.path }}</div>
    <div>{{ $route.params.id }}</div>
  `,
  created() {
    // 方式2：js直接读取
    // 打印只会打印一次，因为组件是复用的，每次进来钩子函数只会执行一次

    // #/detail/2?name=zs
    console.log(this.$route) // 路由配置对象
    console.log(this.$route.path) // #/detail/2
    console.log(this.$route.params) // {id: "2"}
    console.log(this.$route.query) // {name: 'zs'}
    console.log(this.$route.params.id) // 2
  },
  // 方式3：监听路由的参数变化(因为不是 data 中的数据，不需要深度监听)
  watch: {
    // to：新值
    // from：旧值
    $route(to, from) {
      console.log(to.params.id)
    }
  }
})
```



[编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html#%E7%BC%96%E7%A8%8B%E5%BC%8F%E7%9A%84%E5%AF%BC%E8%88%AA)

```js
const userId = '123'
// 字符串
router.push('/user') // -> /user

// 对象, path为路由的path属性值
router.push({ path: '/user' }) // -> /user
router.push({ path: `/user/${userId}` }) // -> /user/123

// 命名的路由，name 为路由的 name 属性值
router.push({ name: 'user', params: { userId }}) // -> /user/123
// 如果提供了 path，params 会被忽略
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user

// 带查询参数
router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private

routes: [{ path: '/user/:id?', name='user', component: User }]
```



### 重定向

`redirect`

```js
// 将 / 重定向到 /home
{ path: '/', redirect: '/home' }
```



## 单文件组件

### vue 是单文件组件

后缀为 .vue 的文件

单文件组件，无法直接在浏览器中使用，必须经过 webpack 这种打包工具处理后，才能在浏览器中使用

单文件组件的三个组成部分

- template (模板结构)
- script 组件的代码逻辑
- style 样式



### 脚手架介绍

**vue-cli** 是 vue 的脚手架工具

因为 webpack 配置繁琐，阻止一批想用 vue 但是不会 webpack 的开发人员

vue-cli 提供了一条命令，我们直接通过这条命令就可以快速的生成一个 vue 项目 (`vue init XX`)，项目的基本结构、以及 webpack 配置项  **全部配置**  好了



[Vue Loader](https://vue-loader.vuejs.org/zh/) 手动配置置 `webpack`

[Vue CLI3](https://cli.vuejs.org/zh/)

[Vue webpack 配置](https://vuejs-templates.github.io/webpack/)



#### 使用

安装：`npm i -g vue-cli`

初始化 vue 项目：`vue init webpack 项目名称`

进入到项目根目录运行项目：`npm run dev`

项目安装过程：

```js
? Project name demo
? Project description A Vue.js project
? Author
? Vue build standalone  => 运行时+编译
? Install vue-router? Yes
? Use ESLint to lint your code? Yes? Pick an ESLint preset Standard
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
```



#### 项目目录介绍

https://vuejs-templates.github.io/webpack/structure.html

```
.
├── build/                      # webpack config files
├── config/index.js             # main project config
├── src/
│   ├── main.js                 # app entry file
│   ├── App.vue                 # main app component
│   ├── components/             # ui components
│   └── assets/                 # module assets (processed by webpack)
├── static/                     # pure static assets (directly copied)
├── test/
│   └── unit/                   # unit tests
│   └── e2e/                    # e2e tests
├── .babelrc                    # babel config
├── .editorconfig               # settings for your editor
├── .eslintrc.js                # eslint config
├── .eslintignore               # eslint ignore rules
├── .gitignore                  # sensible defaults for gitignore
├── .postcssrc.js               # postcss config
├── index.html                  # index.html template
├── package.json                # build scripts and dependencies
└── README.md                   # Default README file
```



- build 和 config 不要动，都是一些配置好的，还有一些他们之间的约定
- .gitkeep：static 为预留的文件夹，空文件夹默认不会上传到 github，添加这个文件让static文件夹被 git 上传
- `.editorconfig` 编译器配置，需要安装 vscode 插件：Editorconfig

```
charset = utf-8   utf-8 格式编码
indent_style = space   空格和tab都可以缩进
indent_size = 2    缩进为2个
end_of_line = lf  回车换行
insert_final_newline = true   结束最后一行+一个空白
trim_trailing_whitespace = true   开头去除空白
```

- `eslint` 校验
  - 忽略文件中有这个 => /\*.js => 意思是根目录下的.js 文件不校验,,但是发现根目录就没有.js 文件
  - /*  eslint-disable no-new */ eslint 忽略 no-new规则
  - /_ eslint-disable_/ 也可以
  - 如果去掉,就会提示你 不要以 new 开头
  - 可以前面给个变量 var vm = new Vue()
  - 但是又提示没有用,还要打印一下,其实这个赋值是没有意义的
  - 不要去掉.这是 eslint 的`不校验下一行代码`
  - [standard 代码规范](https://standardjs.com/readme-zhcn.html)
- postcssrc 处理 less css 等
- src
  - assets 静态资源
  - components 组件
  - router 路由
  - App.vue 根组件 => 指定路由出口
  - 脚手架之后，所有的组件都将渲染到 app.vue 中
  - vm 中的 #app 还是 index.html 中的 #app， app.vue 中的会覆盖前者
    可以通过分别添加 title 属性验证一下
  - `<router-view/>` 路由出口要写在 app.vue 组件模板中
  - main.js
    - 入口 js 文件
    - 作用：创建 vue 实例，导入其他组件并挂在到 vue 实例上
    - `Vue.config.productionTip = false` 不要打印提示
  - route/index.js：路由
    - `@`：build/ webpack.base.config.js =>  `'@': resolve('src')`
    - 如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装路由功能
    - `https://router.vuejs.org/zh/installation.html`



### 两种编译模式

完整版和运行时版

[参考官网](https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)

编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码

运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切

- 使用 完整版 (包含编译器)

```js
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```



- 只使用运行时

```js
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```



查看编译模式：build => webpack.base.config.js =>  `'vue\$': 'vue/dist/vue.esm.js',`



### 手动配置路由

安装路由 `npm i vue-router`

准备工作：创建一个文件夹 router/router.js

具体配置：



```js
/* router.js */
// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Home from '@/components/home/Home'   (template + script + style)
import Login from '@/components/login/Login'

// 把路由当成插件安装
Vue.use(VueRouter)

// 创建路由，配置路由
const router = new VueRouter({
  // 路由规则
routes: [
  {
    path : '/home',
    component : Home
  },
  {
    path : '/login',
    component : Login
  }
]
})

// 导出路由
export default router

// 在 main.js 中绑定路由
router

在跟组件 App.vue 下配置出口
<router-view></router-view>
```



```javascript
/* main.js */
new Vue({
  // 绑定路由
  router
})
```



```html
<!-- App.vue -->
<!-- 配置出口 -->
<router-view></router-view>
```



### 编辑器配置插件

- `vetur`：vue 单文件组件的高亮
- eslint
  - 关闭 **eslint**：打开 config/index.js，将26行 :  `dev.useEslint`设置为false，重启项目 ( npm run dev)

- `Prettier`：格式化插件





## TODOMVC 案例

### 准备工作

1. [Vue-TodoMVC](http://todomvc.com/examples/vue/)
2. [下载模板地址](https://github.com/tastejs/todomvc-app-template) `git clone https://github.com/tastejs/todomvc-app-template.git`
3. 安装依赖包 : `npm i`
4. 安装 vue : `npm i vue`
5. 开始 https://github.com/cuilongjin/todomvc-app-template/tree/master

### 列表渲染

- 渲染任务列表：`<label>{{ item.name }}</label>`
- 任务完成 : `:class="{ completed : item.done }"`
- 多选框选中状态 : `v-model='item.done'`

### 添加任务

- 获取文本输入框的内容 (关键点)
  - 把 input 通过 v-model 双向数据绑定 == todoName
  - @keyup.enter 触发事件 addTodo => 拿到 todoName 的值
  - 判断文本框不能为空
  - 按回车添加任务
- 对象{done: false, id: , name : todoName}
  - 获取数组里最后一个元素的 id+1
  - 如果数组之前一个元素都没有 , id = 1
- 将对象添加进数组
- 添加完，清除文本框内容



### 删除任务

- 传索引
  `this.todoList.splice(index, 1)`
- 传 id

```js
// 根据 id  找到对应的元素索引
const index = this.todoList.findIndex(item => item.id === id)
// 根据索引删除
this.todoList.splice(index, 1)
```

- 传 id 过滤

```js
// 传过来一个 id, 过滤出来不等于这个 id 的元素，重新赋值给 todoList
this.todoList = this.todoList.filter(item => item.id !== id)
```

### 编辑任务

- 显示`编辑框` ( editing : true) (难点)
  - 在 data 中添加一个 editId : -1
  - 在 :class
    editing: item.id === editId
  - 双击 : 接收过来双击元素的id
    this.editId = id
  - 关键点 :
    vue 中 data 中的数据一旦发生改变，当前页面的指令和表达式都会重新计算

- 读取内容
  `<input class="edit" v-model="item.name">`

- 回车隐藏编辑框



### 底部的显示与隐藏

* v-if/v-show

```js
// 组件部分
<footer class="footer" v-show="isFooter()">
// js
  isFooter() {
    return this.todoList.length > 0
  }
```

* 因为 vue 中 data 的数据发送了改变，当前页面中的指令和表达式都会重新计算，所以只要文本框里的内容发生改变，todoName 也会发送改变，isFooter 会一直被调用，性能不好。我们需要的是数组列表的个数改变才会影响底部的变化，所以需要用到计算属性

* 计算属性

```html
<footer class="footer" v-show="isFooter"></footer>
```

```js
computed: {
  // 计算属性 判断底部是否显示
  // 1. 计算属性只会跟着相关属性的值发生变化而变化
  // 2. 一定要有返回值
  // 3. 一定要写在 computed 里面
  // 4. 写起来像一个方法，用起来像一个属性
  isFooter () {
    return this.todoList.length > 0
  }
}
```



### 数据持久化

- 存储数据
  - 监听 list 数据的改变，只要 list 数据变了，就调用保存数据的方法
  - 使用 vue 的 watch 监听 list 的数据改变
  - 保存值，记得把对象转化为字符串(存的快省空间)

```js
watch: {
  // 监听 todoList
  todoList: {
    deep: true,
    handler (newVal) {
   		localStorage.setItem('todoList', JSON.stringify(newVal))
  	}
  }
}
```



- 获取数据

```js
// 在 data 中可以初始值
// 设置一个默认值 空数组 []
todoList: JSON.parse(localStorage.getItem('todoList')) || []
```



### 使用钩子函数来完善数据存储

```js
created () {
  this.todoList = JSON.parse(localStorage.getItem('todoList')) || []
}
```



### 获取接口数据

[json-server](https://github.com/typicode/json-server) 提供假数据接口

[axios](https://github.com/axios/axios) 发送请求

```bash
npm i -g json-server
npm i axios
json-server data.json
```



### 组件化TODOMVC

https://github.com/cuilongjin/todomvc-app-template/tree/zujianhua