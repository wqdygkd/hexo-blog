---
title: 前端常用js代码段汇总
tags:
  - js
id: '382'
categories:
  - 前端
date: 2019-07-22 13:20:47
---

## 类型识别

### 获取数据类型，返回结果为 Number、String、Object、Array 等

```js
// 返回数据类型
function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

// 正则 => RegExp
// 时间对象 => Date
// 字符串 => String
// 对象 => Object
// 数组 => Array
```

### 判断变量是不是字符串类型

```js
Object.prototype.toString.call('str') // '[object String]'
typeof 'str' // 'string'
```

### 判断变量是不是引用类型

例如： arrays, functions, objects, regexes, new Number(0),以及 new String('')

```js
function isObject(value) {
  let type = typeof value
  return value != null && (type == 'object' || type == 'function')
}
```

### 判断变量是不是 Object 类型的数据

```js
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
```

### 判断变量是不是数组类型

```js
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

function isArray(arr) {
  return Array.isArray(arr)
}
```

### 将 isArray 挂载到 Array 上

```js
Array.isArray = Array.isArray || isArray
```

## 格式转换

### 数字格式化：小于 10 的数值前面加上 0

```js
/**
 * @param {number} num 要格式化的数值
 * @return {string} 把小于10的数值前面加上0
 */
function prefix_zero(num) {
  return num >= 10 ? num : '0' + num
}
```

### 价格格式化 (1234567 => 1,234,567.00)

```js
/**
 * @param {number} price 价格
 * @returns {string} 1234567 => 1,234,567.00
 */
function formatPrice(price) {
  if (typeof price !== 'number') return price
  return String(Number(price).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// \b 匹配单词边界
// \B 匹配非单词边界
```

其他方式

```js
let a = 123456789 // a 为number类型
a.toLocaleString('en-US') // '123,456,789'

let b = 123456789 // b 可为number类型或string类型
Intl.NumberFormat().format(b) //'123,456,789'
```

### 手机号格式化：隐藏中间四位数字

```js
/**
 * @param {string} mobile 手机号
 * @returns {string}
 */
function formatMobile(mobile) {
  mobile = String(mobile)
  if (!/\d{11}/.test(mobile)) {
    return mobile
  }
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
```

### 进制转换

```js
parseInt(str, radix) // 任意进制转换为 10 进制整数值

Number.toString(radix) //返回表示该数字的指定进制形式的字符串
```

## 常用正则

```js
// 任意正负数字
let reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/

// 匹配邮箱
let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/

// 匹配手机号
let reg = /^1[0-9]{10}$/

// 匹配8-16位数字和字母密码的正则表达式
let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

// 匹配国内电话号码 0510-4305211
let reg = /\d{3}-\d{8}|\d{4}-\d{7}/

// 匹配身份证号码
let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 匹配腾讯QQ号
let reg = /[1-9][0-9]{4,}/

// 匹配ip地址
let reg = /\d+\.\d+\.\d+\.\d+/

// 匹配中文
let reg = /^[\u4e00-\u9fa5]*$/
```

## 检测平台（设备）类型

```js
isWechat = /micromessenger/i.test(navigator.userAgent)
isWeibo = /weibo/i.test(navigator.userAgent)
isQQ = /qq/i.test(navigator.userAgent)
isIOS = /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent)
isAndroid = /android/i.test(navigator.userAgent)
```

## 敏感符号转义

```js
function entities(s) {
  let e = {
    '"': '"',
    '&': '&',
    '<': '<',
    '>': '>'
  }
  return s.replace(/["<>&]/g, (m) => {
    return e[m]
  })
}
```

## 数组去重

```js
function distinct(arr) {
  return arr.filter((v, i, array) => array.indexOf(v) === i)
}

// 对象数组去重
// arr: 目标数组
// id: 唯一属性
function distinct(arr, id) {
  let object = {}
  let objres = arr.reduce((item, next) => {
    object[next[id]] ? '' : (object[next[id]] = true && item.push(next))
    return item
  }, [])
  return objres
}
```

## 数组顺序上移下移

```js
// 对象数组顺序上移下移
// arr: 目标数组

// 上移
arr[index] = arr.splice(index - 1, 1, arr[index])[0]

// 下移
arr[index] = arr.splice(index + 1, 1, arr[index])[0]
```

## 快速创建 a 标签

```js
let a = '超链接'.link('https://wqdy.top')
console.log(a) // <a href="https://wqdy.top">超链接</a>
```

## 正则进阶：

捕获括号：

```
匹配 'wqdy' 并且记住匹配项
/(wqdy)/
```

非捕获括号：

```
匹配 'wqdy' 但是不记住匹配项
/(?:wqdy)/
```

先行断言：

```
匹配'wqdy'仅仅当'wqdy'后面跟着'top'
/wqdy(?=top)/
```

后行断言：

```
匹配'top'仅仅当'top'前面是'wqdy'
/(?<=wqdy)top/
```

正向否定查找：

```
匹配'wqdy'仅仅当'wqdy'后面不跟着'gkd'
/wqdy(?!gkd)/
```

## 判断是否有滚动条

```js
function isScroll() {
  return window.innerWidth - $(document).width() !== 0
}
```
