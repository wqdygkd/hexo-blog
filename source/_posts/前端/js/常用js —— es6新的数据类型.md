---
tltle: 常用js —— es6新的数据类型
id: 2048
date: 2019/10/21
updated: 2022-03-15
---

# Set 数据类型

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用

Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的

Set 中判断两个值是否相等的算法不同于 `===`，在 Set 内部，两个 NaN 是相等

```js
let a = [NaN, NaN, undefined, undefined, +0, -0, {}, {}]
let b = new Set(a) // [NaN, undefined, 0, {}, {}]
```

属性

Set.length 为 0
Set.prototype.size 返回 Set 对象值得个数

操作方法

```js
Set.prototype.add(value) // 在尾部添加某个值，返回该 Set 本身
Set.prototype.delete(value) // 移除Set的中与这个值相等的元素，即如果该元素存在，返回true，否则返回false
Set.prototype.has(value) // 返回一个布尔值，表示该值是否为 Set 的成员
Set.prototype.clear() // 移除 Set 对象内的所有元素
Set.prototype.values() // 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值
Set.prototype.keys() // 与values()方法相同
Set.prototype.entries() // 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。为了使这个方法和Map对象保持相似，每个值的键和值相等
Set.prototype.forEach(callbackFn[, thisArg])
// Set 结构的键名就是键值（两者是同一个值），因此 forEach 遍历时 callbackFn 前两个参数是同一个值
```

Set Array 互相转化

```js
Array.from(mySet) // Set ==> Array
[...mySet] // Set ==> Array
new Set(myArray) // Array ==> Set
[...new Set(myArray)] // 数组去重
```

使用 Set 实现并集（Union）、交集（Intersect）和差集（Difference）

```js
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
function union(setA, setB) {
  return new Set([...setA, ...setB])
}

// 交集
function intersect(setA, setB) {
  return new Set([...setA].filter(x => setB.has(x)))
}

// 差集
function difference(setA, setB) {
  return new Set([...setA].filter(x => !setB.has(x)))
}
```

# Map

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值
Map 中 NaN 是与 NaN 相等的（虽然 NaN !== NaN），剩下所有其它的值是根据 === 运算符的结果判断是否相等

属性

```js
Map.length // 0
Map.prototype.size // 返回 map 对象键值对的个数
```

方法

```js
Map.prototype.clear() // 移除 Map 对象的所有键/值对
Map.prototype.delete(key) // 如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false
Map.prototype.entries() // 返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的 [key, value] 数组
Map.prototype.forEach(callbackFn[, thisArg]) // 按插入顺序，为 Map 对象里的每一键值对调用一次 callbackFn 函数。如果为 forEach 提供了 thisArg，它将在每次回调中作为 this 值
Map.prototype.get(key) // 返回键对应的值，如果不存在，则返回 undefined
Map.prototype.has(key) // 返回一个布尔值，表示 Map 实例是否包含键对应的值
Map.prototype.keys() // 返回一个新的 Iterator 对象， 它按插入顺序包含了 Map 对象中每个元素的键
Map.prototype.set(key, value) // 设置 Map 对象中键的值。返回该 Map 对象
Map.prototype.values() // 返回一个新的 Iterator 对象，它按插入顺序包含了 Map 对象中每个元素的值
```

迭代 Map

```js
for (var [key, value] of myMap) {
  console.log(key + ' = ' + value)
}

myMap.forEach(function(value, key) {
  console.log(key + ' = ' + value)
})
```

Map 和数组的关系

```js
var kvArray = [['key1', 'value1'], ['key2', 'value2']]

// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个 Map 对象
var myMap = new Map(kvArray)

myMap.get('key1') // 返回值为 'value1

// 使用 Array.from 函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)) // 输出和 kvArray 相同的数组
```

合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的

```js
// 展开运算符本质上是将Map对象转换成数组
var merged = new Map([...map1, ...map2])
```

# WeakMap

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的

正由于这样的弱引用，WeakMap 的 key 是不可枚举的，即无法遍历
WeakMap 没有size属性
没有clear()方法

# symbol

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol
