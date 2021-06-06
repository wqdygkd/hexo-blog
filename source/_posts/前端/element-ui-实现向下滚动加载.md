---
title: element-ui 实现向下滚动加载
tags: []
id: '1114'
categories:
  - 前端
date: 2020-04-07 13:51:41
---

### 自定义封装 vue 指令，实现 select 下拉框滚动加载

封装 v-loadmore 指令

```js
Vue.directive('loadmore', {
  bind(el, binding) {
    // 获取 element-ui 定义好的 scroll 盒子
    const target = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    target.addEventListener('scroll', function() {
      // scrollHeight 获取元素内容高度(只读)
      // scrollTop 获取或者设置元素的滚动高度
      // clientHeight 读取元素的可见高度(只读)
      const flag = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (flag) {
        binding.value()
      }
    })
  }
})
```

使用

```html
<el-select
  v-loadmore="loadMore">
  <el-option></el-option>
</el-select>

<script>
export default {
  methods: {
    loadMore () {
      if (this.loadingMore == false) {
        this.loadingMore = true
        return
      }
      if (this.currentPage > this.totlaPage) {
        return
      }
      // 获取数据
      this.getData()
    }
  }
}
```

### 使用 vue-infinite-scroll

github 地址：https://github.com/ElemeFE/vue-infinite-scroll

安装

```bash
npm i vue-infinite-scroll
```

使用

```js
// # main.js
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
```

```html
<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  <li v-for="(item, index) in moveRecord" :key="index"></li>
</ul>

<script>
export default {
  methods: {
    loadMore () {
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }
  }
}
```

### element-ui el-scrollbar 组件

https://github.com/ElemeFE/element/blob/dev/packages/scrollbar/src/main.js

```html
<el-scrollbar style="height: 200px">
  <ul>
    <li>zs</li>
    ...
  </ul>
</el-scrollbar>
```

```css
.el-scrollbar__wrap {
  overflow-x: hidden;
}
```
