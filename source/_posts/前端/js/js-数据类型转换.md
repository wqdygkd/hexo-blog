---
title: js 中的数据类型转换
tags:
  - js
id: 2029
categories:
  - 前端
date: 2021-09-12
---


#

## 转换成字符串

- 调用 `toString()` 方法 （显式转换）

```js
var a = 1
a.toString() // '1'
```

null 、undefined 没有 toString() 方法

- 调用 `String()` 构造函数（显式转换）

```js
String(1) // '1'
```

- 直接和字符串做加法运算（隐式转换）

```js
// 任意数据类型的变量和字符串做加法运算结果都是字符串
1 + '' // '1'
true + '' // 'true'
```

- 引用类型转换成字符串

```js
[].toString() // ''
[1, 2].toString() // '1,2'
({}).toString() // "[object Object]"

[1, '123', [], undefined, null, NaN, true ].toString() // "1,123,,,,NaN,true"
```

## 转换成数值

- `Number()`

```js
Number('123') // 123
Number('123c') // NaN
// 如果字符串不能转换成合法数字，转换结果为 NaN
```

- 使用 `parseInt()`

```js
parseInt('12.3') // 12 只保留整数

parseInt('15xyz') // 15
parseInt('15x6yz') // 15
// 如果字符串里有非法的数字，会逐个转换，直到遇到无法转化的字符串为止
```

- 使用 `parseFloat()` 完成

```js
parseFloat('12.34') // 12.34 可以保留小数位
```

- 让字符串和数字做除了加法以外的运算（隐式转换）

```js
var d = '345'
+d === 345 // true
d - 0 === 345 // true
d * 1 === 345 // true
d / 1 === 345 // true
```

- 引用类型转换成数值

```js
// 空数组为 0，存在一个元素且可转换成数字，则转换成该数字，其他情况为 NaN
+[] // 0
+['2'] // 2
+['1', '2'] // NaN
+{} // NaN
```

## 转换成布尔值

**0, NaN, 空字符串，undefined, null, false 会被转换成为 false**

- 使用 `Boolean()` 完成

```js
Boolean(123) // true
// 对于数字类型来说：一般的数字都转换成为 true，0、NaN 会被转换成为 false

Boolean('123') // true
Boolean(' ') // true
Boolean('') // false
// 字符串中只有空的字符串会被转换成为 false

Boolean(undefined) // false
Boolean(null) // false
```

- 使用 `!!`

```js
!!2 // true
```

- 自动转换

```js
if ('') { console.log('哈哈') }
```

## 变量转换表

| Value     | Boolean  | Number                                           | String                                                             |
| --------- | -------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| undefined | false    | **NaN**                                          | "undefined"                                                        |
| null      | false    | **0**                                            | "null"                                                             |
| true      | true     | 1                                                | "true"                                                             |
| false     | false    | 0                                                | "false"                                                            |
| ""        | false    | 0                                                | ""                                                                 |
| "123"     | true     | 123                                              | "123"                                                              |
| "1a"      | true     | NaN                                              | "1a"                                                               |
| 0         | false    | 0                                                | "0"                                                                |
| 1         | true     | 1                                                | "1"                                                                |
| Infinity  | true     | Infinity                                         | "Infinity"                                                         |
| NaN       | false    | NaN                                              | "NaN"                                                              |
| {}        | **true** | NaN                                              | "[object Object]"                                                  |
| 数组      | true     | 空数组为 0，存在一个元素且为数字转数字，其他 NaN     | [1, '123', [], undefined, null, NaN, true ] => "1,123,,,,NaN,true" |
