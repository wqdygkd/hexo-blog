---
title: 常用js —— array数组操作
tags:
  - js
id: 2033
categories:
  - 前端
date: 2022-02-13
updated: 2022-02-13
---

### 基本方法

> **`arr.join()`**

将数组的值拼接成字符串 不传参数，默认用逗号进行拼接，返回拼接好的字符串

> **`arr.push()`**

从后面添加一个或多个元素，多个参数逗号隔开，返回新数组的 length

```js
arr.push(arr1) // 把 arr1 当成一个整体放到 arr 里
```

> **`arr.pop()`**

从数组的后面删除元素，返回删除的那个元素

> **`arr.unshift()`**

从数组的前面的添加元素，，多个参数逗号隔开，返回新数组的 length

> **`arr.shift()`**

从数组的最前面删除元素，返回删除的那个元素

> **`arr.reverse()`**

翻转数组

> **`arr.sort()`**

排序

sort 方法可以传递一个函数作为参数，这个参数用来控制数组如何进行排序

```js
arr.sort(function(a, b) {
  // 参数为 true 时，即返回值 > 0 时，交换位置
  // return a - b // 从小到大排序
  return b - a // 从大到小排序
})
```

> **`arr.concat()`**

数组合并，返回一个新数组，原数组不受影响

```js
a.concat(b) // [...a, ...b]
```

> **`arr.slice()`**

数组切分，复制数组的一部分到一个新数组，并返回这个新数组，原数组不受影响

```js
// slice(begin, end) 包含 begin，不包含 end， begin 和 end 为下标
// slice(begin) 只有一个参数时，为开始参数，截取到末尾
// slice() 没有参数，全部截取
// 可以为负数，会将字符串的长度与对应的负数相加，结果作为参数，-1 表示从后数第一个
var newArr = arr.slice(begin, end)
```

> **`arr.splice()`**

删除或者增加数组元素，修改原数组，返回删除的内容（数组形式）

```js
// start: 开始位置  deletedCount: 删除的个数（如果不删除为 0）items: 替换的内容, 可为多个
arr.splice(start) // 删除原数组 start 位置之后的项（包含 start），返回删除的内容
arr.splice(start, deletedCount, [items]) // items 将作为 arr 的一项
```

> **`arr.indexOf()`**

返回数组中某个元素第一次出现的位置，如果找不到，返回 -1

```js
// fromIndex 表示从 fromIndex 下标开始查找
arr.indexOf('zs'[, fromIndex])
```

> **`arr.lastIndexOf()`**

从后面开始查找数组中元素出现位置,即查找某元素最后一次出现的位置，如果找不到，返回 -1

```js
arr.lastIndexOf('zs'[, fromIndex])
```

> **`arr.forEach()`**

返回值: undefined
除了抛出异常以外，没有办法中止或跳出 forEach() 循环
不支持 return 操作输出，return 只用于控制循环是否跳出当前循环

遍历时会自动忽略 empty 值

```js
arr.forEach(function(item, index, arr) {}, thisArg)
// item 必需。数组中正在处理的当前元素
// index 可选。数组中正在处理的当前元素的索引
// arr 可选。当前数组
// thisArg 可选。当执行回调函数时用作this的值
var arr = ['zs', 'ls', 'ww']
arr.forEach(function(item, index, arr) {
  console.log(item)
  console.log(this)
})
```

> **`arr.map()`**

```js
var newArr = arr.map(function(item, index) {
  // item 必需。数组中正在处理的当前元素
  // index 可选。数组中正在处理的当前元素的索引
  // arr 可选。当前数组
  // 使用 return 操作输出，会循环数组每一项，并返回新的每一项组成的数组
  return item * 2
})
// 不修改原数组
// 返回一个新数组，新数组的每一项乘以 2
```

> **`arr.filter()`**

```js
var newArr = arr.filter(function(item, index) {
  // 参数同 map
  // 使用 return 操作输出，会循环数组每一项，并返回判断为 true 的每一项组成的数组
  return item > 2 && item < 5 // return 后是判断条件
})
// 不修改原数组
// 返回一个新数组，新数组每一项满足 2 < item < 5
```

> **`arr.some()`**

```js
var newArr = arr.some(function(item, index) {
  // 参数同 map
  // 返回布尔值，只要有一项满足条件就返回 true，否则返回 false
  return item > 2 // return 后是判断条件
})
// 不修改原数组
```

> **`arr.every()`**

```js
var newArr = arr.every(function(item, index) {
  // 参数同 map
  // 返回布尔值，只有所有项都满足条件才返回 true，否则返回f alse
  return item > 2 // return 后是判断条件
})
// 不修改原数组
```

> **`arr.includes()`**

判断数组是否含有某值，输出 true 或 false

```js
var flag = arr.includes(5)
```

> **`arr.find()`**

使用 return 操作输出，会循环数组每一项，当循环到满足条件时则跳出循环，输出当前数组元素
如果全不满足返回 undefined

```js
var newArr = arr.find(function(item, index) {
  return item > 2
})
// 不修改原数组
```

> **`arr.findIndex()`**

使用 return 操作输出，会循环数组每一项，当循环到满足条件时则跳出循环，输出当前数组元素的下标
如果全不满足返回 -1

```js
var newArr = arr.findIndex(function(item, index) {
  return item > 2
})
// 不修改原数组
```

> **`arr.reduce()`**

```js
var new1 = arr.reduce(function(accumulator, current, index, array) {
  // accumulator 第一次为数组第一项，之后为上一操作的结果
  // current 数组的当前项
  // index 当前项的序列
  // array 可选。当前数组
  // initialValue 可选。作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错
  // 使用 return 操作输出
  return accumulator + current // 返回数组每一项的和
}[, initialValue])
// 不修改原数组
```

```js
// 扁平化数组
var arr2 = [ [1, 2, 3], [4, 5], [6, 7] ]
var new2 = arr2.reduce(function(accumulator, current, index) {
  return accumulator.concat(current)
})
```

```js
// 对象数组叠加计算
var arr3 = [
  { price: 1, count: 1 },
  { price: 2, count: 2 }
]
var new3 = arr3.reduce(function(accumulator, current, index) {
  return accumulator + current.price * current.count

  // 当需要操作第一项的时候，利用 reduce(callbreak(){},往数组第一项前添加一项，如:0)
}, 0) // 在原数组第一项添加为 0，不改变原数组
```

> **`arr.fill()`**

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引

```js
arr.fill(value[, start[, end]])
```

> **`arr.flat()`**

扁平化数组
按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```js
var newArray = arr.flat([depth])

// 使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
arr4.flat(Infinity) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 会移除数组中的空项
var arr4 = [1, 2, , 4, 5]
arr4.flat() // [1, 2, 4, 5]
```


### 伪数组

> 伪数组也叫类数组

1. 伪数组其实就是一个对象，但是跟数组一样，伪数组也会有`length`属性，也有`0, 1, 2, 3`等属性
2. 伪数组并没有数组的方法，不能使用`push/pop`等方法
3. 伪数组可以跟数组一样进行遍历，通过下标操作
4. 常见的伪数组：`arguments`、`document.getElementsByTagName的返回值`、`jQuery对象`

```js
var obj = {
  0: 'zs',
  1: 'ls',
  2: 'ww',
  length: 3
}
```

- 伪数组借用数组的方法

```js
// 给 obj 添加一项
Array.prototype.push.call(obj, 'zl')
// 把 obj 中的每一项使用 '-' 拼接起来返回一个字符串
Array.prototype.join.call(obj, '-')
```

- 将伪数组转换成真数组

```js
// 借用数组的方法
Array.prototype.slice.call(obj)
[].slice.call(obj)

// 使用es6中数组的from方法：从一个类似数组或可迭代对象中创建一个新的数组实例
Array.from(obj)

// 对于函数的arguments参数可以使用扩展运算符
[...arguments]
```
