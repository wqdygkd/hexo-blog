---
title: vue 项目只刷新 main 部分，导航栏不刷新
date: 2019/08/19
---

需求：删除一条数据或者新增数据之后需要重新刷新当前页面的需求

如果只是为了数据刷新，直接重新调用获取数据的方法即可

如果不仅仅是重新获取数据整个 main 都想刷新的话，存在如下问题

<span class="blue">用 vue-router 重新路由到当前页面，页面是不进行刷新的</span>

采用 window.reload()，或者 router.go(0) 刷新时，整个浏览器进行了重新加载，闪烁，体验不好

可以使用如下方式解决：

provide / inject

```html
<!-- App.vue -->
<!-- 声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载 -->
<router-view v-if="isReloadAlive"></router-view>
```

```js
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    isReloadAlive: true
  },
  methods: {
    reload() {
      this.isReloadAlive = false
      this.$nextTick(function() {
        this.isReloadAlive = true
      })
    }
  }
}
```

```js
// 使用 reload 方法的页面
export default {
  inject: ['reload'], //  注入 reload  方法
  data() {
    //
  },
  method: {
    dosomething() {
      // 逻辑完成之后，直接调用 this.reload()，即可刷新当前页面
      this.reload()
    }
  }
}
```
