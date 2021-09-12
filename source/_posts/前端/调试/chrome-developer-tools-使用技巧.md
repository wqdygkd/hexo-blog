---
title: Chrome Developer Tools 使用技巧
tags:
  - chrome
id: '419'
categories:
  - 前端
date: 2019-08-25 22:27:03
---

### console.log()

占位符 %o 它接受对象，%s 接受字符串，%d 表示小数或整数，%c CSS 值的占位符,对应的后面的参数必须是 CSS 语句

如：

```js
console.log('%s 的价格是 %d 磅 %d 便士', '衬衫', 9, 15)
```

输出：衬衫的价格是 9 磅 15 便士

如：

```js
console.log('I am a %cbutton', 'color: white; background-color: orange; padding: 2px 5px; border-radius: 2px')
```

输出：I am a <span style="color: white; background-color: orange; padding: 2px 5px; border-radius: 2px">button</span>

### console.dir()

### console.warn()

输出警告信息，字的颜色是黄色的，用于区分或过滤掉无用的输出

### console.table()

将数据以表格的形式输出，对于数据列表的输出更容易观察其数据结构，并且点击输出的表头可以对数据排序

第二个可选参数是需要输出的字段。默认输出所有字段

```js
console.table(data) // 输出全部
console.table(data, ['id', 'price']) // 输出 data 中的 id price 字段
```

### console.count()

计数器，可以用来统计代码被执行的次数

```js
for (let i = 0; i < 5; i++) {
  if (i % 2) {
    console.count('odds')
  }
}
```

输出结果为：

```
odds: 1
odds: 2
```

```js
console.countReset() // 可以使用它重置计数器。
```

### console.time()

是一个用于跟踪操作时间的专用函数，可以用来跟踪 js 的执行时间

```js
const a = () => {
  console.time('a')
  // do something
  console.timeEnd('a')
}
console.time()

for (i = 0; i < 10; ++i) {
  a()
}
console.timeEnd()
```

### 选择 DOM 元素

- 在谷歌开发控制台中, 可以使用 `$('选择器')` 类似于 jquery 的方式选择 DOM 元素

`$('')` 等效于 `document.querySelector('')`，这将返回 DOM 中与选择器匹配的第一个元素，可以使用 `$$(tagName)` 或 `$$(.class)`，选择 DOM 的所有元素并返回一个数组。可以通过下标获取指定的元素，例如，`$$('.box')` 获取具有类 box 的所有元素，`$$('.box')[0]`和 `$$('.box')[1]`分别获取第一个和第二个元素

- `inspect($('selector'))` 将检查与选择器匹配的元素，并转到 Elements 选项卡

* `$0`，`$1`，`$2` 等可以获取最近检查过的元素，即通过 `$0` 即可直接获取当前高亮的元素，`$1` 可以获取上一个高亮的元素

### 将页面转换为可编辑状态

在 Console 中输入:

```js
document.body.contentEditable = true
```

之后页面中的内容即为可编辑状态，可以编辑 DOM 中的任何内容

### 查找与 DOM 中的元素关联的事件

`getEventListeners($('selector'))` 返回一个对象数组，其中包含绑定到该元素的所有事件。你可以展开对象来查看事件

要找到特定事件的侦听器，可以这样做:

```js
getEventListeners($('selector')).eventName[0].listener

// 将显示与 id 为 btn 的元素的单击事件关联的侦听器
getEventListeners($('btn')).click[0].listener
```

或

控制台 => Element => EventListeners

https://segmentfault.com/q/1010000002892890

### 监控事件

监视绑定到 DOM 中特定元素的事件，然后在它们被触发后立即将它们记录在控制台中

```js
// 监控绑定到 '#box' 元素的所有事件
monitorEvents($('#box'))

// 监控绑定到 'selector' 元素的 click 事件
monitorEvents($('#box'), 'click')

// 监控绑定到 'selector' 元素的 click 和 focus 事件
monitorEvents($('#box'), ['click', 'focus'])

// 停止监视
unmonitorEvents($('#box'))
```

检索最后一个结果的值
`$_` 表示控制台中最近一次返回的值

```
1 + 1
> 2

$_
> 2
```
