---
title: fullpage 全屏网站插件
tags: [插件, jquery]
categories:
- [框架, jquery]
- [插件]
date: 2018/11/23 18:00:00
updated: 2019/04/29 11:17:00
---

## fullpage

fullPage.js 是一个基于 jQuery 的插件，它能够很方便、很轻松的制作出全屏网站

参考文档 [http://www.dowebok.com/77.html](http://www.dowebok.com/77.html)

下载地址 [https://github.com/alvarotrigo/fullPage.js](http://www.dowebok.com/77.html)



### 基本使用

1. 引入jQuery文件，因为fullpage是jquery插件
2. 引入fullpage的js文件
3. 页面结构
4. 编写js代码

```html
<!-- 页面结构 -->
<div id="box">
  <!-- 每一个class为section的div都是一屏,section这个类是固定的 -->
  <div class="section">我是内容1</div>
  <div class="section">我是内容2</div>
  <div class="section">我是内容3</div>
  <div class="section">我是内容4</div>
</div>
```

```javascript
// 编写js代码
$(function () {
  $('#box').fullpage()
})
```



### 鼠标滚轮滚动事件

```javascript
window.addEventListener('mousewheel', function (e) {
  console.log(e.wheelDelta)
  if (e.wheelDelta > 0) {
    console.log('往上滚了')
  } else {
    console.log('往下滚了')
  }
  console.log('鼠标滚轮事件触发了')
})
```



### 常用参数

| 属性名称                 | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| **sectionsColor**        | 设置每一个section的背景颜色（为一个数组）                    |
| controlArrows            | 定义是否使用箭头来控制幻灯片，默认true                       |
| **verticalCentered**     | 设定每一个section的内容是否垂直居中，默认true，              |
| resize                   | 设定字体是否随着窗口缩放而缩放，默认false，一般不修改        |
| **scrollingSpeed**       | 设置滚动的速度，默认700毫秒                                  |
| easing                   | 设置动画的方式，默认是easeInOutCubic,如果想要修改此页，需要引入jquery.easing.js |
| css3                     | 是否使用css3 transform来实现滚动效果，默认true，不用修改，CSS3的动画效率比较js高。 |
| loopTop                  | 滚动到顶部后是否连续滚动到底部，默认false                    |
| loopBottom               | 滚动到底部后是否连续滚动到顶部，默认false                    |
| loopHorizontal           | 设置幻灯片是否循环滚动，默认true                             |
| **continuousVertical**   | 是否循环滚动，默认为false，如果设置为true，则页面会循环滚动，不会出现loopTop与loopBottom那样的跳动。 |
| autoScrolling            | 是否使用插件的滚动方式，默认true，如果选择false，会出现浏览器子代的滚动条，将不会按页滚动，按照滚动进行滚动。 |
| scrollBar                | 是否包含滚动条，默认false，如果设置为true，那么浏览器自定的滚动条会出现，这个时候，页面滚动还是按页滚动，但是浏览器也能滚动。不建议开启，不然会不同步。 |
| paddingTop/paddingBottom | 给每一个section设置一个paddingTop或者paddingBottom,默认值为0，如果需要给页面设置一个固定定位的头部菜单或者底部菜单的时候，可以使用这两个选项。 |
| keyboardScrolling        | 是否可以使用键盘方向键导航，默认true                         |
| **navigation**           | 是否显示导航，默认为false，设置为true，会显示小圆点，作为导航 |
| navigationPositon        | 导航小圆点的位置，设置left或者right，默认是right             |
| navigationTooltips       | 小圆点的提示信息，鼠标一上去能看到提示信息                   |
| showActiveTooltip        | 是否显示当前页面的导航的tooltip信息，默认是false             |
| slidesNavigation         | 是否显示横向幻灯片的导航，默认为false                        |
| slidesNavPosition        | 设置横向幻灯片的位置，top或者bottom，默认bottom              |
| sectionSelector          | section的选择器，默认是.section                              |
| slideSelector            | slide的选择器，默认是.slide                                  |



### 常用回调函数

| 方法名                                                       | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| afterLoad(anchorLink, index)                                 | 滚动到某一个section,当滚动结束后，会触发一次这个回调函数，anchorLink是锚链接的名称，index从1开始计算 |
| onLeave(index,nextIndex,diretion)                            | 当我们离开一个section时，会触发这个函数，index是离开的页面的序号，从1开始计算。  nextIndex是滚动到的页面的序号，direction是往上还是往下滚动，值是up或者down.  return false可以取消滚动 |
| afterResize()                                                | 窗口大小发生改变后会触发的回调函数                           |
| afterSlideLoad(anchor,index,  slideAnchor,slideIndex)        | 页面滚动到某一个幻灯片的时候会触发这个回调函数               |
| afterSlideLeave(anchor,index,slideIndex,  diretion,nextSlideIndex) | 当离开某一个幻灯片的时候会触发一次这个回调函数。             |

