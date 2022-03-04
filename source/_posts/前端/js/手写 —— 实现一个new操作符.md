---
title: 手写 —— 实现一个 new 操作符
tags:
  - js
id: 2044
categories:
  - 前端
date: 2022-03-04
updated: 2022-03-04
---

```js
function Student(name) {
  this.name = name
}

let stu = new Student('zs') // Student {name: 'zs'}
```

new 做了哪些事
1. 创建一个新的空对象，类型是 Student
2. 将 this 指向这个新的对象
3. 执行构造函数 目的：给这个新对象加属性和方法
4. 返回这个新对象

简单实现

```js
function NEW(fun) {
  // 判断是否是函数
  if (typeof fun !== 'function') {
    throw new Error('第一个参数应该是函数')
  }

  // 创建一个空对象，并将原型指向 fun.prototype
  // const newObj = {}
  // newObj.__proto__ = fun.prototype
  const newObj = Object.create(fun.prototype)

  const argsArr = [].slice.call(arguments, 1)

  // 将构造函数 this 指向 newObj，并执行构造函数
  const result = fun.apply(newObj, argsArr)

  // 如果构造函数本身有返回值，且返回值为对象时，会将本身返回值返回，如果返回值为简单类型，会忽略
  const isObject = typeof result === 'object' && result !== null
  const isFunction = typeof result === 'function'
  if (isObject || isFunction) {
    return result
  }
  // 返回新对象
  return newObj
}
```

```js
const stu = NEW(Student, 'ls')
console.log(stu) // Student {name: 'ls'}
```
