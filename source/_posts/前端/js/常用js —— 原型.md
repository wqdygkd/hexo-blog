---
title: 常用js —— 原型
tags:
  - js
id: 2036
categories:
  - 前端
date: 2022-02-15
updated: 2022-02-15
---

## 原型

### 原型基本概念

Javascript 规定，每一个函数都有一个 `prototype` 属性，属性值是一个对象，这个对象就叫做原型（原型对象），这个对象的所有属性和方法，都会被构造函数的实例继承

这也就意味着，我们可以把所有对象实例需要共享的属性和方法直接定义在 `prototype` 对象上

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

console.log(Person.prototype)
Person.prototype.sayName = function () {
  console.log(this.name)
}
var p1 = new Person(...)
var p2 = new Person(...)
console.log(p1.sayName === p2.sayName) // true
```

这时所有实例的 `sayName()` 方法，其实都指向同一个内存地址

### `__proto__`

任意对象都有 `__proto__` 属性，这个属性指向了构造函数的 prototype 属性，也就是原型对象

获取原型对象：

- 通过 `构造函数.prototype` 可以获取
- 通过 `实例.__proto__` 可以获取（隐式原型）
- 它们指向了同一个对象 `构造函数.prototype === 实例.__proto__`

**注意：`__proto__`是浏览器的一个隐藏（私有）属性，IE 浏览器不支持，不要通过它来修改原型里的内容，如果要修改原型中的内容，使用 `构造函数.prototype` 去修改**

### constructor 属性

默认情况下，原型对象中只包含了一个属性：constructor，constructor 属性指向了当前原型对象的构造函数

```javascript
function Person() {}

console.log(Person.prototype)
console.log(Person.prototype.constructor) // 构造函数本身

var p = new Person()
console.log(p)
// p 实例对象没有constructor 属性， 该属性来源于原型上
console.log(p.constructor == Person.prototype.constructor) // true
```

### 构造函数、实例、原型三者之间的关系

构造函数：构造函数就是一个函数，配合 new 可以新建对象

实例：通过构造函数实例化出来的对象我们把它叫做构造函数的实例。一个构造函数可以有很多实例

原型：每一个构造函数都有一个属性`prototype`，函数的 prototype 属性值就是原型。通过构造函数创建出来的实例能够直接使用原型上的属性和方法

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102204519.png)

原型三角关系：

- 构造函数和原型

  - 构造函数，通过 prototype 属性访问原型
  - 原型通过 constructor 属性访问到构造函数

- 构造函数 和 实例对象

  - 构造函数可以创建实例对象
  - 实例对象不能直接访问到构造函数

- 原型 和 实例对象关系
  - 实例对象可以直接访问到原型上的所有成员
  - 实例对象可以间接的访问到构造函数（通过原型上的 constructor 属性）

## 原型链

### 原型链概念

任何一个对象，都有原型对象，原型对象本身又是一个对象，所以原型对象也有自己的原型对象，这样形成的链式结构，就是原型链

绘制对象的原型链结构：

```javascript
var p = new Person()
// p ==> Person.prototype  ==> Object.prototype ==> null
var o = new Object()
// o ==> Object.prototype ==> null
var arr = new Array()
// arr ==> Array.prototype ==> Object.prototype ==> null
var date = new Date()
// date ==> Date.prototype ==> Object.prototype ==> null

// Math 是个内置对象，不是个构造函数
// Math ==> Object.prototype ==> null
```

总结：Object.prototype 是原型链的尽头，Object.prototype 的原型是 null

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@img/img/20210102204539.png)
