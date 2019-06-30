---
title: javascript 模块化编程
tags: javascript
categories:
- [js]
date: 2018/09/08 16:19:00
updated: 2018/11/20 18:30:00
---


# Javascript模块化编程



> 最初Javascript不是一种模块化编程语言(es6开始支持)。为了能够尽可能的实现js的模块化，我们会把代码写成这样:

```javascript
// 1. 最原始:封装函数写法
　　function fn1(){
　　　　// code
　　}
　　function fn2(){
　　　　// code
　　}
// 上面的函数fn1()和fn2()，组成一个模块。使用的时候，直接调用就行了。
// 这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。
```

```javascript
// 2. 对象写法
// 为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

　　var module1 = {
　　　　_count : 0,
　　　　fn1 : function (){
　　　　　　//code
　　　　},
　　　　fn2 : function (){
　　　　　　//code
　　　　}
　　};
// 上面的函数fn1()和fn2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。
//　module1.fn1();
// 但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。
// module1._count = 666;
```



> Javascript 模块的基本写法

```javascript
// 3.立即执行函数(自调用函数)写法  (沙箱模式)
// 使用"立即执行函数"，可以达到不暴露私有成员的目的。
var module1 = (function(){
    var _count = 0; //一般私有的变量:申明变量名时,以_开头
    function fn1(){
        //code
    }
    function fn2(){
        //code
    }
    return {
        fn1 : fn1,
        fn2 : fn2
    };
})();

// 使用上面的写法，外部代码无法读取内部的_count变量。
// console.info(module1._count); //undefined
```



##模块化的标准

让模块拥有更好的通用性！

- AMD : Async Module Definition  异步模块定义

> 依赖前置： 在一开始就将所有的依赖项全部加载

- CMD : Common Module Definition  通用模块定义

> 依赖延迟： 在需要的时候才去加载依赖项

**区别: AMD是异步的, CMD是同步的**



###CMD (Common Module Definition)

> 同步加载模块

```javascript
// module add.js
module.exports = function add (a, b) { return a + b; }

// main.js
var {add} = require('./add'); // 此处是同步加载
console.log('1 + 2 = ' + add(1,2);

// 同步加载这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。
```



### AMD (Asynchronous Module Definition)

> 异步加载模块 [require.js](http://requirejs.org/) 库实现了AMD规范

```javascript
// module add.js
define(function () {
  return {
    add: function (a, b) { return a + b; }
  };
});

// main.js
// 第一个参数是要请求的模块,第二个参数是依赖模块请求完成的回调函数
require(['add'], function (add) {
  console.log('1 + 2 = ' + add(1,2);
});
```



## 学习使用 require.js

js 文件加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；由于js文件之间存在依赖关系，因此必须严格保证加载顺序，依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

require.js 的诞生，就是为了解决这两个问题：

> （1）实现js文件的异步加载，避免网页失去响应；
>
> （2）管理模块之间的依赖性，便于代码的编写和维护。

###require.js 的下载和引入

使用 require.js 的第一步，是先去官方网站[下载](http://requirejs.org/docs/download.html)最新版本。

中文网 http://www.requirejs.cn

```html
<!-- 引入方式: -->
<script src="js/require.js"></script>
```

加载这个文件，也可能造成网页失去响应。解决办法有两个，一个是把它放在网页底部加载，另一个是写成下面这样：

```html
<!-- async 属性表明这个文件需要异步加载，避免网页失去响应 -->
<!-- IE不支持这个属性，只支持 defer，所以把 defer 也写上 -->

<script src="js/require.js" defer async="true" ></script>
```

加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，也放在js目录下面。那么，只需要写成下面这样就行了：

```html
<!-- data-main 属性的作用是，指定网页程序的主模块。在上例中，就是 js 目录下面的 main.js，这个文件会第一个被 require.js 加载。由于 require.js 默认的文件后缀名是 js ，所以可以把 main.js 简写成 main。-->

<script src="js/require.js" data-main="js/main"></script>
```

###主模块的写法

main.js，我把它称为"主模块"，意思是整个网页的入口代码。所有代码都从这儿开始运行。

下面就来看，怎么写main.js。

如果我们的代码不依赖任何其他模块，那么可以直接写入javascript代码。

```javascript
// main.js
alert("加载成功！");
```



但这样的话，就没必要使用require.js了。真正常见的情况是，主模块依赖于其他模块，这时就要使用AMD规范定义的的require()函数。

```javascript
// main.js
　　require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　　　// some code here
　　});

// require.js 要求，每个模块是一个单独的js文件。

// require() 函数接受两个参数。第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

// require() 异步加载 moduleA，moduleB 和 moduleC，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。
```



### 每个 AMD 模块的写法

> require.js 加载的模块，采用AMD规范。也就是说，模块必须按照AMD的规定来写。
>
> 具体来说，就是模块必须采用特定的 define() 函数来定义。



> 如果一个模块不依赖其他模块，那么可以直接定义在 define() 函数之中。

```javascript
// 假定现在有一个math.js文件，它定义了一个 math 模块。那么，math.js 就要这样写：
// math.js
define(function () {
    var add = function (x, y) {
        return x + y;
    };
    return {
        add: add
    };
});
```

加载方法如下：

```javascript
// main.js
require(['math'], function (math){
    alert(math.add(1,1));
});
```



> 如果这个模块还依赖其他模块，那么 define() 函数的第一个参数，必须是一个数组，指明该模块的依赖性。

```javascript
// 当require() 函数加载上面这个模块的时候，就会先加载 myLib.js 文件。
define(['myLib'], function (myLib) {
    function foo(){
        myLib.doSomething();
    }
    return {
        foo : foo
    };
});
```



### 模块加载的配置

```javascript
// 上面代码中主模块的依赖模块是['moduleA', 'moduleB', 'moduleC']。默认情况下，require.js 假定这三个模块与main.js 在同一个目录，文件名分别为 moduleA.js，moduleB.js 和 moduleC.js，然后自动加载。

// 使用 require.config() 方法，我们可以对模块的加载行为进行自定义。require.config() 写在主模块（main.js）的头部。参数就是一个对象，这个对象的 paths 属性指定各个模块的加载路径。

require.config({
    paths: {
        "moduleA": "moduleA.min",
        "moduleB": "moduleB.min",
        "moduleC": "moduleC.min"
    }
});
```

```javascript
// 上面的代码给出了三个模块的文件名，路径默认与 main.js 在同一个目录（js子目录）。如果这些模块在其他目录，比如js/lib目录，则有两种写法。一种是逐一指定路径。
require.config({
    paths: {
        // 注意:路径相对的是 main 的路径, 不需要写后缀名,require 会自动加
        "moduleA": "lib/moduleA.min",
        "moduleB": "lib/moduleB.min",
        "moduleC": "lib/moduleC.min"
    }
});

// 另一种则是直接改变基目录（baseUrl）。
require.config({
    baseUrl: "js/lib",
    paths: {
        "moduleA": "moduleA.min",
        "moduleB": "moduleB.min",
        "moduleC": "moduleC.min"
    }
});

// 如果某个模块在另一台主机上，也可以直接指定它的网址，比如：
require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-3.3.1.min"
    }
});
```



###加载非规范的模块

> 理论上，require.js 加载的模块，必须是按照AMD规范、用 define() 函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？
>
> 回答是可以的
>
> 这样的模块在用require()加载之前，要先用 require.config() 方法，定义它们的一些特征
>

```javascript
// require.config() 接受一个配置对象，这个对象除了有前面说过的 paths 属性之外，还有一个 shim 属性，专门用来配置不兼容的模块。具体来说，每个模块要定义：（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

// 加入有一个demo.js文件,没有按照AMD规范定义, 那么应该如果使用呢?
// 1. 在 paths 中先配置一下这个 demo.js 的路径
// 2. 在 shim 中配置这个文件的依赖项和导出项

// demo.js
function animate(){
  	$('.box').stop(true).fadeIn(1000).fadeOut(1000).slideDown(1000).hide(1000);
  	console.log('动画执行了');
}

// main.js
require.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-3.3.1.min',
        'demo': 'demo.js 相对 main.js 的路径'
    },
    shim: {
        'demo': {
            deps: ['jquery'],
            // 注意: 这里导出项要写的是demo.js中的那些内容
            // 这里要导出 animate 函数
            exports: 'animate'
        }
    }
});

require(['demo'],function(demo){
  console.log(demo);
  demo(); // 会执行demo.js 文件中 animate 函数
})
```
