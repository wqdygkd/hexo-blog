---
title: keep-alive 实现页面缓存
categories:
 -[vue]
data: 2019/07/15
---



缓存

- pageAList -> pageADetail -> pageAList，缓存 pageAList，同时如果 pageAList 发生变化需要更新
- 其他页面 -> pageAList，pageAList 不缓存

router 配置

```js
routes: [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/pageAList',
        name: 'pageAList',
        component: pageAList
      },
      {
        path: '/pageADetail',
        name: 'pageADetail',
        component: pageADetail
      }
    }
  ]
```

vuex 配置 store.js

```js
export default new Vuex.Store({
  state: {
    includeComponents: [] // 需要缓存的组件
  },
  mutations: {
    addIncludeComponent(state, includeComponent) {
      // includeComponent 可能是组件 name 字符串或者数组
      let includeComponents = state.includeComponents
      if (Array.isArray(includeComponent)) {
        state.includeComponents = [...new Set([...includeComponents, ...includeComponent])]
      } else {
        state.includeComponents = [...new Set([...includeComponents, includeComponent])]
      }
    },

    removeIncludeComponent(state, includeComponent) {
      let includeComponents = state.includeComponents
      if (Array.isArray(includeComponent)) {
        for (let i = 0; i < includeComponent.length; i++) {
          let index = includeComponents.findIndex(v => v === includeComponent[i])
          if (index > -1) {
            includeComponents.splice(index, 1)
          }
        }
      } else {
        for (let i = 0, len = includeComponents.length; i < len; i++) {
          if (includeComponents[i] === includeComponent) {
            includeComponents.splice(i, 1)
            break
          }
        }
      }
      state.includeComponents = includeComponents
    }
  }
})
```

home.vue

```html
<!-- keep-alive 包裹 router-view -->
<template>
  <keep-alive :include="includeComponents">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    computed: {
      includeComponents() {
        return this.$store.state.includeComponents
      }
    }
  }
</script>
```

pageAList.vue

```js
export default {
  name: 'pageAList',
  beforeRouteLeave(to, from, next) {
    let reg = /pageADetail/
    if (reg.test(to.name)) {
      this.$store.commit('addIncludeComponent', 'pageADetail')
    } else {
      this.$store.commit('removeIncludeComponent', 'pageADetail')
    }
    next()
  },
  activated() {
    this.getList()
  }
}
```

pageADetail.vue

```js
export default {
  name: 'pageADetail',
  beforeRouteLeave(to, from, next) {
    let reg = /pageA/
    if (reg.test(to.name)) {
      this.$store.commit('addIncludeComponent', 'pageAList')
    } else {
      this.$store.commit('removeIncludeComponent', 'pageAList')
    }
    next()
  },
  activated() {
    this.getList()
  }
}
```



总结

- 进入 pageAList，离开当前组件的时候有两种情况：
  - 跳转进去 pageADetail，在 pageAList 的 beforeRouteLeave 钩子里面缓存 pageAList
  - 跳转到非 pageADetail 的页面，在 pageAList 的 beforeRouteLeave 钩子里面清除 pageAList 的缓存

* 从 pageADetail 离开的时候，也有两种情况：
  * 回到 pageAList，在 pageADetail 的 beforeRouteLeave 钩子里面缓存 pageAList，所以从pageAList-pageADetail-pageAList的时候，pageAList 可以被缓存，还是之前的页码状态
  * 进入其他路由，在 pageADetail 的 beforeRouteLeave 钩子里面清除 pageAList 的缓存