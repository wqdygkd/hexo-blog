---
title: Vuex
tags: [vue, vuex]
categories:
  - [vue]
date: 2019/01/08 18:00:00
updated: 2019/02/19 19:38:00
---

# Vuex

## vuex 是什么?

- 状态管理工具
- 状态即数据，状态管理就是管理组件中的 data(数据)
- Vuex 中的状态管理工具采用 `集中式` 统一管理项目中组件之间需要通讯的数据
- 最佳实践：只将组件之间共享的数据放在 vuex 中，而不是将所有的数据都放在 vuex 中，也就是如果数据只是在组件内部使用的，这个数据应该放在组件中，而不要放在 vuex
- vuex 中的数据也是响应式的，如果一个组件中修改了 vuex 中的数据，另外一个使用的 vuex 数据的组件，就会自动更新
- 任何组件中都可以直接获取 vuex
- 前端状态该管理的思想最早是由 react 团队提出来的，就是 Flux(思想以及具体的实现)
- 前端状态管理工具 : Flux / Redux / Mobx / vuex 等等

## 什么时候用?

- 项目体量很小，不需要使用 vuex，如果项目中组件通讯不复杂，也不需要使用 vuex
- 写项目的时候，发现组件通讯多，组件之间的关系复杂，项目已经无法继续开发了，此时就应该使用 vuex

## 基本使用

- 安装 : `npm i vuex`
- 导入 vuex
- 创建 vuex 示例

## vuex 中的概念

### state

- 状态 , 状态即数据
- 状态是由 store 提供的
- 状态也是响应的
- 推荐通过 mutations 中提供的方法去修改数据，因为在严格模式下不允许在 mutation 外部修改 state 下的数据，否则会报错

### mutations

- 作用：提供修改 state 的状态数据的方法
- 只要想改变 state 中的状态数据，就应该在 mutations 中提供一个方法来修改，接受 `state` 作为第一个参数（如果定义在模块中，则为模块的局部状态），`payload` 作为第二个参数（可选）
- 通过 `$store.commit('方法名')` 调用 mutations 中的方法
- 传参数的话，紧挨着方法名后面继续传就可以了，推荐传入一个对象（payload 即可）

```javascript
methods: {
  addTodo () {
    // commit => 找 mutations
    this.$store.commit('addTodo', {
      todoName: this.todoName
    })
  }
}
```

```javascript
mutations: {
  addTodo (state, playload) {
    state.list.push(playload)
  }
}
```

### actions

提供异步修改 state 的状态数据的方法

处理函数总是接受 `context` 作为第一个参数，`payload`作为第二个参数（可选）

通过 `$store.dispatch('方法名')` 调用 actions 中的方法

```javascript
methods: {
  addTodo () {
    // 异步: 分发 dispatch  => actions
    this.$store.dispatch('addTodoAsync', {
      todoName: this.todoName
    })
  }
}
```

```javascript
actions: {
  addTodoAsync (context, playload) {
    setTimeout(() => {
      context.commit('addTodo', playload)
    }, 1000)
  }
}
```

### getters

可以认为是 store 的计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

getter 接受 state 作为其第一个参数，Getter 也可以接受其他 getter 作为第二个参数

```javascript
getters: {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}
```

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：`store.getters.doneTodos`

## vue 和 vuex 的配合使用

1. 实例 vue 和实例 store
2. 一定要把 store 挂在到 vue 上
3. 读取

- 组件读取:`{{ $store.state.count }}`
- js 读取: `this.$store.state.count`
- js 操作: 在 mutations 里放一个方法，在方法里修改
- js 中触发这个方法 `this.​$store.commit('addCount', { num : 8})`
