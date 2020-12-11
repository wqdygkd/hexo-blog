---
title: 遍历总结
tags:
  - js
  - 遍历
id: '396'
categories:
  - - web前端
date: 2018-11-04 22:11:35
---

# 原生 js 中 for 语句

> 循环 、遍历数组

<span class='red'>可使用 continue 跳出当前循环， break 跳出整个循环</span>

```js
// 语法：
// 1. for循环使用分号分隔
// 2. for循环有2个分号，两个分号不能少
for (初始化语句; 判断语句; 自增语句) {
  // 循环体
}

// 普通循环
for (var i = 1; i <= 5; i++) {
  console.log(i)
}

// 遍历数组
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}

// 遍历函数的参数(arguments)
for (var i = 0; i < arguments.length; i++) {}
```

# 原生 js 中数组的 forEach 方法

> 遍历数组

<span class="red">不能用 break continue 语句跳出整个循环</span>
<span class="red">可使用 return 语句跳出当前循环</span>

```js
// 语法
// array.forEach (function(item, index, arr), thisArg)
// item 必需。数组中正在处理的当前元素
// index 可选。数组中正在处理的当前元素的索引
// arr 可选。forEach()方法正在操作的数组，就是当前数组
// thisArg 可选。当执行回调函数时用作this的值
var arr = ['zs', 'ls', 'ww']
arr.forEach(function(item, index, arr) {
  console.log(item)
  console.log(this)
})
// 返回值: undefined
// 不支持 return 操作输出，return 只用于控制循环是否跳出当前循环
```

# 原生 js 中 for...in 语句

> 遍历对象

支持 `break`, `continue` 跳出循环

```js
// 语法：
for (var key in obj) {
  console.log(key) // 键
  console.log(obj[key]) // 值
  console.log(key + '==' + obj[key])
}

// in 操作符：判断对象能否访问到该属性（不管这个属性是自己提供的，还是从原型上继承来的），如果可以访问到， 都会返回 true

// console.log('name' in obj) 返回布尔值
if ('name' in obj) {
  console.log('是')
}
```

如果使用 for in 遍历数组，会产生一些问题

```js
var arr = ['a', 'b', 'c']
a.name = 'd'
for (var index in arr) {
  console.log(index) // '0', '1', '2', 'name'
}
```

1. 数组的索引值 index 是 String 类型
2. 会将 expando 属性也遍历出来
3. 在某些情况下，在遍历数组元素时顺序是任意的

<span class="red">for-in 语法是被设计来遍历普通的“键值对”对象的，不适合用在数组上</span>

# es6 for...of 方法

遍历类数组集合(Array, Map, Set, String, Arguments)

```js
let arr = [1, 2, 3, 4]
for (const item of arr) {
  console.log(item)
}
```

支持 `break`, `continue` 和 `throw`

# for...of 与 for...in 的区别

[参考 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

无论是 for...in 还是 for...of 语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

for...in 语句以任意顺序迭代对象的可枚举属性。

for...of 语句遍历可迭代对象定义要迭代的数据。

# jquery 中的 each 方法

> 遍历 jQuery 对象集合，为每个匹配的元素执行一个函数

```js
// 语法：
$(selector).each(function(index, element) {
  // index 表示当前元素在所有匹配元素中的索引号
  // element 表示当前元素 dom 对象
  // this 在函数内部，this指向了element
})

$('li').each(function(index, ele) {
  // $(ele).css("backgroundColor", arr[index])
  $(this).css('backgroundColor', arr[index])
})
```

# php 中 foreach 语句

> 用来遍历数组(关联数组和索引数组均可)。

```php
// 语法
foreach($arr as $key => $value) {
  // $arr: 要遍历的数组
  // $key: 键，可以是任意变量名
  // $value: 值，可以是任意变量名
}
foreach($arr as $value) {

}
```

```php
// 遍历关联数组
$arr = array(
  "name"=>"zs",
  "age"=>18,
  "sex"=>20
);
foreach($arr as $k => $v) {
  echo $k . "=" . $v . "<br>";
}
```
