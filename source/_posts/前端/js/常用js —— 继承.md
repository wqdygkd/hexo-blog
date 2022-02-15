---
title: 常用js —— 继承
tags:
  - js
id:
categories:
  - 前端
date: 2022-02-15
updated: 2022-02-15
---

ES5实现继承的方式

ES6实现继承的方式


## 继承

> 继承：子承父业

在 js 中的继承概念非常简单，拿来主义：一个对象自己没有的属性和方法，另一个对象有，拿过来使用，就实现了继承。

继承的目的：让一个对象可以使用另一个对象的属性和方法。

### 混入式继承（mixin）

> 把一个对象中的属性和方法拷贝到另一个对象中。

```javascript
var ls = {
  name: 'zs',
  extend: function(obj) {
    // 只拷贝对象obj自身的成员，原型链上的成员不用拷贝给this
    if (obj.hasOwnProperty(k)) {
      this[k] = obj[k]
    }
  }
}
```

### 原型链继承

一个对象可以访问构造函数的原型中的属性和方法，那么如果想要让一个对象增加某些属性和方法，

只需要把这些属性和方法放到原型对象中即可。这样就实现了继承, 称之为原型链继承

- 直接给原型增加属性和方法
- 原型替换（注意：constructor）
- mixin+原型替换

```javascript
function Person() {}

// 1. 直接给原型增加属性和方法（麻烦）
Person.prototype.color = 'lime'
Person.prototype.legs = 2
Person.prototype.sayHi = function() {
  console.log('sayHi')
}
// 2. 原型替换，将原型替换成一个对象
Person.prototype = {
  // 手动添加一个constructor属性，如果不手动添加，会找到 Object 的 constructor 属性
  constructor: Person,

  color: 'lime',
  legs: 2,
  sayHi: function() {
    console.log('sayHi')
  }
}
// 3. 原型链 + 混入式继承
function Person() {}
var lw = {
  skill: '翻墙'
}
// 给原型添加 extend 方法  -- 混入式继承
Person.prototype.extend = function(obj) {
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      this[k] = obj[k]
    }
  }
}
// 把 lw 的成员添加到了 Person 的原型上， Person 的实例就可以访问到原型上的这个成员
Person.prototype.extend(lw)
console.log(Person.prototype)
var p = new Person()
console.log(p.skill)
```

### Object.create 继承

```js
// Shape - 父类(superclass)
function Shape() {
  this.x = 0
  this.y = 0
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x
  this.y += y
  console.info('Shape moved.')
}

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this) // call super constructor. 继承父类的属性
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype) // 将父类的原型赋值给了子类
Rectangle.prototype.constructor = Rectangle

var rect = new Rectangle()

console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle) // true
console.log('Is rect an instance of Shape?', rect instanceof Shape) // true
rect.move(1, 1) // Outputs, 'Shape moved.'
```

如果你希望能继承到多个对象，则可以使用混入的方式。

```js
function MyClass() {
  SuperClass.call(this)
  OtherSuperClass.call(this)
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype)
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype)
// 重新指定constructor
MyClass.prototype.constructor = MyClass

MyClass.prototype.myMethod = function() {
  // do a thing
}
```
