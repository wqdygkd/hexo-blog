---
title: HTML5
tags:
  - html
id: '395'
categories:
  - - web前端
date: 2018-11-23 22:10:49
---

## 什么是 HTML5

> HTML5 并不仅仅是作为 **HTML 标记语言的一个最新版本**， 更重要的是它**制定了 web 应用开发的一系列标准**，成为第一个将 web 作为应用开发平台的 HTML 语言。

HTML5 定义了一系列新元素，如 **新语义标签、多媒体标** 签等，可以帮助开发者开发更加丰富的应用，同时有令人眼花缭乱的 css3，还提供了一些 Javascript API，如地理定位、重力感应、硬件访问等，可以在浏览器内实现类原生应用，制作 webApp，甚至结合 Canvas 我们可开发网页游戏

我们日常讨论的 H5 其实指的是一个泛称，它是由**HTML5+CSS3+javascript** 等技术组合而成的一个应用开发平台

## HTML5 的历史

```
1. WHATWG: Web Hypertext Application Technology Working。 WHATWG成立的原因是W3C意图放弃HTML，而力图发展XML技术
2. HTML5 的第一份正式草案已于2008年1月22日公布
3. 2014年10月29日，万维网联盟宣布，经过接近8年的艰苦努力，该标准规范终于制定完成
```

思考：问什么 HTML5 在 2008 年就发布草案了，到 2014 年才火起来？

因为移动端的推动，HTML 在老的浏览器上兼容性很严重，并且 HTML5 很多新特性其实就是为移动端而出现的，可以说**HTML5 是为移动端而生的**

# HTML5 语义化标签

## 常用语义化标签

> 在 HTML5 之前，我们布局大多使用 div，但是 div 并没有语义化，HTML5 推出了一系列的语义化标签，可以用来表示 header、footer 等。

HTML5 新的语义化标签

`header` 头部、`nav` 导航、`footer` 底部、`aside` 侧边栏、`article` 文章、`section` 区块、`main` 主体区域

本质上新语义标签与`<div>`、`<span>`没有区别，只是其具有语义性，使用时除了在 HTML 结构上需要注意外，其它和普通标签的使用无任何差别，`<nav>`完全可以理解成`<div class="nav">`。不要好奇，它只是一个标签！就是增加了语义性，更加利于 SEO 的优化。

html5 还推出了一些其他的标签：[http://www.w3school.com.cn/tags/index.asp](http://www.w3school.com.cn/tags/index.asp)

## 兼容性处理

IE678 不识别这个标签

```js
document.createElement('header') // 创建这个标签即可让IE678识别
// 创建的标签默认是行内样式。
// 还需给标签加一个 display:block 的属性。
```

借助 `html5shiv.js`

> 我们每次都要去创建标签，并且还需要设置 display：block 属性，非常麻烦，因此我们可以引入一个第三方 js 文件，这个 js 文件的功能就是创建元素和设置 display 属性。

```html
<!-- [if lte IE 8] >  // lte ==> 小于等于
<script src="js/html5shiv.min.js"></script>
<! [endif] -->
<!-- 当 ie 浏览器的版本小于等于8的时候，才会引入 html5shiv.js -->
<!-- css hack -->
<!-- 条件注释 IE独有的注释 -->
```

# 类名操作(重点)

> js 在 H5 中给所有的 DOM 对象新增了一个属性 classList
>
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

【tab 栏案例】

# 自定义属性操作（重点）

> H5 规定，以后但凡给标签增加自定义属性，都应该用 `data-` 开头 (规范)
>
> H5 给所有的 DOM 对象增加了一个 `dataset` 的属性，这个属性中会包含所有 data- 开头的属性

- html 5 中操作自定义属性 `dataset` 属性

```html
<div id="box" data-name="zs" data-age="10" data-user-name="ls"></div>
<script>
  var box = document.querySelector('#box')
  console.log(box.dataset) // DOMStringMap {name: 'zs', age: '10', userName: 'ls'}
  console.log(box.dataset.name) // zs
  console.log(box.dataset['age']) // 10
  console.log(box.dataset.userName) // ls
  box.dataset.aaBb = 'cc' // 在html结构中或添加 data-aa-bb="cc" 的自定义属性
</script>
```

**注意：**html 中属性是忽略大小写的，相当于是小写字母，如果需要大写，应使用中划线 `-` 进行分隔，在 js 中会转换成驼峰的形式，如`data-user-name ==> userName`

- jquery 中操作自定义属性

jquery 并没有把 `data-` 当成自定义属性来用，jq 中封装了 `data()` 方法

```html
<div data-id="1" data-name="zs" id="box" data-a='{"b":"c"}'></div>
<script>
  console.log($('#box').data()) // {id: 1, name: "zs"}
  // console.log($('#box').attr()) // error
  console.log(box.dataset) // DOMStringMap{id: "1", name: "zs"}

  console.log($('#box').data('id')) // 1 => 获取到自定义属性
  $('#box').data('id', 2) // 并不会修改原标签中的自定义属性
  console.log($('#box').data('id')) // 2 => html中data-id依然是1
  console.log($('#box').attr('data-id')) // 1
  console.log(box.dataset['id']) // 1 => 获取到的还是原来的 data-id

  $('#box').attr('data-id', 3)
  console.log($('#box').data('id')) // 3
  console.log(box.dataset['id']) // 3

  // 属性里使用json语法，但通过data()设置的不能解析成对象
  $('#box').data('d', '{"e":"f"}')
  console.log($('#box').data('a')) // {b: "c"} => 对象
  console.log($('#box').data('d')) // '{"e":"f"}'

  $('#box').removeData() // 删除之前通过 data() 方法设置的数据
</script>
```

!> jq 的 data() 方法内部使用了缓存来实现，该方法设置的属性只能通过该方法获取，在 html 页面中看不到属性值，通过原生 dataset 属性也获取不到值

# 网络状态

> 在移动端，我们经常需要检测设置是在线还是离线，HTML5 为此定义了一个 navigator.onLine 属性，这个属性用于检测设备是否联网。**navigator.onLine** 在不同浏览器中有细微的差别。

## 网络状态

```
navigator.onLine 返回用户当前的网络状况，是一个布尔值
1. 如果浏览器连不上网(包括局域网)，就是离线状态，也就是脱机状态，会返回 false
2. 否则就是在线状态，返回 true
```

**注意：返回 true 不一定就是说一定能访问互联网，因为有可能连接的是局域网。但是返回 false 则表示一定连不上网。**

## 监听网络变化

> 为了更好的确定网络是否连接，HTML5 还定义了两个事件，用于监听网络状态的变化。

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

# 地理位置

> 在 HTML 规范中，增加了获取用户地理信息的 API，这样使得我们可以基于用户位置开发互联网应用，即基于位置服务 LBS(Location Base Service)

## 隐私

HTML5 规范提供了一套保护用户隐私的机制。必须先得到用户明确许可，才能获取用户的位置信息。**在获取地理位置之前，会询问用户，只有在获得许可之后，才能获取到用户的位置信息。**

H5 提供的获取地理位置信息并不是特别的精确，会一定的误差，如果需要非常精确的定位，还是需要使用安卓或者 ios，访问基于操作系统的方法。 （小程序）

## 相关的方法

```js
// successCallback:获取成功后会调用,并返回一个position对象，里面包含了地理位置信息
// 获取失败了会调用，并返回error对象，里面包含了错误信息。
// 获取当前的地理位置信息
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
// 重复的获取当前的地理位置信息
navigator.geolocation.watchPosition(successCallback, errorCallback)
```

实例：

```js
navigator.geolocation.getCurrentPosition(
  function(position) {
    // 定位成功会调用该方
    // 法谷歌浏览器进行了限制，看不到，可以再IE浏览器下查看
    // position.coords.latitude 纬度
    // position.coords.longitude 经度
    // position.coords.accuracy 精度
    // position.coords.altitude 海拔高度
  },
  function(error) {
    // 定位失败会调用该方法
    // error 是错误信息
  }
)
```

**苹果浏览器对 webkit 定位权限进行了修改，所有定位请求的页面必须是 https 协议的。**

## 百度地图、高德地图、腾讯地图

> 仅仅获取到经纬度对于用户来说意义并不大，因为用户也不知道经度和纬度表示的是地球上的哪一个地方，因为我们可以结合百度地图，准确的将用户的位置显示出来。

百度地图官网：[http://lbsyun.baidu.com/](http://lbsyun.baidu.com/)

```
1. 在开发中，找到 javascript API
2. 直接查看示例 demo
3. 复制相应的代码，替换掉秘钥就行，秘钥只需创建一个新的应用就可以了
```

# web 存储

> 在代码执行的时候，数据都是存储在内存中的，当页面关闭或者浏览器关闭的时候，内存就被释放掉了。数据只有存储在硬盘上，才不会被释放。

## cookie

特点：

- 在浏览器端的存储数据的容器
- 大小 4k
- 生命周期，默认会话级别，但是可以设置过期时间
- cookie 中的数据可以在同一个网站的页面共享
- cookie 中的数据，在请求时会进行自动携带
- 不同浏览器的 cookie 不能共享
- cookie 是以字符串形式存在的，这个字符串有固定的格式：key=value;key1=value1；在获取 cookie 内容时，一般需要通过正则或者字符串的方法进行处理，转换成对象，最终得到数据
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

> HTML5 规范提出使用 sessionStorage 和 localStorage 存储数据。设置、读取、删除操作很方便

- sessionStorage 和 localStorage 特点

  - 都保存在客户端
  - 大小为 5M 左右
  - 使用方法相同
  - 以键值对的方式，存储字符串格式的数据

- sessionStorage 和 localStorage 区别

  - sessionStorage 生命周期默认为一个会话周期，且不能设置周期，一旦关闭浏览器，就销毁了，不能在多个窗口下共享数据
  - localStorage 永久生效，除非手动删除，可以多个窗口共享

- 使用方法

```js
setItem(key, value) // 设置存储内容
getItem(key) // 读取存储内容
removeItem(key) // 删除键值为key的存储内容
clear() // 清空所有存储内容（谨慎使用）
```

存取复杂数据类型：先将复杂数据转换成 JSON 字符串 `JSON.stringify(obj/arr)` 在进行存储；使用时将 JSON 字符串转换成复杂数据类型 `JSON.parse( jsonStr )`

【案例-换肤效果】

## Cookie 和 WebStorage 比较

**cookie**

- 大小受限
- 用户可以操作（禁用）cookie，使功能受限
- 安全性较低
- 有些状态不可能保存在客户端。
- 每次访问都要传送 cookie 给服务器，浪费带宽

**WebStorage**

- 存储空间更大：cookie 为 4KB，而 WebStorage 是 5MB
- WebStorage 不会传送到服务器，存储在本地的数据可以直接获取，速度更快，并且减少了客户端和服务器端的交互，节省了网络流量
- 对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage 会非常方便
- 安全性：WebStorage 不会随着 HTTP header 发送到服务器端，所以安全性相对于 cookie 来说比较高一些，不会担心截获，但是仍然存在伪造问题
- WebStorage 提供了一些方法，数据操作比 cookie 方便

# 自定义播放器

全屏切换 API：

```js
// requestFullScreen 这个方法还没有标准化，需要添加私有前缀
video.requestFullScreen()
video.webkitRequestFullScreen()
video.mozRequestFullScreen()
```

video/audio 属性：

- currentTime: 设置或返回音频/视频中的当前播放位置（以秒计）
- duration: 返回当前音频/视频的长度（以秒计）
- autoplay: 默认 false 设置或返回是否在加载完成后随即播放音频/视频
- volume: 设置或返回音频/视频的音量
- paused: 设置或返回音频/视频是否暂停， true 指示音频/视频已暂停

方法：

- load(): 重新加载音频/视频元素

- play(): 开始播放音频/视频

- pause(): 暂停当前播放的音频/视频

事件：

- timeupdate: 播放进度更改时触发

参考文档
http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp

推荐：https://www.awesomes.cn/repo/videojs/video-js

# 文件读取

> 通过 FileReader 对象我们可以读取本地存储的文件（用户通过 input:file 上传的文件），可以使用 File 对象来指定所要读取的文件或数据。其中 File 对象可以是来自用户在一个`<input>`元素上选择文件后返回的 FileList 对象，也可以来自由拖放操作生成的 DataTransfer

## files

对于 file 类型的 input 框，在这个 DOM 对象中，存在一个 files 属性，这个属性是 FileList 对象，是一个伪数组，里面存储着上传的所有文件，当 input 框指定了 multiple 属性之后，就可以上传多个文件了。

也就是说，通过 files 这个属性，我们就可以获取到所有上传的文件。

## file 对象

File 对象中包含了文件的最后修改时间、文件名、文件类型等信息。

## FileReader 对象

FileReader 是一个 HTML5 新增的对象，用于读取文件（必须通过 input:file 上传）

```js
var file = input.files[0]
// 创建一个fileReader对象
var fr = new FileReader
// 读取文件的两个方法
fr.readAsText(file) 以文本的方式读取文件 ,文本文件
fr.readAsDataURL(file) 以DataURL形式读取文件，图片，视频
// 文件读取完成事件：
fr.onload = function(){
  // 当文件读取完成，可以通过result属性获取结果
  console.log(fr.result)
}
```

案例：图片预览

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
// 2. URL.createObjectURL(file)  缺点： 1. 试验中  2. 同步（阻塞）
var file = document.getElementById('file')
file.addEventListener('change', function() {
  var data = this.files[0]
  var result = URL.createObjectURL(data)
  img.src = result
})
```
