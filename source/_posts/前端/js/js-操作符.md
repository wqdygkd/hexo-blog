---
title: js 中的操作符
tags:
  - js
id: 2025
categories:
  - 前端
date: 2021-04-27
updated: 2021-09-12
---

## 算数操作符

> `+` 、`-` 、`*` 、`/` 、`%`

对于加法 转换方向: 布尔值 -> 数值 -> 字符串， 数组/对象 -> 字符串
除加法以外 转换方向：字符串 -> 数值，布尔值 -> 数值, 数组 -> 数值

```js
var num = 5 + 6 // 11
var num = 5 % 2 // 1 取余数
var num = 5 % -2 // 1
var num = -5 % 2 // -1 只与左边值的符号有关

// 数字与字符串相加，数字会转换成字符串，返回字符串
var num = '5' + 6 + 7 // '567'
var num = 5 + 6 + '7' // '117'

// 数值与布尔值相加，布尔值转化成数值，false 转成 0，true 转成 1
var num = 5 + true // 6

// 字符串与布尔值相加，布尔值转化成字符串
var num = '1' + true // '1true'

'a' + +'b' // -> 'a' + +'b' -> 'aNaN'
4 * '3' // 12
true + true // 2

1 / 0 // Infinity
0 / 0 // NaN
```

## 赋值操作符

> 赋值运算符左边不能是常量或表达式

```js
var age = 10
var num = age++ // num = 10 age = 11 (先将变量中的值取出做赋值操作,再自身+1)

var age = 10
var num = ++age // num = 11 age = 11 (先自身+1,然后再将+1后的结果赋值)

var num = 5
console.log(num++) // 5
console.log(++num) // 7

var x = 3
var y = x++ + ++x + x * 10 // x = 3
// y = 3 + ++x + x * 10  // x = 4
// y = 3 + 5 + x * 10 // x = 5
// y = 58
```

## 关系操作符

> `>` 、`<` 、`>=` 、`<=`
>
> `==` 相等 、`!=` 不相等 、`===` 全等 、`!==` 不全等
>
> `in` `instanceof`

- `>` 、`<` 、`>=` 、`<=` 、`==`、`!=`

在比较前先执行类型转换

  - 如果有一个操作数是**布尔值**，则在比较相等性前先将其转换为**数值** -> false 转换为 0，true 转换为 1
  - 如果一个操作数是**字符串**，另一个操作数是**数值**，则在比较相等性前将字符串转换为**数值**
  - 如果两个值都是字符串，则按照字符串的字符编码进行逐位比较
  - 如果一个数是对象，另一个不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则比较
  - 如果两个操作数都是对象，则比较它们是否指向同一个对象
  - **null 和 undefined 是相等的**
  - 在比较相等性之前，不能将 null 和 undefined 转换为其他任何值
  - **在比较大小之前，null，undefined 会被 Number()强制转换成数字类型 Number(null) -> 0,  Number(undefined) -> NaN**
  - 如果有一个操作符是 NaN，则相等操作符返回 false，不相等操作符返回 true；即使两个操作数都是 NaN，也一样

* `===` 全等、`!==` 不全等
  两个操作数在未经转换的情况下相等返回 true，不相等返回 false

```js
0 == false // true
1 == true // true
2 == true // false

false == '0' // true
'' == 0 // true
'4' == 4 // true

null == undefined // true
undefined == 0 // false

null >= 0 // true
null <= 0 // true
null == 0 // false

null >= false // true
null <= false // true
null == false // false

'NaN' == NaN // false
5 == NaN // false
NaN == NaN // false
NaN != NaN // true

[] != [] // true
[] == ![] // true
0 == [] // true
1 == [] // false
1 == [1] // true

0 + [] // '0'
0 + {} // "0[object Object]"

{} + [] === 0 // true  {} 被解析为空的 block， + 被解析为正号运算符，结果等于 +[]
[] + {} === "[object Object]" // true [] 被解析为数组，后续的 + 被解析为加法运算符
({} + []) // '[object Object]  括号会阻止js将{}识别为block，因此他的运算结果与 []+{} 一致
console.log({} + []) // '[object Object]  当表达式作为参数传递给函数时，不会被默认为新的block
console.log({} + [] === 0)  // false

[] + {} === {} + [] // true

-0 === 0 // true
'4' === 4 // false
undefined === null // false
```

- `in`

  判断对象是否能够访问到该属性

- `instanceof`

  判断一个对象是否是另一个对象的实例

## 逻辑操作符

> `!` 非、`&&` 与、`||` 或

- `!` 对 Boolean 值取反

```js
var flag = true
alert(!flag) // false

alert(!0) // true
alert(![]) // false
alert(!'') // true
alert(!![]) // true
alert(!!1) // true
```

- `&&` 如果第一个值转换成 boolean 值之后为 true， 则输出第二个值；如果第一个值转换成 boolean 值之后为 false，则输出第一个值，且第二个值不在执行。（取第一个为 false 的值，如果都为 true ，则输出最后一个值。）

```js
var result = true && 3 // 3
var result = 1 && 3 // 3
var result = [] && '' // ''
var result = false && 3 // false
var result = '' && 3 // ''
var result = null && true // null

var num = 0
var result = '' && num++ // ''  num = 0
```

`&&` 使用场景

```js
function animate(fn) {
  fn && fn()
}
// 不传参数不会报错
animate()
```

- `||` 如果第一个值转换成 boolean 值之后为 true， 则输出第一个值，且第二个值不在执行；如果第一个值转换成 boolean 值之后为 false，则输出第二个值，以此类推，（取第一个为 true 的值，如果都为 false ，则输出最后一个值。）

```js
var result = true || 3 // true
var result = 1 || 3 // 1
var result = [] || '' // []
var result = false || 0 // 0
var result = '' || 3 // 3
var result = num || true // true

var num = 0
var result = 3 || num++ // 3  num=0
```

`||` 使用场景

```js
// 1.兼容性问题：
var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

// 2. 函数的参数默认值
function sum(n) {
  n = n || 10 // 给形参 n 设置默认值
  console.log(n + 10)
}
sum()
```

## 操作符的优先级

从高到低如下：

- () 优先级最高

- 一元运算符 ++ -- !

- 算数运算符 先 \* / % 后 + -

- 关系运算符 > >= < <=

- 相等运算符 == != === !==

- 逻辑运算符 先 && 后 ||

- 赋值运算符 =

## 空值合并操作符 `??`

注意与或操作符区别

```js
var a = b ?? c

// 当且仅当 b 为 null 或 undefined 时，返回 c，否则返回 b

// 等价于
var a
if ( b === null || b === undefined ){
  a = c
} else {
  a = b
}
```

## 可选链操作符 `?.`

在引用为空(nullish) (`null` 或者 `undefined`) 的情况下不会引起错误，会短路返回值，返回 undefined

```js
// 访问属性、调用方法
obj?.customMethod?.()

// 数组取值
arr?.[5]

// 短路计算
let obj1 = null
let a = 0
let prop1 = obj1?.[a++] // a => 0

let obj2 = 0
let b = 0
let prop2 = obj2?.[b++] // b => 1
```
