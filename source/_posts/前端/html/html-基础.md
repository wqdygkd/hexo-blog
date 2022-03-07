---
title: html 基础
tags:
  - html
id: 394
categories:
  - 前端
date: 2018-08-27
updated: 2022-03-07
---

# 文档类型<!DOCTYPE>

`<!DOCTYPE html>` 声明告诉浏览器按照HTML5规范解析页面

# 字符集

```html
<meta charset="UTF-8" />
```
告诉浏览器当前 html 文档使用 UTF-8 进行的字符编码

# link 标签 ref 属性值 prefetch preload 用于预加载

```html
<link ref="preload" href="*.js" as="script" />
<!-- preload需要写上正确的as属性,如果不写或错误，等同于XHR请求，优先级非常低 -->
<link rel="preload" href="font.woff" as="font" crossorigin />
<!-- 预加载字体你还必须设置crossorigin 属性 -->
```

- preload 是用于预加载当前页的资源，浏览器会优先加载它们(加载后并不执行，在需要执行的时候再执行)

将加载和执行分离开，可不阻塞渲染和 document 的 onload 事件
提前加载指定资源，不再出现依赖的 font 字体隔了一段时间才刷出

- prefetch 是用于预加载后续页面使用的资源，浏览器也会加载它们，但优先级不高

- 避免混用 preload 和 prefetch，混用的话，并不会复用资源，而是会重复加载

```html
<!-- 浏览器会加载两次改字体 -->
<link rel="preload" href="https://at.alicdn.com/t/font.woff" as="font">
<link rel="prefetch" href="https://at.alicdn.com/t/font.woff" as="font">
```

插入的脚本（无论在什么位置）在网络优先级中是很低级

# script 标签的 defer 和 async 异步加载

这两个属性都告诉浏览器，它可以 “在后台” 加载脚本的同时继续解析 HTML，并在脚本加载完之后再执行。这样，脚本下载就不会阻塞 DOM 构建和页面渲染了

defer 和 async 之间的不同是他们开始执行脚本的时机的不同

async(H5) 一旦脚本可用，则会异步执行（仅适用于外部脚本） 脚本在它们完成下载完成后的第一时间执行，如果一个指定 async 的脚本很快就完成了下载，那么它的执行会阻塞 DOM 构建以及所有在之后才完成下载的同步脚本。

defer 规定当页面已完成解析后，执行脚本（仅适用于外部脚本） 脚本会按照它在 HTML 中出现的顺序执行，并且不会阻塞解析。

# 表格标签 table

table 属性 重点记住 cellspacing 、 cellpadding
- `cellspacing` 设置单元格与单元格边框之间的空白距离
- `cellpadding` 设置单元格内容与单元格边框之间的空白距离

table 合并单元格

- 跨行合并（向下合并）：rowspan="合并单元格的个数"
- 跨列合并（向右合并）：colspan="合并单元格的个数"

# input file 控件

使用 input file 进行文件上传时，重复选择相同文件时，change 事件不再触发
解决方式：手动将 file 的 value 值设置为空

```html
<input type="file" id="file" accept="image/gif,image/jpeg" @change="uploadFile($event)" />
```

```js
$event.target.value = ''
// 或
var file = document.getElementById('file')
file.value = ''
```

# HTML5 语义化标签

HTML5 新的语义化标签

`header` 头部、`nav` 导航、`footer` 底部、`aside` 侧边栏、`article` 文章、`section` 区块、`main` 主体区域

# 类名操作

> js 在 H5 中给所有的 DOM 对象新增了一个属性 classList
> classList 是一个集合，会存储某个元素上所有的类名，使用 classList 来替代 className 操作 class 类

```js
// 添加类
div.classList.add('classname')
// 移除类
div.classList.remove('classname')
// 切换类
div.classList.toggle('classname')
// 判断类
div.classList.contains('classname')
```

# 自定义属性操作

> H5 规定，以后但凡给标签增加自定义属性，都应该用 `data-` 开头
> H5 给所有的 DOM 对象增加了一个 `dataset` 的属性，这个属性中会包含所有 data- 开头的属性

```html
<div id="box" data-name="zs" data-age="10" data-user-name="ls"></div>
<script>
  var box = document.querySelector('#box')
  console.log(box.dataset) // DOMStringMap {name: 'zs', age: '10', userName: 'ls'}
  box.dataset.aaBb = 'cc' // 在html结构中或添加 data-aa-bb="cc" 的自定义属性
</script>
```

**注意：**html 中属性是忽略大小写的，如果需要，应使用中划线 `-` 进行分隔，在 js 中会转换成驼峰的形式，如`data-user-name ==> userName`

# 网络状态

`navigator.onLine` 属性，是一个布尔值：脱机状态返回 false，在线状态返回 true

**注意：返回 true 不代表不一定能访问互联网，因为有可能连接的是局域网。但是返回 false 则表示一定连不上网。**

## 监听网络变化

```js
// 网络连接时会被调用
window.addEventListener('online', function() {
  alert('online')
})

// 当网络断开时会被调用
window.addEventListener('offline', function() {
  alert('offline')
})
```

# web 存储

## cookie

特点：

- 大小 4k
- 生命周期：默认会话级别，但是可以设置过期时间
- 数据可以在同一个网站的页面共享
- 在请求时会自动携带
- 以字符串形式存储，这个字符串有固定的格式：key=value;key1=value1；
- 一般用于存储 sessionId，可以实现登录状态保持 (会话保持)

```js
document.cookie = 'name=zhangsan'
document.cookie = 'age=18'
document.cookie = 'sex=23'

// 设置过期时间
document.cookie = 'sex=12;max-age=3600'

// 读取cookie
var result = document.cookie
console.log(result)
```

## WebStorage

- sessionStorage 和 localStorage 特点

  - 都保存在客户端
  - 大小为 5M 左右
  - 使用方法相同
  - 以键值对的方式，存储字符串格式的数据

- sessionStorage 和 localStorage 区别

  - sessionStorage 生命周期默认为一个会话周期，且不能设置周期，一旦关闭浏览器，就销毁了，不能在不同页面共享数据
  - localStorage 永久生效，除非手动删除，可以多个窗口共享

- 使用方法

```js
setItem(key, value) // 设置存储内容
getItem(key) // 读取存储内容
removeItem(key) // 删除键值为key的存储内容
clear() // 清空所有存储内容
```

## Cookie 和 WebStorage 比较

**cookie**

- 大小受限
- 用户可以操作（禁用）cookie，使功能受限
- 安全性较低
- 有些状态不可能保存在客户端
- 每次访问都要传送 cookie 给服务器，浪费带宽

**WebStorage**

- 存储空间更大：cookie 为 4KB，而 WebStorage 是 5MB
- 对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage 会非常方便
- WebStorage 不会随着 HTTP header 发送到服务器端，所以安全性相对于 cookie 来说比较高一些，不会担心截获，但是仍然存在伪造问题
- WebStorage 数据操作比 cookie 方便


## sessionStorage 多标签页共享

```js
window.addEventListener('storage', function (event) {
  if (event.key === 'token') {
    this.sessionStorage.setItem('token', event.newValue)
  }
})
```

# 文件读取

> 通过 FileReader 对象我们可以读取本地存储的文件（用户通过 input:file 上传的文件），可以使用 File 对象来指定所要读取的文件或数据。其中 File 对象可以是来自用户在一个`<input>`元素上选择文件后返回的 FileList 对象，也可以来自由拖放操作生成的 DataTransfer

## files

对于 file 类型的 input 框，DOM 对象中存在一个 files 属性，这个属性是 FileList 对象，是一个伪数组，里面存储着上传的所有文件，当 input 框指定了 multiple 属性之后，就可以上传多个文件了。

## file 对象

File 对象中包含了文件的最后修改时间、文件名、文件类型等信息。

## FileReader 对象

FileReader 是一个 HTML5 新增的对象，用于读取文件（必须通过 input:file 上传）

```js
var file = input.files[0]
// 创建一个fileReader对象
var fr = new FileReader
// 读取文件的两个方法
fr.readAsText(file) // 以文本的方式读取文件 ,文本文件
fr.readAsDataURL(file) // 以DataURL形式读取文件，图片，视频
// 文件读取完成事件：
fr.onload = function(){
  // 当文件读取完成，可以通过result属性获取结果
  console.log(fr.result)
}
```

图片预览

```js
// 1. FileReader 是异步的
var file = document.getElementById('file')
var box = document.getElementById('box')
file.addEventListener('change', function() {
  console.dir(this) // file 中files 属性里面存储了所有上传的文件
  // 这个data就是我们上传的那个文件
  var data = file.files[0]
  // 1. 创建一个文件读取器
  var fr = new FileReader()
  // 2. 让文件读取器读取整个文件
  fr.readAsDataURL(data)
  // 3. 等待文件读取完
  // onload：文件读取完成后，就会触发
  fr.onload = function() {
    // 通过 fr.result 就可以获取到最终的结果
    var img = document.createElement('img')
    img.src = fr.result
    box.innerHTML = ''
    box.appendChild(img)
  }
})
```

```js
// 2. URL.createObjectURL(file)  缺点：同步（阻塞）,占用内存
var file = document.getElementById('file')
file.addEventListener('change', function() {
  var data = this.files[0]
  var result = URL.createObjectURL(data)
  img.src = result
})
```


