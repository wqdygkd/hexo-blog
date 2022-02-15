---
title: 常用js —— 继承
tags:
  - js
id: 2035
categories:
  - 前端
date: 2022-02-15
updated: 2022-02-15
---

## ES5实现继承的六种方式

### 原型链

利用原型链让一个引用类型继承另一个引用类型的属性和方法。

```js
function SuperType () {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

// 子类 SubType
function SubType () {
  this.subProperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subProperty;
};

// 实例
var instance = new SubType();
console.log(instance);
console.log(instance.getSuperValue());                            // true
console.log(instance instanceof SubType);                         // true
console.log(instance instanceof SuperType);                       // true
console.log(instance instanceof Object);                          // true
console.log(SubType.prototype.isPrototypeOf(instance));           // true
console.log(SuperType.prototype.isPrototypeOf(instance));         // true
console.log(Object.prototype.isPrototypeOf(instance));            // true
```

缺点：

1. 来自原型对象的引用属性是所有实例共享的。
2. 创建子类实例时，无法向父类构造函数传参。

举例如下：

```js
// 1. 来自原型对象的引用属性是所有实例共享的

// 父类
function SuperType () {
  this.colors = ['red', 'blue', 'green'];
}

// 子类
function SubType () {

}
SubType.prototype = new SuperType();

// 实例
var instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors);        // ['red', 'blue', 'green', 'black']
var instance2 = new SubType();
console.log(instance2.colors);        // ['red', 'blue', 'green', 'black']

// 因为修改colors是修改的SubType.prototype.colors，所以所有的实例都会更新
```

```js
// 2. 创建子类实例时，无法向父类构造函数传参

// 调用父类是在 SubType.prototype = new SuperType()
// 新建子类实例调用 new SubType()
// 所以无法再new SubType() 的时候给父类 SuperType() 传参
```

### 借用构造函数

在子类构造函数的内部通过call()以及apply()调用父类构造函数。

```js
// 父类 SuperType
function SuperType (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];

  this.getName = function () {
      return this.name;
  }
}

// 子类
function SubType (name) {
  // 继承了SuperType，同时还传递了参数
  SuperType.call(this, name);

  // 实例属性
  this.age = 20;
}

// 实例
var instance1 = new SubType('Tom');
instance1.colors.push('black');
console.log(instance1.name);               // "Tom"
console.log(instance1.getName());          // "Tom"
console.log(instance1.age);                // 20
console.log(instance1.colors);             // ['red', 'blue', 'green', 'black']
var instance2 = new SubType('Peter');
console.log(instance2.name);               // "Peter"
console.log(instance2.getName());          // "Peter"
console.log(instance2.age);                // 20
console.log(instance2.colors);             // ['red', 'blue', 'green']
```

可以看到，借用构造函数实现继承，解决了原型链继承的两个问题，既可以在新建子类实例的时候给父类构造函数传递参数，也不会造成子类实例共享父类引用变量。

但是你注意到了吗，这里我们把父类方法也写在了SuperType()构造函数里面，可以像前面一样写在SuperType.prototype上吗？

答案是不可以，必须写在SuperType()构造函数里面。因为这里是通过调用SuperType.call(this)来实现继承的，并没有通过new生成一个父类实例，所以如果写在prototype上，子类是无法拿到的。

缺点：如果方法都在构造函数中定义，那么就无法复用函数。每次构建实例时都会在实例中保留方法函数，造成了内存的浪费，同时也无法实现同步更新，因为每个实例都是单独的方法函数。如果方法写在prototype上，就只会有一份，更新时候会做到同步更新。

### 组合继承

将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。

使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

```js
// 父类
function SuperType (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

// 子类
function SubType (name, age) {
  // 继承父类实例属性
  SuperType.call(this, name);

  // 子类实例属性
  this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

// 实例
var instance1 = new SubType('Tom', 20);
instance1.colors.push('black');
console.log(instance1.colors);                  // ['red', 'blue', 'green', 'black']
instance1.sayName();                            // "Tom"
instance1.sayAge();                             // 20

var instance2 = new SubType('Peter', 30);
console.log(instance2.colors);                  // ['red', 'blue', 'green']
instance2.sayName();                            // "Peter"
instance2.sayAge();                             // 30
```

缺点： 调用了两次父类构造函数，一次通过SuperType.call(this)调用，一次通过new SuperType()调用。

### 原型式继承

不使用严格意义上的构造函数，借助原型可以基于已有的对象创建新的对象，同时还不必因此创建自定义类型。

```js
// 在object函数内部，先创建了一个临时的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回这个临时类型的一个新实例。
// 从本质上讲，object()对传入其中的对象执行了一次浅复制。

function object (o) {
  function F() {}
  F.prototype = o;
  return new F();
}


var person = {
  name: 'Tom',
  friends: ['Shelby', 'Court', 'Van']
};

var anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(anotherPerson.friends);               // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
console.log(yetAnotherPerson.friends);            // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
console.log(person.friends);                      // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
```

Object.create()在传入一个参数的情况下与前面写的object()方法的行为相同

```js
var person = {
  name: 'Tom',
  friends: ['Shelby', 'Court', 'Van']
};

var anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = Object.create(person, {
    name: {
        value: 'Linda',
        enumerable: true
    }
});
yetAnotherPerson.friends.push('Barbie');

console.log(anotherPerson.friends);               // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
console.log(yetAnotherPerson.friends);            // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
console.log(person.friends);                      // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
```

缺点：和原型链继承一样，所有子类实例共享父类的引用类型。

### 寄生式继承

寄生式继承是与原型式继承紧密相关的一种思路，创建一个仅用于封装继承过程的函数，该函数内部以某种形式来做增强对象，最后返回对象

```js
function object (o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function createAnother (o) {
  var clone = object(o);
  clone.sayHi = function () {
    console.log('Hi');
  }
  return clone;
}

var person = {
  name: 'Tom',
  friends: ['Shelby', 'Court', 'Van']
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();                              // "Hi"
anotherPerson.friends.push('Rob');
console.log(anotherPerson.friends);              // ['Shelby', 'Court', 'Van', 'Rob']
var yerAnotherPerson = createAnother(person);
console.log(yerAnotherPerson.friends);              // ['Shelby', 'Court', 'Van', 'Rob']
```

缺点： 和原型链式继承一样，所有子类实例共享父类引用类型。 和借用构造函数继承一样，每次创建对象都会创建一次方法。

### 寄生组合式继承

将寄生式继承和组合继承相结合，解决了组合式继承中会调用两次父类构造函数的缺点。

组合继承在第一次调用SuperType构造函数时，SubType.prototype会得到两个属性：name和colors；它们都是 SuperType 的实例属性，只不过现在位于 SubType的原型中。当调用SubType构造函数时，又会调用一次SuperType构造函数，这一次又在新对象上创建了实例属性name和colors。于是，这两个属性就屏蔽了原型中的两个同名属性。

所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

其背后的基本思路是：不必为了指定子类型的原型而调用父类的构造函数，我们需要的无非就是父类原型的一个副本而已。本质上，就是使用寄生式继承来继承父类的prototype，然后再将结果指定给子类的prototype。

```js
function object(o) {
  function F() { }
  F.prototype = o;
  return new F();
}

function inheritPrototype(SubType, SuperType) {
  var prototype = object(SuperType.prototype);        // 创建对象
  prototype.constructor = SubType;    // 增强对象
  SubType.prototype = prototype;      // 指定对象
}

// 父类
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

// 子类
function SubType(name, age) {
  // 继承父类实例属性
  SuperType.call(this, name);

  // 子类实例属性
  this.age = age;
}

// 继承父类方法
inheritPrototype(SubType, SuperType);

// 子类方法
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

// 实例
var instance1 = new SubType('Tom', 20);
instance1.colors.push('black');
instance1.sayAge();                                   // 20
instance1.sayName();                                  // "Tom"
console.log(instance1.colors);                        // ["red", "blue", "green", "black"]

var instance2 = new SubType('Peter', 30);
instance2.sayAge();                                   // 30
instance2.sayName();                                  // "Peter"
console.log(instance2.colors);                        // ["red", "blue", "green"]
```

寄生组合式继承的高效率体现在它只调用了一次SuperType构造函数，并且因此避免了再SubType.prototype上面创建不必要的、多余的属性。与此同时，原型链还能保持不变。因此，还能够正常使用instanceof和isPrototypeOf()。

## ES6实现继承

```js
// 父类
class SuperType {
  constructor(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  sayName() {
    console.log(this.name);
  };
}

// 子类
class SubType extends SuperType {
  constructor(name, age) {
    // 继承父类实例属性和prototype上的方法
    super(name);

    // 子类实例属性
    this.age = age;
  }

  // 子类方法
  sayAge() {
    console.log(this.age);
  }
}

// 实例
var instance1 = new SubType('Tom', 20);
instance1.colors.push('black');
instance1.sayAge();                                   // 20
instance1.sayName();                                  // "Tom"
console.log(instance1.colors);                        // ["red", "blue", "green", "black"]

var instance2 = new SubType('Peter', 30);
instance2.sayAge();                                   // 30
instance2.sayName();                                  // "Peter"
console.log(instance2.colors);                        // ["red", "blue", "green"]
```
