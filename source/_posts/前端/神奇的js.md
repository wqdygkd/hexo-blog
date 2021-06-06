---
title: 神奇的js
tags: []
id: '2009'
categories:
  - 前端
date: 2018-04-07
---

```js
(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]] === 'sb'
```

短路表达式、三元表达式

```js
a = b && 1
// 相当于
a = !!b ? 1 : b
if (b) { a = 1 } else { a = b }

a = b || 1
// 相当于
a = !!b ? b : 1
if (b) { a = b } else { a = 1 }
```

取整(不四舍五入)

```js
~~2.33 === 2
2.33 | 0 === 2
2.33 >> 0 === 2
Math.floor(2.33)
```

```js
'0' == 0 // true
0 == [] // true

'0' == [] // false
```

```js
+[] // 0
+{} // NaN

[].toString() // ''
({}).toString() // "[object Object]"
{}.toString() // Uncaught SyntaxError: Unexpected token '.'

0 + [] // '0'
0 + {} // "0[object Object]"

{} + [] === 0 // true  {} 被解析为空的 block， + 被解析为正号运算符，结果等于 +[]
[] + {} === "[object Object]" // true [] 被解析为数组，后续的 + 被解析为加法运算符
({} + []) // '[object Object]  括号会阻止js将{}识别为block，因此他的运算结果与 []+{} 一致
console.log({} + []) // '[object Object]  当表达式作为参数传递给函数时，不会被默认为新的block
console.log({} + [] === 0)  // false

[] + {} === {} + [] // true
```

```js
null >= 0 // false
null <= 0 // false
null == 0 // false
null >= null // true Number(null)  >=  Number(null)
null == false // false

Number(null) // 0
Number(undefined) // NaN

// 在关系运算符中，null，undefined 会被 Number()强制转换成数字类型 Number(null) => 0,  Number(undefined) => NaN
// 在相等运算符中，null，undefined 在与自身对比或 null与undefined对比为 true，其他情况为 false
```

```js
parseInt(0.0000005) === 5
// 如果 parseInt 第一个参数不是字符串，会将其转换成字符串，之后在解析
// 小于 10-6 的浮点数以指数表示
// parseint 从 float 的指数法中提取整数
String(0.0000005) // => '5e-7'
parseInt(5e-7) // => 5
parseInt('5e-7') // => 5

parseInt(1111111111111111111111) // => 1
parseInt(999999999999999999999) // => 1
```
