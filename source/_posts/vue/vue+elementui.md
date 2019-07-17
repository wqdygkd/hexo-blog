---
title: Vuex
tags: [vue, element]
categories:
  - [vue]
date: 2019/01/08 18:00:00
updated: 2019/02/19 19:38:00
---

## vue

组件抽离

```vue
// 标签不要动，只需要把内容题出去后，添加 src 引入即可
<template src="./Roles.html"></template>
<script src="./Roles.js"></script>
<style src="./Roles.less" lang="less" scoped></style>
```

scoped

vue 组件之间的样式有自动复用的问题，给一个类设置样式，其他组件中相同类的元素也会被设置样式

解决：在 `style` 标签上添加 `scoped` 字段，设置样式只作用于当前组件

`<style scoped></style>`

作用 1：让当前组件内的样式，只能在当前组件上起效果
作用 2：如果添加了 scoped，样式只会对本来就存在的标签/组件起效果，如果是动态添加的组件/标签，是无效的

动态添加的组件/标签，在 `.vue`文件里添加一个 style 标签，在标签里设置该样式属性，或者在选择器前添加`/deep/`

vm.\$nextTick( [callback\] )：将回调延迟到下次 DOM 更新循环之后执行

如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise：`await this.$nextTick()`

插槽

```vue
<template slot-scope="scope">
  通过 scope.row 获取当前行的数据
</template>
```

```js
// 页面跳转
this.$router.push('/login')
this.$router.push({ name: 'login' })
this.$router.go(-1)
```

## element

`span='1'`：赋值 span 的是一个字符串 '1'

`:span='1'`：前面加一个`:` 意思是动态数据绑定，赋值 span 的是具体数据类型的数据，即数字 1

### 时间日期选择器

日期选择器限制选择范围

```html
<el-date-picker v-model="options.endDate" type="date" :picker-options="endDateOptions"></el-date-picker>
```

```js
endDateOptions: {
  disabledDate: time => {
    // 限制结束时间范围为大于开始时间，并在一周内
    return time.getTime() < this.options.startDate || time.getTime() > this.options.startDate + 24 * 60 * 60 * 1000 * 7
  }
}
```

### Tree 树形控件

- Attributes

show-checkbox：节点是否可被选择

default-expand-all：是否默认展开所有节点

node-key： 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的

- 方法

this.\$refs.tree.setCheckedKeys：通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性

this.\$refs.tree.getCheckedKeys：若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组

### NavMenu 导航菜单

#### Menu Attribute

router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转

background-color：菜单的背景色（仅支持 hex 格式）#ffffff

text-color：菜单的文字颜色（仅支持 hex 格式）

active-text-color：当前激活菜单的文字颜色（仅支持 hex 格式）

default-active：当前激活菜单的 index

unique-opened：是否只保持一个子菜单的展开

### Table 表格

#### Table-column Attributes

- type：设置 `index` 则显示该行的索引（从 1 开始计算）；设置 `expand` 则显示为一个可展开的按钮；

设置了 `selection` 则显示多选框

- 自定义索引 `index`：如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引，属性传入数字时，将作为索引的起始值。传入方法是，它提供当前行的行号（从 `0` 开始）作为参数，返回值将作为索引展示。

`type="index" :index="indexMethod"` `indexMethod(index) {return index}`

### Radio 单选框

#### 基础用法

```
<el-radio v-model="radio" label="1">备选项</el-radio>
<el-radio v-model="radio" label="2">备选项</el-radio>
```

选中意味着变量的值为相应 `label` 属性的值，`label`可以是`String`、`Number`或`Boolean`。

#### 禁用状态

设置`disabled`属性`true`为禁用

#### 单选框组

结合 el-radio-group 元素和子元素 el-radio 可以实现单选组，在 el-radio-group 中绑定 v-model，在 el-radio 中设置好 label 即可，无需再给每一个 el-radio 绑定变量，另外，还提供了 change 事件来响应变化，它会传入一个参数 value

#### Radio Events

change：绑定值变化时触发的事件 选中的 Radio label 值

### Cascader 级联选择器

#### Attributes

options：可选项数据源，键名可通过 `props` 属性配置

props：配置选项，对象

​ value：指定选项的值为选项对象的某个属性值

​ label：指定选项标签为选项对象的某个属性值

​ children：指定选项的子选项为选项对象的某个属性值

### Upload 上传

#### Attribute

- action: 必选参数，上传的完整地址

- multiple: 是否支持多选文件

- :on-preview: 点击文件列表中已上传的文件时的钩子 function(file)

- :on-remove: 文件列表移除文件时的钩子 function(file, fileList)

- list-type: 文件列表的类型

- :before-upload: 对文件校验 function(file)，若返回 false 或者返回 Promise 且被 reject，则停止上传

- :on-success: 文件上传成功时的钩子 function(response, file, fileList)

​ response：参数一， 接口的响应结；file：参数二， 文件对象；fileLIst：参数三，文件对象列表

​ 自定义参数 `:on-success="(res, file, fileList) => UploadImg(1, res, file, fileList)"`

- headers: 设置上传的请求头部 object

- :auto-upload="false"：手动调用`this.$refs.upload.submit()`上传

- on-progress: 文件上传时的钩子 function(event, file, fileList)

### Steps 步骤条

active 设置当前激活步骤 number

设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始

### Tabs 标签页

#### Tabs Attributes

value / v-model 绑定值，选中选项卡的 name string — 第一个选项卡的 name

tab-position 选项卡所在位置 string top/right/bottom/left top

#### Tabs Events

tab-click tab 被选中时触发 被选中的标签 tab 实例

### element 中的 Events 和 Methods

// 假设有个 el-box ,如果看文档,有个 Events 和 Methods
<el-box></el-box>

// Events
close

// Methdos
getData

// 使用
<el-box ref='box' @close='函数名自己写'></el-box>

this.\$refs.box.getData()

### 项目上线

打包 : npm run build
把打好的包放到 http-server 里面

介绍 vendor : 里面放一些第三方包 vue/vue-router/element-ui 包等

#### 优化 :

- 按需加载

- 首屏加载时间，是衡量一个网站性能快慢的很重要的一个指标

- 如何提高加载速度呢?

只加载首屏中看到的内容，没有看到的内容都不加载，需要用到的时候，再去加载
进来减少首屏的请求次数

- vue 项目打包的时候，如何实现按需加载功能 ?

vue 的异步组件(路由) 配合 webpack 代码分割的功能实现按需加载功能

路由懒加载：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html

```javascript
import Home from 'Home.vue'
==>
const Home = () => import('Home.vue')

// 将两个组件打包在一起
const Goods = () => import(/* webpackChunkName: 'goods' */ 'Goods.vue')
const GoodsAdd = () => import(/* webpackChunkName: 'goods' */ 'GoodsAdd.vue')
```

- CDN

在 index.html 引入 CDN 提供的文件

在 webpack.base.conf.js 中配置

```javascript
externals: {
  // 键：表示 导入包语法 from 后面跟着的名称
  // 值：表示 script 引入JS文件时，在全局环境中的变量名称
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'axios',
  'element-ui': 'ELEMENT'
}
```

在 index.html 引入 css 文件就不需要在 main.js 中引入了
