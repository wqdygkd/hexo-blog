---
title: javascript 基础
tags:
  - js
id: '1653'
categories:
  - 前端
date: 2018-09-08 14:35:18
---

通过 `src` 请求到的 `js` 文件，会被解析到 `script` 标签内，并且覆盖原 `script` 标签内的 `js` 代码

script 标签的 src 属性可以写任何路径或文件，并不仅仅只能写 js 文件

如果重新声明 js 变量，该变量的值不会丢失 `var car='yellow'; var car` car 的值依然是 'yellow'

```js
010 === 8 // 八进制
0xa === 10 // 十六进制
1 / 0 // Infinity (无穷大)
```

null 出现场景

- str.match()方法匹配不到返回 null
- 通过 document.querySelector、getElementById() 获取不到元素返回 null

undefined 出现场景
- 已声明未赋值的变量
- 没有明确返回值的变量：获取对象不存在的属性，数组下标不存在，函数没有返回值，函数参数没有传入

switch 语句在比较值时使用的是 **全等** 操作符, 因此不会发生类型转换（例如，字符串'10' 不等于数值 10）

Date() 和 new Date() 区别
