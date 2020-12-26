---
title: vue 2.0 和 vue3 响应式数据原理总结对比
tags: []
id: '748'
categories:
  - - web前端
date: 2020-03-04
---

### vue2.0 响应式数据原理

#### 使用 defineProperty

```js
// 重写数组方法，但不能直接修改数组原型上的方法（为了不影响没有被观测的数组）
let oldArrayPrototype = Array.prototype
let proto = Object.create(oldArrayPrototype)

;['push', 'pop', 'shift', 'unshift'].forEach(method => {
  proto[method] = function() {
    // 函数劫持 把函数重写，内部继续调用原来的方法
    updateView()

    oldArrayPrototype[method].call(this, ...arguments)
  }
})

// 定义响应式数据
function defineReactive(target, key, value) {
  observer(value) // 情况二 value 有可能也是对象，需要递归观察

  Object.defineProperty(target, key, {
    get() {
      // 在 get 中收集依赖

      return value
    },

    set(newVal) {
      if (value === newVal) return false

      observer(newVal) // 情况三 重新赋值对象

      updateView()
      value = newVal
    }
  })
}

// 观测数据
function observer(target) {
  if (typeof target !== 'object' || target === null) return target
  // 重新定义属性

  // 拦截数组，重写数组的方法
  if (Array.isArray(target)) {
    // target.__proto__ = proto
    Object.setPrototypeOf(target, proto)
  }

  for (var key in target) {
    defineReactive(target, key, target[key])
  }
}

// 更新视图
function updateView() {
  console.log('更新视图')
}

let obj = {
  a: 1,
  b: {
    c: 3
  }
}
observer(obj)
obj.a = 3

// 情况二
obj.b.c = 10

// 情况三
obj.b = { c: 10 }
obj.b.c = 20

// 情况四 新增属性
obj.d = 30

// 情况五 数组
var obj1 = { a: 1, b: [1, 2, 3] }
observer(obj1)
obj1.b.push(4)
```

**依赖收集**

### vue 3.0 响应式数据原理

**vue 2.0 使用 defineProperty 的问题**

默认会对所有属性递归
defineProperty 无法监听数组的变化
对象新增的属性无法监听
对象不存在的属性无法监听

**vue 3.0 响应式数据原理**

**1.**

```js
function isObject(val) {
  return typeof val === 'object' && val !== null
}

function reactive(target) {
  return createReactiveObject(target)
}

// 创建响应式对象
function createReactiveObject(target) {
  if (!isObject(target)) return target

  let baseHandler = {
    get(target, key, receiver) {
      console.log('获取')

      let result = Reflect.get(target, key, receiver)
      return isObject(result) ? reactive(result) : result // 多层代理通过 get设置，（在需要时递归）
    },
    set(target, key, value, receiver) {
      console.log('设置')

      // target[key] = value // 如果设置没成功，比如对象是不可修改的，无法获得提示
      let result = Reflect.set(target, key, value, receiver)
      return result
    },

    deleteProperty(target, key) {
      console.log('删除')

      let result = Reflect.deleteProperty(target, key)
      return result
    }
  }

  let observed = new Proxy(target, baseHandler)
  return observed
}

// 代理对象
let obj = { name: { a: 'z' } }
let proxy = reactive(obj)
proxy.name.a = 'l' // 多层代理通过 get 设置 (会先触发 proxy.name 的 get)
```

问题：同一个对象可能会被多从代理，代理也可能会被再次代理

```js
proxy = reactive(obj)
proxy = reactive(obj)
proxy = reactive(proxy)
```

**2. 解决被重复代理的问题（需要对原代理对象 obj 和 已代理的对象 proxy 进行屏蔽）**

```js
let toProxy = new WeakMap() // 弱引用映射表  原对象:代理过得对象
let toRaw = new WeakMap() //  代理过得对象:原对象

// 创建响应式对象
function createReactiveObject(target) {
  if (!isObject(target)) return target

  // 如果被代理过，返回已经代理的对象
  let proxy = toProxy.get(target)
  if (proxy) return proxy // 阻止一个对象被多次代理
  if (toRaw.has(target)) return target // 阻止代理已经被代理的对象

  let baseHandler = {
    get(target, key, receiver) {
      console.log('获取')

      // return target{key}
      let result = Reflect.get(target, key, receiver)
      return isObject(result) ? reactive(result) : result // 多层代理通过get设置
    },
    set(target, key, value, receiver) {
      console.log('设置')
      console.log(key, value)
      // target[key] = value // 如果设置没成功，比如对象是不可修改的，无法获得提示
      let result = Reflect.set(target, key, value, receiver)
      return result
    },

    deleteProperty(target, key) {
      console.log('删除')

      let result = Reflect.deleteProperty(target, key)
      return result
    }
  }

  let observed = new Proxy(target, baseHandler)

  // 创建引用表
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}
```

问题：对于数组，会触发两次更新

```js
let arr = [1, 2, 3]
let proxy1 = reactive(arr)
proxy1.push(4)
// 会触发两次设置（一次添加新项4，一次修改数组长度）
// 设置
// 3 4
// 设置
// length 4
```

**3. 屏蔽无效的修改**

```js
let toProxy = new WeakMap() // 弱引用映射表  原对象:代理过得对象
let toRaw = new WeakMap() //  代理过得对象:原对象

function isObject(val) {
  return typeof val === 'object' && val !== null
}

function hasOwn(target, key) {
  return target.hasOwnProperty(key)
}

function reactive(target) {
  return createReactiveObject(target)
}

// 创建响应式对象
function createReactiveObject(target) {
  if (!isObject(target)) return target

  // 如果被代理过，返回已经代理的对象
  let proxy = toProxy.get(target)
  if (proxy) return proxy // 阻止一个对象被多次代理
  if (toRaw.has(target)) return target // 阻止代理已经被代理的对象

  let baseHandler = {
    get(target, key, receiver) {
      console.log('获取')

      // return target{key}
      let result = Reflect.get(target, key, receiver)
      return isObject(result) ? reactive(result) : result // 多层代理通过get设置
    },
    set(target, key, value, receiver) {
      // 判断是新增属性还是修改属性
      let hasKey = hasOwn(target, key)
      let oldValue = target[key]
      if (!hasKey) {
        console.log('新增属性')
      } else if (oldValue !== value) {
        // 屏蔽掉无意义的修改
        console.log('修改属性')
      }

      // target[key] = value // 如果设置没成功，比如对象是不可修改的，无法获得提示
      let result = Reflect.set(target, key, value, receiver)
      return result
    },

    deleteProperty(target, key) {
      console.log('删除')

      let result = Reflect.deleteProperty(target, key)
      return result
    }
  }

  let observed = new Proxy(target, baseHandler)

  // 创建引用表
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}

let arr = [1, 2, 3]
let proxy1 = reactive(arr)
proxy1.push(4)
```

**依赖收集**
