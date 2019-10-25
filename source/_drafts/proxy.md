---
title: Proxy 和 Reflect
date: 2019/10/25
categories:
  - ['js']
---

proxy 在目标对象的外层搭建了一层拦截，外界对目标对象的某些操作，必须通过这层拦截

```js
// target 为所要拦截的目标对象，handler 也是一个对象，里面定义的是对拦截对象所要进行的拦截方法
let proxy = new Proxy(target, handler)
```

```js
let target = {
  name: 'zs'
}
let handler = {
  /* 拦截方法 */
  get(target, key, proxy) {
    // target 原对象 key key值 proxy proxy 对象
    console.log(target, key, proxy)
    return target[key]
  },
  set(target, key, value, proxy) {
    // target 原对象 key key值 value 新value值 proxy proxy 对象
    console.log(target, key, value, proxy)
    console.log(Reflect) //
  }
}

let proxy = new Proxy(target, handler)
console.log(proxy.name)
```

proxy 也可以作为其他对象的原型对象使用

```js
let target = {
  name: 'ls'
}

let handler = {
  get(target, name) {
    return 'success'
  }
}

let proxy = new Proxy(target, handler)
let obj = Object.create(proxy)

console.log(obj.name)
//打印结果为  success
```

Proxy 中的拦截方法

```js
// 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时
handler.getPrototypeOf()

// 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时
handler.setPrototypeOf()

// 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时
handler.isExtensible()

// 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时
handler.preventExtensions()

// 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时
handler.getOwnPropertyDescriptor()

// 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时
andler.defineProperty()

// 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时
handler.has(target, key)

// 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时
handler.get()

// 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时
handler.set()

// 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时
handler.deleteProperty()

// 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时
handler.ownKeys()

// 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时
handler.apply()

// 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行 new proxy() 时
handler.construct()
```

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与[处理器对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)的方法相同。Reflect 不是一个函数对象，因此不能将其与一个 new 运算符一起使用，或者将 Reflect 对象作为一个函数来调用。Reflect 的所有属性和方法都是静态的（就像 Math 对象）

1. 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上

2. 修改某些 Object 方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 false

3. 让 Object 操作都变成函数行为
   某些 Object 操作是命令式，比如 `name in obj` 和 `delete obj[name]`，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为

4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为

```js
var proxy = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name)
    return Reflect.get(target, name)
  },
  set(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver)
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value)
    }
    return success
  },
  deleteProperty(target, name) {
    console.log('delete' + name)
    return Reflect.deleteProperty(target, name)
  },
  has(target, name) {
    console.log('has' + name)
    return Reflect.has(target, name)
  }
  // ...
})
```

每一个 Proxy 对象的拦截操作（get、delete、has），内部都调用对应的 Reflect 方法，保证原生行为能够正常执行

Reflect 对象一共有 13 个静态方法
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)上详细使用方法

Reflect.apply(target, thisArg, args)

一般来说，如果要绑定一个函数的 this 对象，可以这样写 fn.apply(obj, args)，但是如果函数定义了自己的 apply 方法，就只能写成 Function.prototype.apply.call(fn, obj, args)

Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

```js
var person = new Proxy(
  {
    name: 'zs',
    age: 13
  },
  {
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value)
      print(receiver)
      console.log('res', res)
      return res
    }
  }
)
function print(target) {
  console.log(target.name, target.age)
}
// print 观察者 person 被观察目标
person.name = 'ls'
```
