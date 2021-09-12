---
title: js 模块化编程
tags:
  - js
  - 模块化
id: '407'
categories:
  - 前端
date: 2018-09-08 22:19:59
updated: 2021-07-28
---

# js 模块化编程

> 最初 js 不是一种模块化编程语言(es6 开始支持)。为了能够尽可能的实现 js 的模块化，我们会把代码写成这样:

1. 最原始: 封装函数写法

```js
function fn1() {
  // code
}
function fn2() {
  // code
}
```

上面的函数 `fn1()` 和 `fn2()`，组成一个模块。使用的时候，直接调用就行了，这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系

2. 对象写法

为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面

```js
var module1 = {
  _count: 0,
  fn1: function() {
    //code
  },
  fn2: function() {
    //code
  }
}
```

上面的函数 `fn1()`和 `fn2()`，都封装在 `module1` 对象里。使用的时候，就是调用这个对象的属性：`module1.fn1()`

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值：`module1._count = 666`

3. 立即执行函数(自调用函数)写法  (沙箱模式)

```js
// 使用 立即执行函数，可以达到不暴露私有成员的目的
var module1 = (function() {
  var _count = 0 // 一般私有的变量，申明变量名时，以 _ 开头
  function fn1() {
    // code
  }
  function fn2() {
    // code
  }
  return {
    fn1: fn1,
    fn2: fn2
  }
})()
```

使用上面的写法，外部代码无法读取内部的 _count 变量：`console.info(module1._count)` => `undefined`

# 模块化的标准

让模块拥有更好的通用性

- AMD : Async Module Definition 异步模块定义：依赖前置、提前执行： 在一开始就将所有的依赖项全部加载

- CMD : Common Module Definition 通用模块定义：依赖就近、延迟执行： 在需要的时候才去 require 加载依赖项

- commonJS: node.js 同步加载模块，适用于服务端

- ES 标准模块化规范

## AMD (Asynchronous Module Definition)

> 异步加载模块 [requireJs](http://requirejs.org/) 库应用这一规范

```js
// module add.js
define(function () {
  return {
    add: function (a, b) { return a + b }
  }
})

// main.js
// 第一个参数是要请求的模块, 第二个参数是依赖模块请求完成的回调函数
require(['add'], function (add) {
  console.log('1 + 2 = ' + add(1, 2)
})
```

## CMD (Common Module Definition)

> 同步加载模块 SeaJS

```js
// module add.js
define(function(require, exports, module) {
  // 正确写法
  // 给 module.exports 赋值
  module.exports = {
    add: function (a, b) { return a + b }
  }

  // 或使用 return
  return {
    add: function (a, b) { return a + b }
  }

  // 错误用法
  // 对 module.exports 的赋值需要同步执行，不能放在回调函数里
  setTimeout(function() {
    module.exports = { a: 'hello' }
  }, 0)
  // exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口
  exports = {
    add: function (a, b) { return a + b }
  }
})

// main.js
var { add } = require('./add') // 此处是同步加载，且可以实现条件加载，因为只有运行到该行代码的时候才会加载模块
console.log('1 + 2 = ' + add(1, 2)

// 同步加载这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态
```

## AMD 和 CMD 区别

AMD 和 CMD 最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。

AMD(requirejs)是将所有文件同时加载、一次性引入、推崇依赖前置、也就是在定义模块时要先声明其依赖的模块、加载完模块后会立马执行该模块(运行时加载)，所有模块都加载执行完后会进入 require 的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行

CMD(seajs)强调的是一个文件一个模块、可按需引入、推崇依赖就近、加载完某个模块后不会立即执行，只是下载而已，所有依赖模块加载完成后进入主逻辑，遇到 require 语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的

```js
// AMD
define(['./a', './b'], function(a, b) {
  // 依赖必须一开始就写好
  a.doSomething()
  b.doSomething()
})

// CMD
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  var b = require('./b') // 依赖可以就近书写
  b.doSomething()
})
```

## CommonJS 规范

> Node 应用由模块组成，采用 CommonJS 模块规范，每个文件就是一个模块，有自己的作用域

在前端浏览器里面并不支持 module.exports

有四个重要的环境变量为模块化的实现提供支持：module、exports、require、global

### node 中模块分类

- 核心模块：由 node 本身提供，不需要单独安装（npm），可直接引入使用

  - fs：文件操作模块
  - http：网络操作模块
  - path：路径操作模块
  - url：解析地址的模块
  - querystring：解析参数字符串的模块

- 第三方模块：由社区或个人提供，需要通过 npm 安装后使用，比如：mime

- 自定义模块：由开发人员自己创建，比如：tool.js、user.js

### 模块导入

- 核心模块直接引入使用：`require('fs')` 加载文件操作模块

```js
// 引入模块
let fs = require('fs')
```

- 第三方模块，需要先使用 npm 进行下载
- 自定义模块，需要加上相对路径 `./` 或者 `../` ，可以省略 `.js` 后缀，如果文件名是 `index.js` 那么 index.js 也可以省略

```js
// 加载模块
require('./a') // 推荐使用，省略 .js 后缀
require('./a.js')
```

- 模块可以被多次导入，但是只会在第一次加载

### 模块导出

- 在模块的内部，`module` 变量代表的就是当前模块，它的 `exports` 属性就是对外的接口，加载某个模块，加载的就是 `module.exports` 属性，这个属性指向一个空的对象

```js
// module.exports 指向的是一个对象，我们给对象增加属性即可
module.exports.name = 'zs'
module.exports.age = 18

setTimeout(function() {
  module.exports.gender = 'man'
}, 0)
```

```js
let m = require('./module.js')
console.log(m.name) // zs
console.log(m.age) // 18
console.log(m.gender) // undefined

setTimeout(function() {
  console.log(m.gender) // man
}, 0)
```

```js
// 也可以直接给 module.exports 赋值，但是多次导出会覆盖
module.exports = '123'
module.exports = () => {}
module.exports = {}

// 对 module.exports 的赋值需要同步执行，不能放在回调函数里
setTimeout(function() {
  module.exports = { a: 1 }
}, 0)
```

```js
let m = require('./module.js')
console.log(m) // {}
setTimeout(function() {
  console.log(m.a) // undefined
}, 0)
```

### module.exports 与 exports

- exports 不是 module.exports 的缩写，exports 是单独存在的

- exports 和 module.exports 默认指向同一个对象

- 模块最终导出的一定是 module.exports 中的数据

- 结论:

  - 直接添加属性两者皆可

  - 赋值对象时，只能使用 `module.exports`

```js
console.log(module.exports === exports) // ==> true

// 等价操作
module.exports.num = 123
exports.num = 123

// 赋值为新对象
exports = {}
module.exports = {}
// 模块导出的是 module.exports 指向的对象
```

### nodejs 中 require 加载模块的规则

require('mime') 以 mime 为例

1. 如果加载的模块是一个路径，表示加载的自定义模块，根据路径查找对应的 js 文件
2. 如果加载的模块是一个名字，不是一个路径，说明加载的是核心模块或者是第三方模块
3. 判断是否是核心模块，如果不是核心模块，会在当前目录下查找是否有 node_modules 目录
4. 如果有，在 node_modules 目录下查找 mime 这个文件夹，找到 mime 文件夹下的 package.json 文件，找到 main 属性，即模块的入口文件，如果没有 main，默认查找当前目录下的 index.js 文件
5. 如果没有找到对应的模块，回去上一层目录，继续查找，一直找到根目录 C: || D: || E:
6. 报错： can not find module xxx

## ES 模块化 - import 和 export

Modules 不是对象，<span class="red">import 命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。</span>也正因为这个，使得静态分析成为可能

export 导出多个模块，都放在一个对象里

export default 默认只能导出一个，一个模块只允许有一个 export default，否则报错
export default 后面不可以用 var、let、const 可用 export default function(){} function add(){}

命名导出(Named exports)

```js
// 导出
export const a = 1 // 声明后立即导出，这可以与 `var`, `let`, `const`, `class`, and `function` 配合使用

const b = 2
export { b } // 导出以前声明的值 必须用对象包裹，否则报错

export function c () {}
export const d = function () {}
export { something as somethingElse } // 在导出时重命名

// 导入
import { a, b, c, d, e } from 'test.js'
a // 1
b // 2
c // ƒ c() {}
d // ƒ d() {}
e // undefined
```

默认导出(Default Export)

仅当源模块只有一个导出时，才建议使用此做法

```js
// 导出
export default a = 1
// 等价于
let a = 1
export { a as default }
// 等价于
let a = 1
export default a

// 导入
import a from 'test.js'
a // 1

// 导入的名字可以任意
import b from 'test.js'
b // 1
```

将默认和命名导出组合在同一模块中是不好的做法，尽管它是规范允许的。

```js
// 导出
export default a = 1
export const b = 2
export const c = 3
// 导入
import * as tool from 'test.js'
tool.a // 1
tool.b // 2
tool.c // 3

// 或者
import a, { b as d, c } from 'test.js'

// 以下写法错误
import { b as d, c }, a from 'test.js' // x
import a, e from 'test.js' // x
```

## es import() 函数

参数同 import 命令的参数，返回一个 promise 对象

import() 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，才会加载指定的模块。另外，import() 函数与所加载的模块没有静态连接关系

import 命令会被 js 引擎静态分析，import 语句放在 if 代码块之中毫无意义，因此会报句法错误，即不能用于条件加载

import() 类似于 Node 的 require 方法，区别主要是前者是异步加载，后者是同步加载

应用： 按需加载，条件加载，动态模块路径

```js
import('./module.js').then(({ export1, export2 }) => {
  // ...
})
```

同时加载多个模块

```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
]).then(([module1, module2, module3]) => {
  // ···
})
```

import() 也可以用在 async 函数之中。

在 webpack 中使用 import() 动态加载模块时，webpack 默认会将所有 import() 的模块都进行单独打包，https://webpack.js.org/api/module-methods/#import-1

## CommonJS 模块 和 ES 模块化区别

CommonJS 模块

```js
// commonJsModule.js
var num = 1
let obj = {}
var addNum = () => num++
var addObj = () => obj.num = num

module.exports = {
    addNum, num,
    addObj, obj,
    get getNum()  {
        return num
    }
}
```

```js
let m = require('./commonJsModule.js')
console.log(m.num) // 1
m.addNum()
console.log(m.num) // 1
// 这里 num 输出的结果还是原来的值，因为 num 是一个原始类型的值，会被缓存
// 除非写成一个函数，才能得到内部变动的值
console.log(m.getNum) // 2

// 引用类型
console.log(m.obj) // {}
m.addObj()
console.log(m.obj) // { count: 2 }

// 重新赋值
m = {}
console.log(m.obj) // undefined
```

ES 模块

```js
// esModule.js
export let num = 1
export let obj = {}
export function addNum() {
    num++
}
```

```js
import  { num,obj, addNum } from './esModule.js'
console.log(num) // 1
addNum()
console.log(num) // 2

// 重新赋值 报错
num = 3 // TypeError: Assignment to constant variable.
console.log(num)

// 修改属性
obj.a = 1
console.log(obj) // { a: 1 }
```

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
CommonJS和 ES 模块都可以对导出对象内部属性的值进行改变
CommonJS 模块输出的是一个值的拷贝，类似浅拷贝
ES 模块输出的 不论是基本类还是引用类型的数据，都是值的引用
ES 模块对导出的数据不可以重新赋值（只读状态），重新赋值会编译报错（即导出的数据指针指向不能变），但可以改变对象的属性，类似 const 声明的变量
CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 Modules不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”
编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import 时采用静态命令的形式。即在 import 时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”
