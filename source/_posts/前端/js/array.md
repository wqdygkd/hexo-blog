## Array 对象

```js
arr.join() // 将数组的值拼接成字符串 不传参数，默认用逗号进行拼接，返回拼接好的字符串
```

- 数组的增删操作

```js
arr.push() // 从后面添加一个或多个元素，多个参数逗号隔开，返回新数组的 length
arr.pop() // 从数组的后面删除元素，返回删除的那个元素
arr.unshift() // 从数组的前面的添加元素，，多个参数逗号隔开，返回新数组的 length
arr.shift() // 从数组的最前面删除元素，返回删除的那个元素
arr.push(arr1) // 把 arr1 当成一个整体放到 arr 里
```

- 数组的翻转与排序

```js
arr.reverse() // 翻转数组
arr.sort() // 数组的排序

// sort 方法可以传递一个函数作为参数，这个参数用来控制数组如何进行排序
arr.sort(function(a, b) {
  // 参数为 true 时，即返回值 > 0 时，交换位置
  // return a - b // 从小到大排序
  return b - a // 从大到小排序
})
```

- 数组的拼接与截取

```js
// concat：数组合并，返回一个新数组，原数组不受影响
var newArr = arr.concat(arr2) // 把 arr 和 arr2 中的所有元素放到 newArr 里

// slice: 数组切分，复制数组的一部分到一个新数组，并返回这个新数组，原数组不受影响
// slice(begin, end) 包含 begin，不包含 end， begin 和 end 为下标
// slice(begin) 只有一个参数时，为开始参数，截取到末尾
// slice() 没有参数，全部截取
// 可以为负数，会将字符串的长度与对应的负数相加，结果作为参数，-1 表示从后数第一个
var newArr = arr.slice(begin, end)

// splice: 删除或者增加数组元素，修改原数组，返回删除的内容（数组形式）
// start: 开始位置  deletedCount: 删除的个数（如果不删除为 0）items: 替换的内容, 可为多个
arr.splice(start) // 删除原数组 start 位置之后的项（包含 start），返回删除的内容
arr.splice(start, deletedCount, [items]) // items 将作为 arr 的一项

// 练习：
var arr = ['赵云', '马超', '刘备', '关羽', '张飞']
// 截取['刘备','关羽']
// 在马超后面增加马腾
arr.splice(2, 0, '马腾')
// 删除关羽
```

- 数组查找元素

```js
// indexOf 方法返回数组中某个元素第一次出现的位置，如果找不到，返回 -1
// 可以用来判断元素是否在数组中
// fromIndex 表示从 fromIndex 下标开始查找
arr.indexOf('zs', [fromIndex])

// lastIndexOf() 从后面开始查找数组中元素出现位置,即查找某元素最后一次出现的位置
// 如果找不到，返回 -1
arr.lastIndexOf('zs', [fromIndex])
```

- 清空数组

```js
// 1. arr.splice(0,arr.length) // 删除数组中所有的元素
// 2．arr.length = 0 // 直接修改数组的长度
// 3．arr = [] // 将数组赋值为一个空数组，推荐
```

- 数组综合练习

```js
var arr = ['c', 'a', 'z', 'a', 'x', 'a', 'a', 'z', 'c', 'x', 'a', 'x']
// 1. 找到数组中第一个a出现的位置
// 2. 找到数组中最后一个a出现的位置
// 3. 找到数组中每一个a出现的位置
// 4. 数组去重，返回一个新数组
// 5. 获取数组中每个元素出现的次数
```

!> 补充数组对象方法

> **forEach()**

```js
// 语法
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
// 返回值: undefined
// 不支持 return 操作输出，return 只用于控制循环是否跳出当前循环
```

> **arr.map()**

```js
// 语法
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

> **arr.filter()**

```js
// 语法
var newArr = arr.filter(function(item, index) {
  // 参数同 map
  // 使用 return 操作输出，会循环数组每一项，并返回判断为 true 的每一项组成的数组
  return item > 2 && item < 5 // return 后是判断条件
})
// 不修改原数组
// 返回一个新数组，新数组每一项满足 2 < item < 5
```

> arr.some()

```js
// 语法
var newArr = arr.some(function(item, index) {
  // 参数同 map
  // 返回布尔值，只要有一项满足条件就返回 true，否则返回 false
  return item > 2 // return 后是判断条件
})
// 不修改原数组
```

> arr.every()

```js
// 语法
var newArr = arr.every(function(item, index) {
  // 参数同 map
  // 返回布尔值，只有所有项都满足条件才返回 true，否则返回f alse
  return item > 2 // return 后是判断条件
})
// 不修改原数组
```

> **arr.includes()**

判断数组是否含有某值，输出 true 或 false

```js
var new1 = arr.includes(5)
console.log(new1)
```

必须完全匹配才会返回 flase（实用性不如正则）

> **arr.find()**

```js
// 语法
var newArr = arr.find(function(item, index) {
  // 参数同 map
  // 使用 return 操作输出，会循环数组每一项，当遍历循环到判断到一个为 true 则跳出循环，输出当前数组元素
  return item > 2 // return 后是判断条件
})
// 不修改原数组
// 返回一个数组元素，如果全不满足返回 undefined
```

> arr.findIndex()

```js
// 语法
var newArr = arr.findIndex(function(item, index) {
  // 参数同 map
  // 使用 return 操作输出，会循环数组每一项，当遍历循环到判断到一个为 true 则跳出循环，输出当前数组元素的下标
  return item > 2 // return 后是判断条件
})
// 不修改原数组
// 返回一个数组元素的下标，如果全不满足返回 -1
```

> **arr.reduce()**

```js
// 语法
var new1 = arr.reduce(function(pre, next, index) {
  // pre 第一次为数组第一项，之后为上一操作的结果
  // next 数组的下一项
  // index next项的序列
  // arr 可选。当前数组
  // 使用 return 操作输出
  return pre + next // 返回数组每一项的和
})
// 不修改原数组
```

```js
// 扁平化数组
var arr2 = [
  [1, 2, 3],
  [4, 5],
  [6, 7]
]
var new2 = arr2.reduce(function(pre, next, index) {
  return pre.concat(next) // 前数组拼接后数组 .concat()
})
```

```js
// 对象数组叠加计算
var arr3 = [
  { price: 1, count: 1 },
  { price: 2, count: 2 },
  { price: 3, count: 3 }
]
var new3 = arr3.reduce(function(pre, next, index) {
  return pre + next.price * next.count

  // 当需要操作第一项的时候，利用 reduce(callbreak(){},往数组第一项前添加一项，如:0)
}, 0) // 在原数组第一项添加为 0，不改变原数组
```
