---
title: 移动 web
tags: 移动web
categories:
- [移动web]
date: 2018/12/11 18:00:00
updated: 2018/12/19 21:01:00
---


# 移动web基础

## 移动端开发现状

+ 移动web开发指的是需要适配移动设备的网页开发
+ 移动web开发与pc端web开发没有本质的区别，使用的还是HTML/CSS/JavaScript的技术
+ 移动web开发与pc端web开发的区别是什么？



移动端的浏览器与pc端不同

```javascript
谷歌浏览器 苹果浏览器、 UC浏览器 QQ浏览器 欧朋浏览器 百度手机浏览器  360安全浏览器  搜狗浏览器  猎豹浏览器等
国内的手机浏览器都是根据webkit内核修改过来的，国内没有自主研发的内核，国内的操作系统也是基于Android系统修改的。

因此在移动端，css3属性只需要加webkit前缀即可。
```



移动端设备尺寸不一样(尺寸非常多，碎片化很严重)

```javascript
Android： 320*480 480*800  540*960 720*1280 1080*1920 2k屏 4k屏
iphpne：  640*960 640*1136 750*1334 1242*2208
```

## 移动端开发分类

+ 原生app（native app）
+ 混合app（Hybrid app）
+ web应用（webApp）

**原生app（native app）**

>  原生app是基于操作系统的开发，比如安卓，ios，windows phone,他们只能在各自的操作系统上运行。

优点：

1. 可以访问操作系统，获取更多的资源（gps，摄像头，传感器，麦克风等）
2. 速度快，性能高，用户体验好
3. 可以离线使用

缺点：

1. 开发成本高
2. 需要安装和更新，更新与发布需要审核。

**Web App**

>  Web应用使用H5C3开发页面，为浏览器设计的基于web的应用，可以在各种智能设备的手机浏览器上运行。不需要安装即可运行。

优点：

1. 支持设备广泛
2. 开发成本低（使用）
3. 可以随时上线与更新，无需审核

缺点：

1. 用户体验极度依赖网速
2. 要求联网
3. 无法获取手机的资源（gps，摄像头）

**混合app（Hybrid App）**

> Hybrid App是指介于web-app、native-app这两者之间的app,它虽然看上去是一个Native App，但只有一个UI WebView，里面访问的是一个Web App。（淘宝、京东、手机百度）

Hybird App说白了就是使用了Native app的壳，里面其实还是HTML5页面。

优点：

1. 开发成本和难度更低，兼容多个平台
2. 也可以访问手机的操作系统资源。
3. 更新维护更方便

缺点：

1. 用户体验相比原生app稍差。
2. 性能依赖于网速


总结：

三种开发各有优缺点，具体用什么需要根据实际情况而定，比如预算，app注重功能还是内容等。

![](移动web/移动开发分类.png)



## 屏幕与分辨率

[理解设备像素、设备独立像素和css像素](https://segmentfault.com/a/1190000011753855)



> 移动设备与 PC 设备最大的差异在于屏幕，这主要体现在屏幕尺寸和屏幕分辨率两个方面

屏幕尺寸

通常我们所指的屏幕`尺寸`，实际上指的是屏幕对角线的长度（一般用英寸来度量）

`1英寸 = 2.54厘米`



屏幕分辨率

分辨率则一般用像素来度量，表示屏幕水平和垂直方向的像素数，例如1920*1080指的是屏幕垂直方向和水平方向分别有1920和1080个像素点而构成。

`像素`：指计算机显示设备中的最小单位，即一个像素点的大小。每一个像素点可以理解为就是屏幕上的一个发光点。



像素密度 ppi

`PPI (Pixels Per Inch)`表示屏幕每英寸的像素数

PPI 值的越大说明单位尺寸里所能容纳的像素数量就越多，所能展现画面的品质也就越精细，反之就越粗糙。



## 设备像素

> 设备像素 (device pixels）也叫物理像素

设备像素指的是显示器上的真实像素，每个像素的大小是屏幕固有的属性，屏幕出厂以后就不会改变了。

设备分辨率描述的就是这个显示器的宽和高分别是多少个设备像素。

设备像素和设备分辨率交给操作系统来管理，浏览器不知道、也不需要知道设备分辨率的大小，浏览器只需要知道**逻辑分辨率**就可以了。



## 设备独立像素

> 设备独立像素（Device Independent Pixels）也叫逻辑像素、设备无关像素。在IOS设备上叫`PT`，Android 设备上叫`DP`，在 css 中，叫`PX`

为了能够保证 `图像内容在不同的 PPI 设备看上去大小应该差不多` ，操作系统定义了一个单位：设备独立像素，用设备独立像素定义的尺寸，不管屏幕的参数如何，都能以合适的大小显示（这也是设备独立像素名字的由来）

对于那些像素密度高的屏幕，操作系统将多个设备像素划分为一个逻辑像素。屏幕的像素密度越高，就需要更多的设备像素来显示一个设备独立像素。至于将多少设备像素划分为一个逻辑像素，这由操作系统决定



获取设备的像素比

```javascript
window.devicePixelRatio  // 物理像素 与 css 像素的比值 DPR
```

通过 `screen.width/height`得到的屏幕宽度和高度就是逻辑分辨率（单位：设备独立像素）



## css 像素与缩放

在缩放比例为 100% 的情况下，一个 css 像素大小等于一个设备独立像素

缩放页面的时候，元素的 css 像素数量不会改变，改变的只是每个 css 像素的大小

缩放比例 = css 像素边长 / 设备独立像素边长

如果原本元素宽度为 128 个设备独立像素，那么缩放 200% 以后元素宽度为 256 个设备独立像素（css像素宽度始终是128）

桌面浏览器上缩放机制是 page zoom，缩放会导致CSS像素边长的改变，从而导致 window.devicePixelRatio 的改变

在移动端缩放机制是 pinch zoom，计算 window.devicePixelRatio 时，不考虑 pinch zoom 对CSS像素尺寸的影响，因此 window.devicePixelRatio 不会随缩放而改变



## 2 倍图与 3 倍图

> 以后同学在工作的过程中，从UI那拿到的设计图通常都是640的设计图或者是750的设计图.

把更多的像素点压缩至一块屏幕里，从而达到更高的分辨率并提高屏幕显示的细腻程度。

![](移动web/2x.png)

设备像素比devicePixelRatio：即像素的压缩比例

**结论 ：在移动端为了在高清屏手机上显示得更加细腻，通常会使用更大的图片，比如2倍图或者3倍图。**



## 视口 viewport

```javascript
问题：一个电脑上的网站，在手机端访问，效果是什么样的？

iPhone5 的设备宽度只有 320px，一张宽度为 640px 的图片在手机端访问，显示的效果是什么？

1. 在手机端，html的 大小都是 980px，为什么？
这主要是历史原因导致的，因为在移动设备刚流行的时候，网站大多都是pc端的，pc端的页面宽度一般都比较大，移动设备的宽度比较小，如果pc端页面直接在移动端显示的话，页面就会错乱。为了解决这个问题，移动端html的大小直接就定死成了980px（因为早起的pc端网站版心就是980px居多）。

2. 视口
在 pc 端，html 的大小默认是继承了浏览器的宽度，即浏览器多宽，html 的大小就是多宽，但是在移动端，多出来了一个视口的概念（乔布斯）,视口说白了就是介于浏览器与 html 之间的一个东西，视口的宽度默认定死了 980px，因此 html 的宽度默认就是 980px，视口的特点是能够根据设备的宽度进行缩放。

3. 视口设置
对于现在的移动端页面来说，视口默认为 980px 肯定不合适，因为设备宽度不够的话，视口会进行缩放，导致页面展示效果不好看。
```

**视口参数设置**

```javascript
// width 设置视口的宽度
// width=device-width   设置视口宽度为设备的宽度（常用）。

// initial-scale 设置初始缩放比例
// initial-scale=1.0  表示不缩放

// user-scalable 设置是否允许用户缩放
// user-scalable=no  不允许用户缩放

// maximum-scale  设置允许的最大缩放比例
// maximum-scale=1.0  可以不设置，因为都禁止用户缩放了。

// minimum-scale 设置允许最小缩放比
// minimum-scale=1.0  不设置，因为都禁用用户缩放了。


// 标准写法：
// 快捷键：  meta:vp + tab键
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
```



## 移动端调试问题

1. 模拟器调试
2. 真机调试：使用手机进行访问。

手机设备五花八门，屏幕尺寸都大不一样，尤其是安卓端，给我们的页面预览带来了一些麻烦。在实际工作中，作为开发者不可能有足够的设备让我们去测试（**除了测试部门** ），即便有，效率也特别的低，因此开发者一般都是通过浏览器的手机模拟器来模拟不同的设备。



# 流式布局

**移动端的特点**

- 手机端的兼容性问题比PC端小很多，因为手机端的浏览器版本比较新
- 手机端屏幕比较小，能够放的内容比较少。

问题：布局的时候怎么解决屏幕大小不一致的问题？

- PC端，固定版心，让所有分辨率的电脑的版心都是一样的，比如京东
- 移动端：移动端无法设置版心，因为移动端的设备屏幕本身就小，设置版心不合适。因此移动端大多会采用流式布局（百分比布局）



**流式布局**，也叫百分比布局，是移动端开发中经常使用的布局方式之一。

流式布局的特征：

- 宽度自适应，高度写死，并不是百分百还原设计图
- 图标都是固定死大小的，包括字体等也是固定死的。并不是所有的东西都是自适应的。
- 一些大的图片，设置宽度为百分比自适应即可，随着屏幕大小进行变化

**流式布局无法做到所有设备都非常逼真的还原设计图，有些设备显示效果不是特别的好看。但是流式布局是移动端非常常用的一种布局方式，比较简单，需要掌握（携程、京东)**

**最后一天会学习rem布局，配合less非常的方便，并且能够实现完全的自适应，包括字体以及图标等**

经典的流式布局

```javascript
1. 左侧固定，右侧自适应
2. 右侧固定，左侧自适应
3. 两侧固定，中间自适应（圣杯布局，双飞翼布局）
4. 等分布局
```



# touch 事件

移动端新增了4个与手指触摸相关的事件

- `touchstart`: 手指放到屏幕上时触发
- `touchmove`: 手指在屏幕上滑动式触发（会触发多次）
- `touchend`: 手指离开屏幕时触发
- `touchcancel`: 系统取消touch事件的时候触发，比如电话



每个触摸事件被触发后，会生成一个event对象，event对象中`changedTouches`会记录手指滑动的信息。

```javascript
e.touches // 当前屏幕上的手指
e.targetTouches // 当前dom元素上的手指。
e.changedTouches // 触摸时发生改变的手指(重点)(如手指离开屏幕)
```

这些列表里的每次触摸由touch对象组成，touch对象里包含着触摸信息，主要属性如下

```javascript
// e.changedTouches[0].clientX
clientX / clientY // 触摸点相对浏览器窗口的位置
pageX / pageY     // 触摸点相对于页面的位置
```

!> 使用 jquery 注册 touch 类事件时，获取手指使用 `e.originalEvent.touchs[0]` ，因为 jq 对事件对象进行了封装

【案例：jdm-滑动轮播图】

【案例：jdm-区域滚动】



## iscroll 插件使用

https://github.com/cubiq/iscroll

[iscroll参考文档](http://www.mamicode.com/info-detail-331827.html)

**注意**：使用 iscroll 需要满足的条件

1. 父盒子嵌套了子盒子（一个）
   1. 如果有多个子盒子，所以我们需要使用一个盒子把所有的子盒子包裹起来
   2. 如果有图片，我们需要保证图片加载完成，如果有浮动，需要清除浮动，为了保证子盒子的高度获取的是正确的
2. 子盒子大小一定要超过父盒子的大小



```javascript
// 使用：box为父盒子
var box = document.querySelector('.box')
new IScroll(box, {
    scrollX:false, // 横向滚动
    scrollY:true // 纵向滚动
  })
```



# zepto 框架

> **Zepto**是一个轻量级的**针对现代高级浏览器的JavaScript库， **它与jquery**有着类似的api**。 如果你会用jquery，那么你也会用zepto。

[github地址](https://github.com/madrobby/zepto)

[中文文档](http://www.css88.com/doc/zeptojs_api/)

## zepto 与 jquery 的区别

- jquery 针对 pc 端，主要用于解决浏览器兼容性问题，zepto 主要针对移动端
- zepto 比 jquery 轻量，文件体积更小
- zepto 封装了一些移动端的手势事件



## zepto 的基本使用

zepto的使用与jquery基本一致，zepto是分模块的，需要某个功能，就需要引入某个zepto的文件

```html
<script src="zepto/zepto.js"></script>
<script src="zepto/event.js"></script>
<script src="zepto/fx.js"></script>
<script>
  $(function () {
    $(".box").addClass("demo")

    $("button").on("click", function () {
      $(".box").animate({width:500}, 1000)
    })
  })
</script>
```



## zepto 的定制

安装Nodejs环境

1、下载zepto.js

2、解压缩

3、cmd命令行进入解压缩后的目录

4、执行`npm install`命令

5、编辑make文件的`41行`，添加自定义模块并保存

7、然后执行命令 `npm run-script dist`

8、查看目录dist即构建好的zepto.js



## zepto 手势事件

zepto中根据`touchstart touchmove touchend`封装了一些常用的手势事件，这些事件都是基于touchstart touchmove touchend封装

```javascript
tap   // 轻触事件,用于替代移动端的click事件，因为click事件在老版本中会有300ms的延迟
swipe //手指滑动时触发
swipeLeft  //左滑
swipeRight  //右滑
swipeUp    //上滑
swipeDown   //下滑
```



# 响应式

## 什么是响应式布局

> 响应式布局（respond layout）是Ethan Marcotte在2010年5月份提出的一个概念，简而言之，就是**一个网站能够兼容多个终端（手机、平板、pc电脑、手表）** ——而不是为每个终端做一个特定的版本。这个概念是为解决移动互联网浏览而诞生的

**为什么要有响应式布局？**

- 在移动互联日益成熟的时候，在PC端开发的网页已经无法满足移动设备的要求
- 通常的做法是针对移动端单独做一套特定的版本
- 如果终端越来越多，那么需要开发的版本就会越来越多（大屏设备的普及）
- **响应式布局** ：一个网站能够兼容多个终端（节约开发成本）

**优点：**

面对不同分辨率设备灵活性强

能够快捷解决多设备显示适应问题

**缺点： **

兼容各种设备工作量大，效率低下

代码累赘，会出现隐藏无用的元素，加载时间加长

其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果

一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

响应式开发现状：

- 如果已经存在PC的网站了，那么一般不会使用响应式开发，而是针对移动端再开发一套系统（比如京东、淘宝）
- 在**新建站点** 上采用响应式开发的越来越多
- 在国内，响应式开发还不是特别的流行。但响应式开发是大势所趋，会越来越流行

## 响应式开发与移动web开发的比较

| 开发方式 | 移动web开发+pc开发                                 | 响应式开发                           |
| -------- | -------------------------------------------------- | ------------------------------------ |
| 引用场景 | 一般已经有了PC端网站，只需要端独开发移动端网站即可 | 针对一些新建网站，并且要求适配移动端 |
| 开发     | 针对性强，开发效率高                               | 兼容各种终端，效率低                 |
| 适配     | 只能适配移动端或者PC端，pad上体验比较差            | 可以适配各种终端                     |
| 效率     | 代码简介，加载快                                   | 代码相对复杂，加载慢                 |



# 媒体查询

> 媒体查询（Media Query）是 CSS3 提出来的一个新的属性，通过媒体查询可以查询到 screen 的宽度，从而指定某个宽度区间的网页布局

## 设备分类

| 分类       | 宽度范围     |
| ---------- | ------------ |
| 大屏设备   | >1200px      |
| 中屏设备   | 992px~1200px |
| 小屏设备   | 768px~992px  |
| 超小屏设备 | < 768px      |



## 媒体查询的使用

需求：

```html
<!--
    大屏设备(>1200px)   版心：1170px   背景色：红色
    中屏设备(992-1200)  版心：970px    背景色：蓝色
    小屏设备(768-992)   版心：750px    背景色：黄色
    超小屏设备(<768px)  版心：100%     背景色：绿色
-->
```

响应式开发的原理：使用媒体查询实现不同终端的布局和样式的切换



媒体查询语法：

```css
/* 查询屏幕 */
/* screen 和第一个 and 可以省略 */
@media screen and 条件 {
}

/* 条件的写法 */
/* min-width: 只要屏幕宽度超过这个值的设备样式就能生效 */
/* max-width: 只要屏幕宽度小于这个值的设备样式就能生效 */
@media screen and (min-width: 1200px) {
  .container {
    width: 1170px;
    background-color: red;
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .container {
    width: 970px;
    background-color: blue;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .container {
    width: 750px;
    background-color: yellow;
  }
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    background-color: green;
  }
}
```





# bootstrap 框架

**【项目：微金所】**



# REM

## rem 是什么？

`rem`（font size of the root element）是指相对于`根元素`的字体大小的单位。它就是一个相对单位。

`em`（font size of the element）是指相对于 `当前元素的字体大小` 的单位。它也是一个相对单位。

它们之间其实很相似，只不过计算的规则一个是依赖根元素，一个是当前元素计算。

```css
html{
  font-size:16px;
}
body {
  font-size:20px;
}
div.em {
  /* em 的计算方式参照的当前元素的 font-size，如果不设置，默认继承自父盒子 */
  width:2em;
  height:2em;
  background-color:red;
}
/* rem 的计算方式参照的是 html 的 font-size */
div.rem {
  width:2rem;
  height:2rem;
  background-color:blue;
}
```



## 为什么要用 rem？

> rem 的主要目的就是解决用于不同屏幕的适配问题。rem 能够等比例的适配所有的屏幕。

由于市面上手机种类繁多，导致移动端的屏幕种类非常的混乱，比如有常见的`320px  360px  375px  384px  480px  640px`等。在开发中，美工一般只会提供750px或者是640px的设计稿，这就要求我们通过一张设计稿能够适配所有的屏幕。通常解决方案如下：

- 流式布局：虽然可以让各种屏幕都适配，但是显示效果不是非常的友好，因为只有几个尺寸的手机能够完美的显示出来视觉设计师和交互最想要的效果。但是目前使用流式布局的公司非常多，比如 [亚马逊](https://www.amazon.cn/) 、[京东](https://m.jd.com/) 、[携程](https://m.ctrip.com/)
- 响应式布局：响应式这种方式在国内很少有大型企业的复杂性的网站在移动端用这种方法去做，主要原因是**工作大，维护性难** 。所以一般都是中小型的门户或者博客类站点会采用响应式的方法从PC端页面到移动端页面以及web app直接一步到位，因为这样反而可以节约成本。
- rem布局：rem能够适配所有的屏幕，与less配合使用效果会更好。目前使用rem布局的有：[淘宝](https://m.taobao.com) 、 [苏宁](https://m.suning.com/)



## rem 布局

因为 rem 的基准点是根元素html的字体大小，因此我们只需要设置不同屏幕的 html 的 font-size 大小不一样就可以达到不同屏幕的适配了。

### rem 配合媒体查询

使用 rem 配合媒体查询可以适配多个终端

```css
@media(min-width: 320px) {
    html {
        /* 基准值 / 设计图的大小  = 某个屏幕的font-size / 屏幕的宽度 */
        /* 100/750 = x/370 */
        font-size: 50px;
	}
}
...
```



优点：使用媒体查询适配，速度快。

缺点：适配多个终端时，需要添加响应的代码。

### rem 配合 javascript

通过 javascript 获取可视区的宽度，计算 font-size 的值，也可以适配多个终端

```javascript
// 根据屏幕的大小动态设置 html的 font-size
function responsive () {
  var uiWidth = 750 // 设计图宽度
  var base = 100 // 设计图中1rem的大小
  // 当前屏幕的大小
  var pageWidth = window.innerWidth
  if(pageWidth >= 750) {
    pageWidth = 750
  }
  if(pageWidth <= 320) {
    pageWidth = 320
  }
  // 说白了就是把一个屏幕分成了 7.5 rem
  document.documentElement.style.fontSize = (base / uiWidth * pageWidth).toFixed(2) + ’px‘
}
```

优点：直接适配所有的终端

缺点：必须在页面加载之前设置html的font-size值，不然会出现文字大小调动的情况。



### rem 配合 flexible 插件

- flexible 插件基准值（base）是设计图的 1/10

- 使用 flexible

1. 在 header 中引入 flexible.js 这个文件

1. 根据设计图能够确定基准值， 配合 px2rem 插件 ，需要设置一个 rootFontSize



【案例：苏宁易购】



# swiper 插件

> Swiper 是纯 javascript 打造的滑动特效插件，面向手机、平板电脑等移动终端

[swiper中文网](http://www.swiper.com.cn/)



# other

```css
a {
  /* 取消链接高亮, 移动端特有的样式  */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

