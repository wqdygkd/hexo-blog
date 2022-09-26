---
title: javascript 基础
tags:
  - js
id: '1653'
categories:
  - 前端
date: 2018-09-08 14:35:18
---

# 书写位置

第一种: 写在`script`标签中

第二种: 引入一个 js 文件

**注意：**

1. script 可以放在很多地方，但是我们一般规范写在 body 的最后面；
2. 使用 src 引入的标签不能再在标签内写 js 代码 (写了不会执行)

!> 通过 `src` 请求到的 `js` 文件，会被解析到 `script` 标签内，并且覆盖原 `script` 标签内的 `js` 代码

!> script 标签的 src 属性可以写任何路径或文件，并不仅仅只能写 js 文件

# 注释

> 注释代码不会被执行，仅仅起到一个提示的作用。注释可以对复杂的代码进行解释，方便后期的维护和开发。

- 单行注释 :

  ```js
  // 这是单行注释， 单行注释只能写一行代码
  // 快捷键： ctrl + /
  ```

- 多行注释 :

  ```js
  /*
  	这是多行注释，在多行注释中可以
  	换行
  	快捷键  ctrl + shift + /
  	不可嵌套
  */
  ```

# 输出语句 (5 种)

- **alert : 警告框**

  ```js
  // alert会弹出一个警告框
  alert('hello world')
  ```

- **confirm : 确认框**

  ```js
  // confirm弹出一个确定框
  confirm('我帅吗？')
  ```

- **prompt : 输入框**

  ```js
  // prompt:弹出一个输入框，可以输入值
  prompt('请输入你的真是年龄')
  ```

- **document.write : 网页中写入内容**

  ```js
  // 可以识别标签
  document.write('hello world')
  document.write('<h1>hello world</h1>')
  document.write(Date()) // 输出当前时间
  ```

- **console.log：控制台输出**

  ```js
  // F12打开控制台，在console中可以看到打印的信息
  console.log('hello word')
  ```

# 变量

```js
// var 声明变量
var age
age = 12 // 先声明,后赋值
var age = 12 // 同时声明+赋值
var age, name, sex // 直接声明变量,可一次声明多个，用逗号隔开
height = 100 // 不声明变量，直接赋值(不会报错，但是不推荐)
console.log(height) // 不声明变量，也不赋值变量，直接使用（会报错）v

function add(num1, num2) {
  return num1 + num2 // 把两个数字加起来
}
/*
var student = {
	name:'小明'
}
*/
```

- 变量**命名要求**（变量是[标识符][1]的一种）

  1. 以字母、下划线或美元符号（\$）开头
  2. 由字母、下划线、美元符号（\$）和数字组成
  3. 标识符**区分大小写**
  4. 标识符不能使用关键字和保留字
  5. 如果重新声明 JavaScript 变量，该变量的值不会丢失 `var car='yellow'; var car` car 的值依然是 'yellow'

> 关键字 (有特殊意义的一些单词)
> `break` `do` `instanceof` `typeof` `case` `else` `new` `var` `in` `catch` `finally` `return` `void` `continue` `for` `switch` `while` `try` `debugger` `function` `this` `with` `default` `if` `throw` `delete`
>
> 保留字
> `abstract` `enum` `int` `short` `boolean` `export` `interface` `static` `extends` `long` `super` `Char` `final` `native` `Class` `synchronized` `package` `throws` `Const` `goto` `private` `transient` `degubber` `implements` `volatile` `double` `import` `public` `byte` `float` `protected`

交换两个变量的值

1. 使用临时变量 **(必须掌握)**

```js
var temp = a
a = b
b = temp
```

2. 不使用临时变量

```js
a = a + b
b = a - b
a = a - b
```

# 基本数据类型

## Number

- 浮点数

```js
var num = 3.1416 // 3.1416
var num = 3.12e2 // 312
var num = 3.12e-1 // 0.312
```

- 整数

```js
var num = 10 // 10
var num = 070 // 56 (八进制)
var num = 0xa // 10 (十六进制)
```

- 特殊值
  > `NaN` `Infinity`

```js
var num = 1 / 0 // Infinity (无穷大)
```

> 通过 `isNaN(num)` 可以判断是否是一个数字，返回 false 的时候，表示是一个数字

- 浮点数精度丢失问题

```js
// 在进行浮点数运算的时候，可能会出现精度丢失的问题
0.1 + 0.2 = 0.30000000000000004
0.2 + 0.2 = 0.4
// 尽量少用浮点数进行运算，不要让浮点数进行比较

// 解决办法 : 根据小数点后面的位数量 乘以对应的整数
0.1 + 0.2  ==> (0.1*10+0.2*10) / 10 = 0.3
```

## String

只要是在**单引号或双引号**内的就是 `String` 类型

```js
var name1 = 'hello'
var name2 = 'july'
var name3 = '3.1416'
// 使用索引位置来访问字符串中的每个字符,字符串的索引从 0 开始
var character = name1[3] // l
// 内置属性 length 来计算字符串的长度
console.log(name1.length) // 5
```

> 若在字符串中使用引号，字符串中的引号不要与字符串的引号相同，或在字符串添加转义字符 `\`

字符串可以是对象

```js
var x = 'john'
var y = new String('john')
typeof x // String
typeof y // Object
```

## Boolean

布尔型，只有 `true` 和 `false` 两个值，且是小写

true : `1`、`2`、`1.1`、`-1`、`'0'`、`'1'`、`[]`、`Infinity`、`-Infinity`、...

false : `0`、`''`、`null`、`NaN`、`undefined`

> 所有非 0 数都是 true，0 是 false

<span class="red">真值：</span> 在 JavaScript 中，**[Truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)**（真值）指的是在[布尔值](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 [假值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)（即除 `false`、`0`、`""`、`null`、`undefined` 和 `NaN` 以外皆为真值）

## Array

```js
var car = new Array()
cat[0] = 'yellow'
cat[1] = 'red'
cat[2] = 'blue'
// 或
var cat = ['yellow', 'red', 'blue']
```

> 关键词 `new` 用于声明新变量的类型

## Object

由花括号分隔，属性和方法的容器；对象的属性以名称和值对的形式 (name : value) 来定义；多个属性由逗号分隔。对象的方法定义了一个函数，并作为对象的属性存储。对象方法通过添加 `()` 调用

```js
var cat = new Object()
cat.name = 'kitty'
cat.age = '2'
cat.eat = function() {}
// 或
var cat = {
  name: 'kitty',
  age: 2,
  eat: function() {}
}
```

对象属性有两种访问方式：

```js
name = cat.name
name = cat['name']
```

对象方法的访问：

```js
eat = cat.eat() // 输出函数执行结果
eat = cat.eat // 输出函数表达式
```

## Null

只有一个值：`null`，表示对象不存在

```js
var cat = null // 将cat的值清空
```

- str.match()方法匹配不到返回 null
- 通过 document.querySelector、getElementById() 获取不到元素返回 null

## Undefined

只有一个值：`undefined`

- 已声明未赋值的变量

```js
var a
console.log(a) // undefined
```

- 没有明确返回值的变量

```js
// 获取对象不存在的属性
var obj = { a: 1, b: 2 }
console.log(obj.c) // undefined

// 数组下标不存在
var arr = ['zs', 'ls', 'ww']
arr[5] // undefined

// 函数没有返回值
function getSum(a, b) {
  console.log(a + b)
}
// getSum(20, 30) // 50
var result = getSum(20, 30)
console.log(result) // undefined

// 函数参数没有传入
function f(i) {
  console.log(i)
}
f() // undefined
```

## typeof 操作符

> 是一个操作符而不是函数，圆括号可以使用，但不是必需的

```js
var num
typeof num // undefined
typeof num1 // undefined
// 对未初始化和未声明的变量执行 typeof 操作符都返回 undefined 值

var num = 1
typeof num // number

var num = '1'
typeof num // string

var flag = true
typeof flag // bollean

typeof true // boolean

typeof null // object ==> null 被认为是一个空的对象引用

var cat = { name: 'kitty' }
typeof cat // object
```


# 判断语句

## if 语句

- 单独的 if 语句

```js
// 语法
if (条件) {
  // 只有当条件为 true 时,执行代码
} // else部分没有执行语句则 省略
var age = 10
if (age >= 18) {
  console.log('可以访问该网站')
}
```

- `if..else` 语句

```js
// 语法
if (条件) {
  // 当条件为 true 时执行的代码
} else {
  // 当条件不为 true 时执行的代码
}

var age = 10
if (age >= 18) {
  console.log('可以玩吃鸡')
} else {
  console.log('不可以玩吃鸡')
}
```

- `if..else if ..else` 语句

```js
if (条件1) {
  // 当条件1为  true 时执行的代码
} else if (条件2) {
  // 当条件2 为true 时执行的代码
} else {
  // 当条件1和 条件2 都不为true 时执行的代码
}
```

## 三元运算符

```js
条件 ? 表达式1 : 表达式2
1. 如果 `条件` 的值为true，会返回表达式1的值
2. 如果`条件`的值为false，会返回表达式2的值
// 求两个数的最大值
var max = n1 > n2 ? n1 : n2
```

## switch 语句

> if..else 适用于范围的判断，switch..case 适用于具体的值的判断

```js
// 语法
switch (变量) {
  case 值1:
    语句1
    break
  case 值2:
    语句2
    break
  …
  default:
    默认语句
    break
}
```

> 注意 :
> break 可以省略，如果省略，代码会继续执行下一个 case
> switch 语句在比较值时使用的是 **全等** 操作符, 因此不会发生类型转换（例如，字符串'10' 不等于数值 10）

# 循环语句

## while 循环

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102205019.png)

基本语法 :

```js
// 当循环条件为true时，执行循环体
// 当循环条件为false时，结束循环
while (循环条件) {
  // 循环体：需要循环执行的语句
}
```

代码示例:

```js
// 计算1-100之间所有数的和 (讲)
// 初始化变量
var i = 1
var sum = 0
while (i <= 100) {
  // 判断条件
  sum += i // 循环体
  i++ // 自增，修改循环条件（不能省略）
}
console.log(sum)
```

## do..while 循环

> do..while 循环和 while 循环非常像，二者经常可以相互替代，但是 do..while 的特点是不管条件成不成立，都会执行一次。

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102205045.png)

基础语法 :

```js
do {
  // 循环体
} while (条件)
```

代码示例 :

```js
// 初始化变量
var i = 1
var sum = 0
do {
  sum += i // 循环体
  i++ // 自增
} while (i <= 100) // 循环条件
```

## for 循环

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102205112.png)

for 循环语法：

```js
// 1. for循环使用分号分隔
// 2. for循环有2个分号，两个分号不能少
for (初始化语句; 判断语句; 自增语句) {
  // 循环体
}
```

执行顺序：1243 ---- 243 -----243(直到循环条件变成 false)

1. 初始化语句
2. 判断语句
3. 自增或者自减
4. 循环体

for 循环代码示例：

```js
// 打印1-5之间所有数
for (var i = 1; i <= 5; i++) {
  console.log(i)
}
console.log(i) // 6 即便循环已经结束了，我们依然可以访问 i 的值
```

思考 1：

```js
// 1 求1-100之间所有数的和、平均值
// 2 求1-100之间所有数的乘积
// 3 计算1-100之间能3整除的数的和
```

思考 2：

```js
// 1 计算1-100之间不能被7整除的数的和
// 2 求1-100之间所有偶数的和
// 3 同时求1-100之间所有偶数和奇数的和
```

思考 3（双重 for 循环）：

```js
// 1  网页打印5*5方形★阵  document.write()
// 2  网页打印直角三角形
// 3  网页打印9*9乘法表
```

## for ..in 循环

详见遍历对象

## break 和 continue

> **break**: 结束/中止循环（可以用在 switch 语句和循环语句中）
>
> 立即跳出当前整个循环，即循环结束，开始执行循环后面的内容（直接跳传出大括号）
>
> **continue**: 结束本次循环，进行下一次循环 （只能用在循环语句中）
>
> 立即跳出当前循环，继续下一次循环（跳到 i++的地方）
>
> 在一个循环里，continue 和 break 后面不能在写任何语句，因为永远无法执行到

思考 1 :

```js
// 输出结果是什么？ 1 2 3 4 6
for (var i = 1; i <= 10; i++) {
  if (i == 5) {
    continue
  }
  if (i == 7) {
    break
  }
  console.log(i)
}
```

## 总结 :

1. 循环有很多种，但是以后用得最多的是 for 循环
2. 当不明确循环次数的时候，可以使用 while 循环
3. 当无论如何都要执行一次代码的时候，可以使用 do..while 循环
4. 循环可以相互替代

# Array 数组

- 将多个元素，按一定顺序排列放到一个集合中 ， 那么这个集合我们就称之为数组
- 可以存放任意类型的数据（一般一个数组只存放一种类型）
- 特点 : 用逗号隔开，有顺序，有长度，数组长度可以动态调整
- 用途 : 存储大量的数据

```js
// 为什么要有数组?
// 1. 我们知道,一个变量能够存储一个值, 当我们想要存储多个值的时候, 就可以使用数组。比如存储一个班级里面所有学生的名;
// 2. 使用数组可以对多个相同类型的值统一的管理,存储起来方便,操作的时候,也会很方便
```

## 创建数组

1. 通过 **构造函数** 创建数组

   ```js
   var arr = new Array() // 创建了一个空数组
   var arr = new Array(4) // 创建了一个数组，长度为4,里面全是空值
   var arr = new Array('4') // 创建了一个数组，长度为1,内容为字符串 '4'
   var arr = new Array(2, 3) // 创建了一个数组，里面存放了2个数字
   ```

2. 通过 **数组字面量** 创建数组

   ```js
   var arr1 = [] // 创建一个空数组
   var arr2 = [4] // 创建了一个数组，长度为1,内容为数字 4
   var arr2 = [2, 3] // 创建一个包含2个数值的数组，多个数组项以逗号隔开
   var arr3 = ['2', 'b'] // 创建一个包含两个字符串的数组
   ```

## 数组的长度与下标

- 数组的长度 : 跟字符串一样,数组有一个 length 属性,, 指数组中存放的元素的个数

  ```js
  var arr = [] // 空数组 长度为 0

  var arr = [1, 3, 5]
  arr.length // 长度就是3

  arr.length = 0 // 设置length属性改变数组中元素的个数
  ```

- 数组的下标（又称索引） : 因为数组有序的，有序的就应该有自己的序号，而这个序号就是每个元素对应的下标，**下标从 0 开始 , 到 arr.length-1 结束**

  ```js
  // 数组取值，如果下标不存在，则返回 undefined
  var arr = ['zs', 'ls', 'ww']
  arr[0] // zs
  arr[2] // ww
  arr[5] // undefined

  // 数组的赋值
  // 格式：数组名[下标] = 值
  // 如果下标有对应的值，会把原来的值覆盖，如果下标不存在，会给数组新增一个元素。
  var arr = ['red', 'green', 'blue']
  arr[0] = 'yellow' // 把red替换成了yellow
  arr[3] = 'pink' // 给数组新增加了一个pink的值
  // 如果下标有跨度,中间全是empty 不合法

  // 在数组末尾添加新的元素
  arr[arr.length] = 值
  arr.push(值)
  ```

## 数组的遍历

> 遍历 : 对数组的每一个元素都访问一次就叫遍历

数组遍历的基本语法：

```js
for (var i = 0; i < arr.length; i++) {
  // 数组遍历的固定结构
}
```

## 冒泡排序

```js
// 将数组中的数从小到大排列
var arr = [1, 4, 6, 7, 9, 3, 5, 8]
// var arr = [1,2,3,4,5,6,7,8]
var numi = 0
var numj = 0
for (var j = 0; j < arr.length - 1; j++) {
  numj += 1
  var flag = true
  for (var i = 0; i < arr.length - 1 - j; i++) {
    // document.write('(' + arr[i] + ',' + arr[i + 1] + ')')
    numi += 1
    // 两两比较，如果前面的大于后面的，交换位置
    if (arr[i] > arr[i + 1]) {
      flag = false
      var temp
      temp = arr[i]
      arr[i] = arr[i + 1]
      arr[i + 1] = temp
      // document.write('交换了')
    }
  }
  // document.write('，arr=（' + arr + '）')
  // document.write('<br>')
  // 如果一趟下来，一次交换都没有做，说明就已经排好序，就不需要继续比
  if (flag) {
    break
  }
  // console.log(arr)
}
console.log(arr)
console.log(numi)
console.log(numj)
```

# 对象

## 查看一个对象的类型(类型识别)

```js
typeof // 只能查看基本数据类型的类型
instanceof // 判断对象的具体类型
constructor.name // 获取对象的具体类型 适用于任何类型的检测
Object.prototype.toString.call('str') // '[object String]' 适用于任何类型的检测
```

**typeof**

用于查看基本数据的数据类型， number string boolean undefined

null 比较特殊，结果是 object

如果查看复杂数据类型，返回的都是 object 类型

函数的结果是 function

```js
// typeof 判断
// 简单类型
typeof 12 // 'number'
typeof 'abc' // 'string'
typeof true // 'boolean'
typeof undefined // 'underfined'
typeof null // 'object'

// 复杂类型 (引用类型)
typeof function() {} // 'function'
typeof [] // 'object'
typeof {} // 'object'
```

**instanceof 判断**

```js
// 语法
object instanceof constructor
```

用来检测 `constructor.prototype` 是否存在于参数 `object` 的原型链中

不能用于类型识别

```js
// instanceof 判断
var simpleStr = 'This is a simple string'
var myString = new String()
var newStr = new String('String created with constructor')
var myObj = {}
var myNonObj = Object.create(null)
var myArr = []
var myFn = function() {}

simpleStr instanceof String // 返回 false, 检查原型链会找到 undefined
myString instanceof String // 返回 true
newStr instanceof String // 返回 true
myString instanceof Object // 返回 true

myObj instanceof Object // 返回 true, 尽管原型没有定义
;({} instanceof Object) // 返回 true, 同上
myNonObj instanceof Object // 返回 false, 一种创建对象的方法，这种方法创建的对象不

myArr instanceof Array // true
myArr instanceof Object // true
myFn instanceof Object // true
myFn instanceof Function // true
```

**constructor.name**

Undefined/Null 没有 constructor 属性

```js
var myArr = []
var myFn = function() {}
var myObj = {}

// 原型的构造函数
myArr.constructor.name // Array
myFn.constructor.name // Object
myObj.constructor.name // Function

// 自定义构造函数
function Teacher(name, age) {
  this.name = name
  this.age = age
}
var tea = new Teacher('zs', 18)
tea.constructor.name // Teacher
```

**Object.prototype.toString**

适用于任何类型的检测，不能识别自定义对象类型

```js
Object.prototype.toString.call('str') // '[object String]'
```

## 原始类型与引用类型

- 原始类型（简单数据类型/值类型）

> `Number` `String` `Boolean` `Undefined` `Null`

- 引用类型（复杂数据类型）

> `Object` `Array` `function` `自定义的对象`

```js
var num1 = 123
var num2 = num1
num2 = 456
console.log(num1) // 123

var obj1 = { a: 1 }
var obj2 = obj1 // obj1和obj2，均指向了同一个对象
obj2.a = 3 // 对obj2的任何操作
console.log(obj1.a) // 3  同时也会影响到 obj1
```

原始数据类型和引用数据类型，主要是根据内存存储方式来区分的

- 原始类型储存在栈（Stack）中，存的是**值本身**（值类型），进行赋值的时候，赋值的是值本身
- 引用类型储存在堆（Heap）中，并非储存变量真实数值而是**引用**（也叫**地址**），进行赋值的时候，赋值的是地址，而不是数据本身

# 内置对象

> JS 内置对象就是指 Javascript 自带的一些对象，供开发者使用，这些对象提供了一些常用的的功能。
>
> 常见的内置对象有 Math、String、Array、Date 等

- 跳转到定义`ctrl+左键`
- [火狐开发者网站 MDN](https://developer.mozilla.org/zh-CN/)

## Math 对象

- 属性 PI

  `Math.PI`

- 最大值/最小值

```js
Math.max()
Math.min()
```

- 取整

```js
Math.ceil() // 向上取整
Math.floor() // 向下取整
Math.round() // 四舍五入，如果是.5，则取更大的那个数 (-1.5 -> -1)
```

- 随机数

```js
Math.random() // 返回一个[0,1)之间的数，能取到0，取不到1
// [0~N]随机数 parseInt(Math.random * (N+1))
// [4~9] ==> [0~5]+4
```

- 绝对值

```js
Math.abs() // 求绝对值
```

- 次幂和平方

```js
Math.pow(num, power) // 求 num 的 power 次方
Math.sqrt(num) // 对 num 开平方
```

- 练习

```js
// 随机生成一个 rgb 颜色?
function randomRGB() {
  var colorA = parseInt(Math.random() * 256)
  var colorB = parseInt(Math.random() * 256)
  var colorC = parseInt(Math.random() * 256)
  return 'rgb(' + colorA + ',' + colorB + ',' + colorC + ')'
}
```

## Date 对象

> Date 对象用来处理日期和时间

- 创建一个日期对象

```js
// 不传参数：创建一个当前时间的对象
var date = new Date()

// 日期格式字符串：创建一个指定时间的日期对象
// '-' 在 safari 下不识别，推荐用 /
var date = new Date('2018/12/02')
var date = new Date('2018/12/02 00:02:05')

// 日期以逗号分隔：注意月份从0开始
var date = new Date(2018, 11, 2, 0, 2, 5) // 2018/12/02

// 时间戳
var date = new Date(1543680125000)
```

- 日期格式化(了解)

```js
date.toString() // 默认的日期格式 ，包括日期和时间
date.toLocalString() // 本地风格的日期格式（兼容性）
date.toDateString() // 只显示日期
date.toLocalDateString()
date.toTimeString() // 只显示时间
date.toLocalTimeString()
```

- 获取日期的指定部分

```js
getMilliseconds() // 获取毫秒值
getSeconds() // 获取秒
getMinutes() // 获取分钟
getHours() // 获取小时
getDay() // 获取星期，0-6    0：星期天
getDate() // 获取日，即当月的第几天
getMonth() // 返回月份，注意月份从0开始
getFullYear() // 返回4位的年份  如 2018

// 思考：
// 封装一个函数，返回当前的时间，格式是：yyyy-MM-dd HH:mm:ss
```

- 时间戳

```js
var date = +new Date() // 1970年01月01日00时00分00秒起至现在的总毫秒数
// 思考
// 如何统计一段代码的执行时间？
```

## 基本包装类型

> **简单数据类型是没有方法的**。为了方便操作基本数据类型，JavaScript 还提供了三个特殊的引用类型：String/Number/Boolean

基本包装类型：把基本类型包装成复杂类型

```js
var str = 'abc'
var result = str.indexOf('a')

// 发生了三件事情
// 1. 把简单类型转换成复杂类型：var s = new String(str)
// 2. 调用包装类型的 indexOf 方法：var result = s.indexOf('a')
// 3. 销毁刚刚创建的复杂类型
```

### Number 对象

> Number 对象是数字的包装类型，数字可以直接使用这些方法

`num.toFixed(2)` ：返回保留 2 位小数的新数的字符串格式
`num.toString()` ：转换成字符串并返回

### Boolean 对象

> Boolean 对象是布尔类型的包装类型

```js
toString() // 转换成字符串并返回
```

**undefined 和 null 没有包装类型，所以调用 toString 方法会报错**
