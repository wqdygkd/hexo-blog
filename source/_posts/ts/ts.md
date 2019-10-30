---
title: ts
date: 2019/10/29
categories:
  - [ts]
---

## 基本类型

```ts
// void 类型的只能将它赋值为 undefined 和 null
// undefined 类型的变量只能被赋值为 undefined
// null 类型的变量只能被赋值为 null
// undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量

// String Number 同理
let b1: Boolean = new Boolean(1) // √ `new Boolean()` 返回的是一个 `Boolean` 对象
let b2: boolean = new Boolean(1) // ×
let b3: boolean = Boolean(1) // √
let b4: boolean = undefined // √
```

## 任意值

任意值（Any）用来表示允许赋值为任意类型

在任意值上访问任何属性和方法都是允许的

```ts
let anyThing: any = 'hello'
console.log(anyThing.name.firstName()) // √
```

## 类型推论（Type Inference）

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```ts
let str = 'zs'
// 等价于 let str: string = 'zs'
// 第一句已经被推论为String类型了
str = 7 // ×
```

**变量在声明的时候，如果未声明类型也未赋值，则他会被识别为任意类型**

```ts
let something
// 等价于 let something: any
something = 'zs' // √
something = 18 // √
something.sayHi('ls') // √
```

## 联合类型（Union Types）

```ts
let num: string | number
num = 'seven' // √
num = 7 // √

// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
num.length // × num 被推断成 number 所以错误
```

访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法

```ts
let num: string | number
num.length // ×
```

## 对象的类型--接口（interface）

```ts
// 变量的形状必须和接口的形状保持一致(属性个数和类型都必须保持一致)
interface Person1 {
  name: string
  age: number
  // age?: number // 表示这个属性可有可无
  // age: any // 定义一个任何变量的 age
  [propName: string]: any // 允许有任意的属性，旦定义了任意属性，那么<span class="red">确定属性和可选属性的类型(string,number)都必须是它(any)的类型的子集</span>
  readonly id: number // 只读属性
}

let tom: Person1 = {
  name: 'zs',
  age: 18,
  id: 1
}
```

## 数组类型

```ts
let arr: Array<number> = [1, 2, 3] // 数组泛型（Array Generic）
let arr: number[] = [1, 2, 3]

// 数组的项中不允许出现其他的类型：
let arr1: number[] = [1, 2, '3'] // ×
// push 方法只允许传入 number 类型的参数，但是却传了一个 string 类型的参数，所以报错了
let arr2: number[] = [1, 2, 3]
arr2.push('4') // ×
```

对于类数组，不能用普通的数组的方式来描述，而应该用接口：

```ts
function sum() {
  let args: number[] = arguments // × Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.ts(2740)
}
```

```ts
function sum() {
  // 约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性
  let args: {
    [index: number]: number
    length: number
    callee: Function
  } = arguments
}
```

常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：

```ts
function sum() {
  let args: IArguments = arguments
}
```

IArguments 是 TypeScript 中定义好了的类型，它实际上就是：

```ts
interface IArguments {
  [index: number]: any
  length: number
  callee: Function
}
```

## 函数

TypeScript 中的 => 和 ES6 中的 => 是不同的
类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型

函数声明

```ts
function sum(x: number, y: number, m?: number, n: number = 1): number {
  return x + y + m + n
}

// 输入多余的（或者少于要求的）参数，是不被允许的：
sum(1, 2, 3) // ×
sum(1) // ×
```

可以用 void 表示没有任何返回值的函数

可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了

TypeScript 会将添加了默认值的参数识别为可选参数

函数表达式

```ts
let sum = function(x: number, y: number): number {
  return x + y
}
```

上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 sum，是通过赋值操作进行类型推论而推断出来的

手动给 sum 添加类型，则应该是:

```ts
let sum: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y
}
```

用接口定义函数

```ts
interface Sum {
  (x: number, y: number): number
}

let sum: Sum
sum = function(x: number, y: number) {
  return x + y
}
```

重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    )
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('')
  }
}
```

然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
这时，我们可以使用重载定义多个 reverse 的函数类型：

```ts
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    )
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('')
  }
}
```

上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示

## 类型断言（Type Assertion）

```
<类型>值
// 或
值 as 类型
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法，而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，此时可以使用类型断言，将 something 断言成 string

```ts
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}
```

类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的

## 进阶

类型别名

```ts
// 使用 type 创建类型别名,类型别名常用于联合类型
type Name = string
type Name1 = () => string
type Name2 = Name | Name1
function getName(n: Name2): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

enum

enum 中既能通过 key 去访问 value，也能通过 value 访问 key

```ts
enum Days {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
console.log(Days['Sun']) // 7
console.log(Days['Tue']) // 2
```

类

```ts
class Animal {
  name: ''
  constructor(name) {
    this.name = name
  }
  sayHi() {
    return `My name is ${this.name}`
  }
}

let a = new Animal('ls')
console.log(a.sayHi()) // My name is ls

class Cat extends Animal {
  constructor(name) {
    super(name) // 调用父类的 constructor(name)
    console.log(this.name)
  }
  sayHi() {
    return 'h1, ' + super.sayHi() // 调用父类的 sayHi()
  }
}

let c = new Cat('ww') // Tom
console.log(c.sayHi()) // h1, My name is ww
```

public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
static 修饰的属性或方法是静态的，只能通过类名调用

泛型

```ts
// T表示泛型，具体什么类型是调用这个方法的时候决定的
// 表示参数是什么类型就返回什么类型
function getData<T>(value: T): T {
  return value
}
getData<number>(123)
getData<string>('1214231')

// 定义接口
interface C1 {
  <T>(value: T): T
}
var getData: C1 = function<T>(value: T): T {
  return value
}
getData<string>('张三')
getData<string>(1243) // 错误
```
