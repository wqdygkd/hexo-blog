---
title: 常用js —— string字符串操作
tags:
  - js
id: 2032
categories:
  - 前端
date: 2022-02-12
updated: 2022-02-13
---

### String 对象

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String

> 操作字符串的方法**不会改变原来的字符串**，需要新字符串去接收

- **查找指定字符串**

```js
str.indexOf(searchString[, position]) // 获取某个字符串第一次出现的位置，如果没有，返回-1。可选参数position可设置从str的某个指定的位置开始查找
str.lastIndexOf(searchString[, position]) // 从后面开始查找某个字符串第一次出现的位置。如果没有，返回-1

str.search(regexp) // 输出第一次出现位置，找不到输出-1
str.match(regexp) // 输出匹配到的第一个字符，匹配不到返回 null
str.match(regexp/g) // 全部输出

str.startsWith(str1) // 判断 str 字符串是否以 str1 字符串开头，若符合返回 true
	// 等价于判断 str.indexOf(str1) === 0

str.endsWith(str1) // 判断 str 字符串是否以 str1 字符串结尾，若符合返回 true
	// 等价于判断 str.indexOf(str1) === str.length - str1.length
```

str.includes(searchString[, position]) 用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false

- **str.trim()**

去除字符串两边的空格，内部空格不会去除

- **大小写转换**

`str.toUpperCase()` 全部转换成大写字母
`str.toLowerCase()` 全部转换成小写字母

- **字符串拼接与截取**

字符串拼接 可以用 concat，用法与数组一样，但是一般都用 `+`

`str.slice(start, end)`

从 start 开始，end 结束，并且取不到 end，没有 end 则截取从 start 到末尾
start 和 end 都不是必选，`str.slice()` 与 `str.slice(0)` 等价 截取全部，
start 和 end 可以是任意参数，参数应该是先调用Number()， 结果是NAN转换成0输出， 结果是整数直接输出， 结果是小数，再调用parseInt() 转化为整数输出
start 和 end 可以是负数，会将字符串的长度与对应的负数相加，结果作为参数，如果还是负数，不会递归继续与字符长度相加，取 0

`str.substring(params1, params2)`

以两个参数中较小一个作为起始位置，较大的参数作为结束位置，不包括结束位置，只有一个参数则截取到末尾
params1, params2 都不是必选，`str.substring()` 与 `str.substring(0)` 等价 截取全部
可以是任意参数，参数应该是先调用Number()， 结果是NAN转换成0输出， 结果是整数直接输出， 结果是小数，再调用parseInt() 转化为整数输出
可以是负数，负参数会被直接转换为 0

`str.substr(start, length)`

从 start 开始，截取 length 个字符，没有 length 则截取到末尾
可以是任意参数，参数应该是先调用Number()， 结果是NAN转换成0输出， 结果是整数直接输出， 结果是小数，再调用parseInt() 转化为整数输出
start 参数为负参数时，会将参数与字符串长度相加后的结果作为参数，如果还是负数，不会递归继续与字符长度相加，取 0
length 参数为负数时，会被转化为 0 ，即截取长度为 0

- **字符串切割**

```js
str.split(separator[, limit]) // 将字符串分割成数组

var str = 'zs,ls,ww'
var arr = str.split(',', 1) // ['zs']
var arr = str.split() // ['zs,ls,ww']
```

- **字符串替换**

```js
// 语法
str.replace(regexp|substr, replacement)

// 参数：regexp/substr: 需要替换的内容    replacement: 替换文本或生成替换文本的函数  默认只替换第一个匹配子串
str.replace(/regexp/g, replacement) // 全部替换

str.replace(/ /g, '') // 将全部空格去掉

// replaceAll 全部替换
```

replace() 方法的参数 replacement 可以是函数。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身。

- **`str.charAt(pos)`**

pos参数可以是任意, 参数应该是先调用Number()， 结果是NAN转换成0输出，结果是整数直接输出，结果是小数，再调用 Math.ceil() 转化为整数输出
str.charAt() === str.charAt(0)

如果pos小于0或者大于等于字符串的长度str.length，返回空字符串

- **`padEnd() padStart()`**

padEnd() padStart() 方法用另一个字符串填充当前字符串(如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。padStart()从当前字符串的左侧开始填充，padEnd()从当前字符串的右侧开始填充

- 寻找重复最多的字符以及个数

```js
var str = 'shdshdfjkfjfdgjkjdksgjskdjfsfsfsfjksjkfdkjf'
var arr = str.split('').sort()
str = arr.join('')
var count = 0
var char = 0
var reg = /(\w)\1+/g
str.replace(reg, function(a, b, c, d) {
  console.log(a, b, c, d) // a 匹配模式的字符串 b 与模式中的子表达式匹配的字符串 c 匹配在 str 中出现的位置 d  str 本身
  if (a.length > count) {
    count = a.length
    char = b
  }
})
console.log(str)

console.log('最多的字符为:' + char + ';个数为:' + count)
```
