---
title: parseInt 和 parseFloat
tags:
  - js
id: 2030
categories:
  - 前端
date: 2021-09-12
---

## 语法

> `parseInt()` 函数解析一个字符串参数，指定该字符串为指定基数的进制值，并返回一个 10 进制的整数，如果被解析参数的第一个字符无法被转化成数值类型，则返回 `NaN`
>
> 参考 [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

```js
// 语法
parseInt(string, radix)
// string 要被解析的值，如果参数不是一个字符串，则将其转换为字符串
// radix 基数,表示进制，介于 2 和 36 之间的整数，参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。如果输入的 string 以 "0x"或 "0x"（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被解析为十六进制数。如果输入的 string以 "0"（0）开头， radix被假定为10（十进制）。如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。

// 返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN
parseInt('123', 5) // 将 '123' 看作 5 进制数，返回十进制数 38
parseInt('4215213', 5)   // 4 * 5^2 + 2 * 5^1 + 1 * 5^0 = 111 返回 111
// [1, 2, 3].map(parseInt) // [1, NaN, NaN]
// [1, 2, 3].map(parseInt(item, index))
```

> `parseFloat()` 函数解析一个字符串参数并返回一个浮点数，如果给定值不能被转换成数值，则会返回 NaN

```js
// 语法
parseFloat(value) // value 需要被解析成为浮点数的值
parseFloat('3.14') // 3.14

// [1, 2, 3].map(parseFloat) // [1, 2, 3]
```

## 问题

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

parseInt((5e-7).toFixed()) // => 0

parseFloat(9999999999999999) // 10000000000000000
```
