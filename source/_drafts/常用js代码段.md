---
title: 常用 js 代码段汇总
categories:
  - [js]
date: 2019/07/22
updated: 2019/10/24
---

### 判断一个变量是字符串

类型识别

```js
Object.prototype.toString.call('str') // '[object String]'
typeof 'str' // 'string'
```

### getRawType：获取数据类型，返回结果为 Number、String、Object、Array 等

```js
function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
```

### isObject：判断数据是不是引用类型的数据 (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))

```js
function isObject(value) {
  let type = typeof value
  return value != null && (type == 'object' || type == 'function')
}
```

### isPlainObject：判断数据是不是 Object 类型的数据

```js
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
```

### isArray：判断数据是不是数组类型的数据

```js
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
```

### 将 isArray 挂载到 Array 上

```js
Array.isArray = Array.isArray || isArray
```

### isRegExp：判断数据是不是正则对象

```js
function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}
```

### isDate：判断数据是不是时间对象

```js
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]'
}
```

### 进制转换

parseInt(str,radix) // 任意进制转换为 10 进制整数值
与 Number.toString(radix) 返回表示该数字的指定进制形式的字符串

### 常用正则

```js
// 匹配邮箱
let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$

// 匹配手机号
let reg = /^1[0-9]{10}$/;

// 匹配8-16位数字和字母密码的正则表达式
let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

// 匹配国内电话号码 0510-4305211
let reg = /\d{3}-\d{8}|\d{4}-\d{7}/;

// 匹配身份证号码
let reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

// 匹配腾讯QQ号
let reg = /[1-9][0-9]{4,}/;

// 匹配ip地址
let reg = /\d+\.\d+\.\d+\.\d+/;

// 匹配中文
let reg = /^[\u4e00-\u9fa5]*$/
```

### 检测平台（设备）类型

```js
isWechat = /micromessenger/i.test(navigator.userAgent)
isWeibo = /weibo/i.test(navigator.userAgent)
isQQ = /qq\//i.test(navigator.userAgent)
isIOS = /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent)
isAndroid = /android/i.test(navigator.userAgent)
```

### 格式化

```js
/**
 * 时间格式化
 * @param {date} timeStamp 要格式化的时间对象
 * @return {string} 2019年10月31日 16:22
 */

function format_date(timeStamp) {
  let date = new Date(timeStamp)
  return date.getFullYear() + '年' + prefix_zero(date.getMonth() + 1) + '月' + prefix_zero(date.getDate()) + '日 ' + prefix_zero(date.getHours()) + ':' + prefix_zero(date.getMinutes())
}
```

```js
/**
 * 数字格式化
 * @param {number} num 要格式化的数值
 * @return {string} 把小于10的数值前面加上0
 */
function prefix_zero(num) {
  return num >= 10 ? num : '0' + num
}
```

```js
/**
 * 倒计时时间格式化
 * @param {date} timeStamp 要格式化的时间对象
 * @return {string}
 * 若时间大于1天 返回 n天n小时n分钟
 * 若时间小于1天，大于1小时 返回 n小时n分钟n秒
 * 若时间小于1小时，大于1分钟 返回 n分钟n秒
 * 若时间小于1分钟 返回 n秒
 */
function format_time(timeStamp) {
  let day = Math.floor(timeStamp / (24 * 3600 * 1000))
  let leave1 = timeStamp % (24 * 3600 * 1000)
  let hours = Math.floor(leave1 / (3600 * 1000))
  let leave2 = leave1 % (3600 * 1000)
  let minutes = Math.floor(leave2 / (60 * 1000))
  let leave3 = leave2 % (60 * 1000)
  let seconds = Math.floor(leave3 / 1000)
  if (day) return day + '天' + hours + '小时' + minutes + '分'
  if (hours) return hours + '小时' + minutes + '分' + seconds + '秒'
  if (minutes) return minutes + '分' + seconds + '秒'
  if (seconds) return seconds + '秒'
  return '时间到！'
}
```

```js
/**
 * 明天的字符串格式时间
 * @return {string} 返回当前时间 + 1天
 */
const tomorrow = () => {
  let t = new Date()
  t.setDate(t.getDate() + 1)
  return t.toLocalString()
}
```

### 敏感符号转义

```js
function entities(s) {
  let e = {
    '"': '&quot;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return s.replace(/["<>&]/g, m => {
    return e[m]
  })
}
```

### 数组去重

```js
function distinct(arr) {
  return arr.filter((v, i, array) => array.indexOf(v) === i)
}
```
