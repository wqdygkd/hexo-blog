---
title: jquery
tags: jquery
categories:
- [框架, jquery]
date: 2018/10/16 18:00:00
updated: 2018/12/20 19:27:00
---

# jQuery

## jQuery 基本介绍

### 为什么要学 jQuery

使用 JS 操作 DOM 的时候，会遇到以下的一些缺点：

* 获取元素的方法太少且长，麻烦
* 遍历伪数组很麻烦，通常要嵌套一大堆的 for 循环。注册的事件会覆盖
* 有兼容性问题
* 实现动画很麻烦



### jQuery 初体验

【让div显示与设置内容】

```javascript
$(document).ready(function () {
  $('#btn1').click(function () {
    // 隐式迭代：偷偷的遍历，在jQuery中，不需要手动写for循环了，会自动进行遍历。
    // show() 显示元素
    $('div').show(200)
  })
  $('#btn2').click(function () {
    // text() 设置文本内容
    $('div').text('我是内容')
  })
  $('#btn3').click(function () {
    // css(name, value);  设置样式
    // name: 设置什么样式
    // value ： 设置的值是多少
    $('div').css('fontSize', 30)
  })
})
```

**使用 jQuery 的优点**

* 获取元素的方式非常的简单，而且非常的丰富
* jQuery 的隐式迭代特性，不再需要书写 for 循环语句
* 使用 jQuery 完全不用考虑兼容性问题
* jQuery 提供了一系列动画相关的函数，使用非常方便
* 代码简单、粗暴



**什么是 jQuery**

> jQuery 是一个快速的、轻量的、功能丰富的 js 库

jQuery 的官网 [http://jquery.com/](http://jquery.com/)

js 库：把一些常用到的方法写到一个单独的 js 文件，使用的时候直接去引用这 js 文件就可以了。（animate.js、common.js）



### 版本介绍

官网下载地址：[http://jquery.com/download/](http://jquery.com/download/)

jQuery 版本有很多，分为 1.x 2.x 3.x

大版本分类：

```
1.x 版本：能够兼容IE678浏览器（最终版本1.12.4）
2.x 版本：不兼容IE678浏览器（最终版本2.2.4）
3.x 版本：不兼容IE678，更加的精简（在国内不流行，因为国内使用 jQuery 的主要目的就是兼容IE678）,3.x 版本只是在原来的基础上增加了一些新的特性
```

关于压缩版和未压缩版

* `jquery.min.js`：压缩版本，适用于生产环境，因为文件比较小，去除了注释、换行、空格等东西，采用了代码混淆，基本没有可阅读性
* `jquery.js`：未压缩版本，适用于学习与开发环境，源码清晰，易阅读



### 入口函数

入口函数的好处：

* 等待文档加载完成，不论代码是写在 body、head 中都可以正常去获取到元素
* 形成了一个沙箱，防止全局变量污染

两种写法：

```javascript
// 第一种写法
$(document).ready(function () {})
// 第二种写法
$(function () {})
```

原生 JavaScript 的入口函数：

```javascript
window.onload = function () {}
```



jQuery 入口函数与 js 入口函数的对比

* JavaScript 的入口函数要等到页面中所有资源（包括图片、文件等外部资源）加载完成才开始执行。jQuery 的入口函数只会等待文档树加载完成就开始执行，并不会等待图片、文件的加载。所以 jQuery 的入口函数要比 js 入口函数先执行
* window.onload 存在覆盖问题；jq 的入口函数不存在覆盖问题



### jQuery 使用步骤

```html
<!-- 引包（引入js文件） -->
<script src='jquery.js'></script>
<script>
  // 写上入口函数
  $(document).ready(function () {})
  // 或者
  $(function () {
    // 在入口函数内部实现功能
  })
</script>
```



### jquery 中的 $ 符号

$ 来源于  jQuery ， 是个函数（查看jQuery源码中最后几行代码）

```javascript
// jquery 和 $ 是等价的
jQuery === $ // true
```



**作用**：根据参数的不同， 作用是不同的

* 参数是个函数  `$(function(){}) ` 作用是入口函数

* 参数是个 dom 对象  `$(document)  ` 作用是 dom 转 jq

* 参数是选择器  `$('body')`  作用是获取元素

* 参数是个 html 字符串 `$('<a>123</a>')`  作用是创建节点



### jQuery 对象与 DOM 对象

**基本概念：**

1. `DOM 对象`：使用 JavaScript 中的方法获取页面中的元素返回的对象就是 Dom 对象
2. `jQuery 对象`：jquery 对象就是使用 jquery 的方法获取页面中的元素返回的对象
3. jQuery 对象其实就是 DOM 对象的包装集（包装了 DOM 对象的集合），是一个 **伪数组**

**jQuery 对象与 DOM 对象的区别：**

1. DOM 对象与 jQuery 对象的方法不能混用。dom 对象不能使用 jq 对象的方法，jq 对象也不能使用 dom 对象的属性和方法
2. DOM 对象可以和 jQuery 对象可以相互转化



* DOM 对象转换成 jQuery 对象：【联想记忆：花钱】

```javascript
// 将 dom 对象作为参数传递到 $() 里面去， 那么这个整体就是个jq对象
var $obj = $(domObj)
```

* jQuery 对象转换成 DOM 对象：

```javascript
// 通过 $()  来获取到的元素返回的对象就是jq对象

var $li = $('li')
// 第一种方法,通过下标取出（推荐使用）
$li[0]
// 第二种方法
$li.get(0)
```

【练习：隔行变色案例】



## 选择器

###  jQuery 选择器

jQuery 选择器是 jQuery 为我们提供的一组方法，让我们更加方便的获取到页面中的元素。注意：jQuery 选择器返回的是 jQuery 对象

jQuery 选择器有很多，基本兼容了 CSS1 到 CSS3 所有的选择器，并且 jQuery 还添加了很多更加复杂的选择器



### css 选择器

jQuery 完全兼容 css 选择器

| 名称       | 用法              | 描述                                                         |
| ---------- | ----------------- | :----------------------------------------------------------- |
| ID选择器   | $('#id')          | 获取指定 id 的元素                                           |
| 类选择器   | $('.class')       | 获取同一类 class 的元素                                      |
| 标签选择器 | $('div')          | 获取同一类标签的所有元素                                     |
| 并集选择器 | $('div, p, li')   | 使用逗号分隔，只要符合条件之一就可                           |
| 交集选择器 | $('div.redClass') | 获取 class 为 redClass 的 div 元素                           |
| 子代选择器 | $('ul>li')        | 使用 > 号，获取儿子层级的元素，注意，并不会获取孙子层级的元素 |
| 后代选择器 | $('ul li')        | 使用空格，代表后代选择器，获取 ul 下的所有 li 元素，包括孙子等 |



### 过滤选择器

这类选择器都带冒号 `:`

| 名称         | 用法          | 描述                                                         |
| ------------ | ------------- | :----------------------------------------------------------- |
| `:eq(index)` | $('li:eq(2)') | 获取 li 元素中，选择索引号为 2 的元素，索引号 index 从 0 开始 |
| `:odd`       | $('li:odd')   | 获取 li 元素中，选择索引号为奇数的元素                       |
| `:even`      | $('li:even')  | 获取 li 元素中，选择索引号为偶数的元素                       |
| `:first`     | $('li:first') | 获取 li 元素中的第一个                                       |
| `:last`      | $('li:last')  | 获取 li 元素中的最后一个                                     |

【案例：隔行变色】



### 筛选选择器(方法)

筛选选择器的功能与过滤选择器有点类似，但是用法不一样，`筛选选择器` 主要是方法

| 名称                 | 用法                       | 描述                                  |
| -------------------- | -------------------------- | :------------------------------------ |
| `children(selector)` | $('ul').children('li')     | 获取当前元素的所有子元素中的 li 元素  |
| `find(selector)`     | $('ul').find('li')         | 获取当前元素中的后代元素中的 li 元素  |
| `siblings(selector)` | $('#first').siblings('li') | 查找兄弟节点，不包括自己本身          |
| `parent()`           | $('#first').parent()       | 查找父亲                              |
| `parents()`          | $('#first').parents('')    | 查找所有祖宗（参数 指定具体祖宗）     |
| `eq(index)`          | $('li').eq(2)              | 相当于`$('li:eq(2)')`，index从 0 开始 |
| `next()`             | $('li').next()             | 找下一个兄弟                          |
| `nextAll()`          | $('li').nextAll()          | 找后面所有的兄弟                      |
| `prev()`             | $('li').prev()             | 找上一个兄弟                          |
| `prevAll()`          | $('li').prevAll()          | 找前面所有的兄弟                      |

【案例：下拉菜单】
【案例：突出展示】
【案例：手风琴】
【案例：淘宝精品】



### 补充

#### `mouseover` 与 `mouseenter`

* mouseover 和 mouseoverenter 都有鼠标经过的意思，但是在注册鼠标经过事件的时候，推荐使用`mouseenter`

[mouseenter 与 mouseover 的不同](http://www.w3school.com.cn/tiy/t.asp?f=jquery_event_mouseenter_mouseover)

* mouseover 与 mouseout 是一对事件，当鼠标经过当前元素或者当前元素的子元素的时候，会触发【事件冒泡】。

* mouseenter 与 mouseleave 是一对事件，只有当鼠标经过当前元素时，事件会触发，鼠标经过子元素，mousenter 事件是不会触发的



#### index 方法

`index()` 方法返回的是当前元素在所有兄弟元素里面的索引



#### 区分 jQuery 与 Javascript

JavaScript 是一门编程语言，jQuery 仅仅是用 JavaScript 实现的一个 JavaScript 库，目的是简化我们的开发



## jQuery 样式操作

### css 操作

功能：设置或者修改样式，操作的是 style 属性

设置单个样式

```javascript
// name：需要设置的样式名称
// value：对应的样式值
css(name, value)

// 使用案例
$('#one').css('background', 'gray') // 将背景色修改为灰色
```

设置多个样式

```javascript
// 参数是一个对象，对象中包含了需要设置的样式名和样式值
css(obj)

// 使用案例
$('#one').css({
  background: 'gray',
  width: '400px',
  height: '200px'
})
```

获取样式

```javascript
// name: 需要获取的样式名称
css(name)

// 案例
$('div').css('background-color')
```

注意：

* 设置操作的时候，如果是多个元素，那么给所有的元素设置相同的值
* 获取操作的时候，如果是多个元素，那么只会返回第一个元素的值



### class 操作

* 添加样式类

```javascript
// 给所有的 div 添加 one 的样式
$('div').addClass('one')
```

* 移除样式类

```javascript
// 移除 div 中 one 类名
$('div').removeClass('one')
```

* 判断是否有某个样式类

判断标准是： 只要有一个元素有指定的类名，就返回 true，所有的元素都没有该类名，就返回 false

```javascript
// 判断是否有 one 的样式类
$('div').hasClass('one')
```

* 切换样式类

```javascript
// 如果有，移除该类，如果没有，添加该类
$('div').toggleClass('one')
```

【案例：tab栏切换案例.html】



## jQuery 属性操作

### attr 操作

设置单个属性

```javascript
// 第一个参数：需要设置的属性名
// 第二个参数：对应的属性值
attr(name, value)
// 用法举例
$('img').attr('title', '哈哈')
```

设置多个属性

```javascript
// 参数是一个对象，包含了需要设置的属性名和属性值
$('img').attr({
  title: 'hello',
  alt: 'hello',
  style: 'opacity: .5'
})
```

获取属性

```javascript
// 传需要获取的属性名称，返回对应的属性值
var oTitle = $('img').attr('title')
```

移除属性

```javascript
// 参数：需要移除的属性名
$('img').removeAttr('title')
```

【案例：美女相册.html】



### prop 操作

在jQuery1.6之后，对于 checked、selected、disabled 这类 boolean 类型的属性来说，不能用 attr 方法，只能用 prop 方法

```javascript
// 设置属性
$('input:checked').prop('checked', true)
// 获取属性
$('input:checked').prop('checked') // 返回 true 或者 false
```

【案例：表格全选案例.html】



## jQuery 动画

jquery 提供了三组基本动画，这些动画都是标准的、有规律的效果，jquery 还提供了自定义动画的功能

### 三组基本动画

* 显示 (show) 与隐藏 (hide) 与切换 (slideToggle)
* 上滑 (slideUp) 与下滑 (slideDown) 与切换 (slideToggle)，效果与卷帘门类似
* 淡入 (fadeIn) 与淡出 (fadeOut) 与切换 (fadeToggle)

```javascript
// show() 系列
show([speed], [easing], [callback])
// speed(可选)：动画的执行时间
	// 1.如果不传，就没有动画效果。如果是 slide 和 fade 系列，会默认为 normal
	// 2.毫秒值(比如1000),动画在1000毫秒执行完成(推荐)
	// 3.固定字符串，slow(200)、normal(400)、fast(600)，如果传其他字符串，则默认为normal
// easing(可选)：动画效果，默认是 swing，秋千，提供了一个 linear 匀速的效果
// callback(可选)：执行完动画后执行的回调函数

// slide 系列，参数使用和show 是一样的，不传参数，默认有动画效果
slideDown([speed], [easing], [callback])

// fade 系列，参数使用和 show 是一样的，不传参数，默认有动画效果
fadeIn([speed], [easing], [callback])
```



【案例：下拉菜单动画版.html】
【案例：京东轮播图(呼吸灯).html】



### 自定义动画

animate：自定义动画（只支持数值型的动画）

```javascript
$(selector).animate({ params }, [speed], [easing], [callback])
// {params}：要执行动画的 CSS 属性，带数字（必选），多个属性会同时执行
// speed：执行动画时长（可选）
// easing: 执行效果，默认为swing（缓动）  linear（匀速）
// callback：动画执行完后立即执行的回调函数（可选）
```



### 动画队列与停止动画

在同一个元素上执行多个动画，那么对于这个动画来说，后面的动画会被放到动画队列中，等前面的动画执行完成了才会执行

```javascript
// 有顺序的执行效果
// 动画队列：
// 像链式编程一样，通过 . 继续写动画，给元素添加了多个动画, 这多个动画会添加到元素的动画队列里面，按照顺序依次执行
$(function () {
  $('div')
    .animate({ left: 800 }, 1000)
    .animate({ top: 300 }, 1000)
    .animate({ borderRadius: 50 }, 1000)
    .slideUp(2000)
    .slideDown(2000)
})
// 好处：可以有顺序的执行动画效果
// 坏处：bug 给元素不停的添加动画，元素就不停的运动
```

* stop 方法

```javascript
// 停止当前正在执行的动画，如果元素的动画队列里面有后续动画，后续动画会执行
stop(clearQueue, jumpToEnd)
// 第一个参数：可选，是否清除队列，true，表示清除掉，默认 false
// 第二个参数：可选，是否跳转到当前正在执行的动画的最终效果，true，表示跳转， 默认false
```

【案例：手风琴特效】
【案例：音乐导航】



## jQuery 节点操作

### 创建节点

```javascript
// $()
// 括号内写 html 格式的字符串
$('<span>这是一个span元素</span>')
```

### 添加节点

```javascript
// append
A.append(B) // 把 B 添加到 A 里面去，B 作为 A 的最后一个子元素
// appendTo
B.appendTo(A) // 作用同上，写法不同

// prepend
A.prepend(B) // 把 B 添加到 A 里面去，B 作为 A 的第一个子元素
// prependTo
B.prependTo(A) // 作用同上，写法不同

// after
A.after(B) // 把 B 作为 A 的兄弟，添加在 A 的后面
// before
A.before(B) // 把 B 作为 A 的兄弟，添加在 A 的前面
```

【案例：城市选择案例】



### 清空节点与删除节点

empty：清空指定节点的所有元素，自身保留(清理门户)

```javascript
$('div').empty() // 清空 div 的所有内容（推荐使用，会清除子元素上绑定的内容，源码）
$('div').html('') // 使用 html 方法来清空元素，不推荐使用，会造成内存泄漏，绑定的事件不会被清除
```



remove：删除节点，会把元素自身给删除掉

```javascript
$('div').remove() // 删除 div 节点
```



### 克隆节点

clone：克隆元素节点

```javascript
$('div').clone() // 返回复制的 div 新元素，（默认不显示，需要配合 append 方法）
// 新元素和原来的元素没有任何关系

// clone(布尔类型参数)， 参数为true， 克隆元素的事件，默认值是false
```



## jQuery 特殊属性操作

### val()

val 方法用于设置和获取表单元素的值，例如 input、textarea 的值

```javascript
// 设置值
$('#name').val('张三')
// 获取值
$('#name').val()
```

【案例：搜索框】



### html() 与 text()

html 方法相当于 innerHTML，text 方法相当于 innerText

```javascript
// 设置内容
$('div').html('<span>这是一段内容</span>')
// 获取内容
$('div').html()

// 设置内容
$('div').text('<span>这是一段内容</span>')
// 获取内容
$('div').text()
```

**区别**：html 方法会识别 html 标签，text 方法会将内容直接当成字符串，并不会识别 html 标签



### width() 与 height()

设置或者获取 **内容区域** 的宽度和高度

```javascript
// 带参数表示设置
$('div').width(200)
$('div').height(200)

// 不带参数表示获取
$('div').width()
$('div').height()
```



获取 **内容区域 + padding** 的宽度和高度

```javascript
$('div').innerWidth()
$('div').innerHeight()
```



获取 **内容区域 + padding + border** 的宽度和高度

```javascript
$('div').outerWidth()
$('div').outerHeight()
```



获取 **内容区域 + padding + border + margin** 的宽度和高度

```javascript
// 传入参数true
$('div').outerWidth(true)
$('div').outerHeight(true)
```



获取网页的可视区宽高

```javascript
$(window).width()
$(window).height()
```



### scrollTop 与 scrollLeft

设置或者获取垂直滚动条的位置

```javascript
// 传参表示设置，不传参表示获取
$(window).scrollTop(2000)
$(window).scrollLeft()

// 实时的去获取到页面垂直卷曲的距离
$(window).scroll(function () {
  console.log($(window).scrollTop())
  console.log($(window).scrollLeft())
})
```



**返回顶部固定写法**

```javascript
$goTop.click(function () {
  $('html, body').animate(
    {
      scrollTop: 0
    },
    1000
  )
})
```

【案例：固定菜单栏案例】
【案例：小火箭返航案例】



### offset 方法与 position 方法

offset 方法获取元素距离 document 的位置，position 方法获取的是元素距离有定位的父元素的位置

```javascript
// 获取元素距离 document 的位置，和父元素没有关系，返回值为对象：{left:100, top:100}
$(selector).offset()

// 获取相对于其最近的有定位的父元素的位置，返回值为对象
$(selector).position()
```



## jQuery 事件机制

JavaScript 中已经学习过了事件，但是 jQuery 对 JavaScript 事件进行了封装，增加并扩展了事件处理机制。jQuery 不仅提供了更加优雅的事件处理语法，而且极大的增强了事件的处理能力。



### jQuery 事件发展历程(了解)

简单事件绑定>> bind 事件绑定>> delegate 事件绑定 >>on 事件绑定(推荐)

- 简单方式事件注册

```javascript
// jq 中简单方式注册相同的事件是不会被覆盖的
$('div').click(function () {
  alert('2')
})
$('div').click(null) // alert('2') 依然会执行
```

缺点：不能同时注册多个事件，无法解绑事件



- bind 方式注册事件

```javascript
// 第一个参数：事件类型，如果需要给元素注册多个事件，可以用空格隔开写上多个事件名
// 第二个参数：事件处理函数
$('p').bind('click mouseenter', function () {
  // 事件响应方法
})
```

unbind  解绑事件（不用）

```javascript
$('div').unbind() // 不传参数解绑所有的事件
$('div').unbind('click') // 解绑指定的事件
```

缺点：不支持动态事件绑定



- delegate 注册委托事件

  事件是注册给父元素的，由子元素去触发该事件

  原理： 事件冒泡

  优点：节省内存，支持动态绑定

```javascript
// 第一个参数：要绑定事件的元素
// 第二个参数：事件类型
// 第三个参数：事件处理函数
$('div').delegate('p', 'click', function () {
  // 事件注册给了父元素 div，为所有的子元素 p 绑定事件， 由 p 去触发事件
})
```

undelegate 解绑事件（不用）

```javascript
$('div').undelegate() // 解绑所有的 delegate 事件
$('div').undelegate( 'click' ) // 解绑所有的 click 事件
```

缺点：只能注册委托事件，因此注册时间需要记得方法太多了



### on 注册事件(重点)

jQuery 1.7 之后，jQuery 用 on 统一了所有事件的处理方法，强烈建议使用

- on 注册简单事件

```javascript
// 表示给 $('div') 绑定事件，并且由自己触发，不支持动态绑定
$('div').on('click', function () {})
```

- on 注册委托事件

```javascript
// 表示给 $('div') 绑定代理事件，必须是它的内部元素 span 才能触发这个事件，支持动态绑定
$('div').on('click', 'span', function () {})
```

- on 注册事件的语法

```javascript
// 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
// 第二个参数：selector, 执行事件的后代元素（可选），如果没有后代元素，那么事件将有自己执行
// 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用（不常使用）
// 第四个参数：handler，事件处理函数
$(selector).on(events[,selector][,data],handler)
```



### off 解绑事件

```javascript
// 解绑匹配元素的所有事件，父元素子元素的所有事件都解绑了
$('div').off()
// 解绑匹配元素的所有 click 事件
$('div').off('click')
// 解绑子元素 p 的所有 click 事件, 父元素的click事件不会被解绑
$('div').off('click', 'p')
```



### 触发事件

```javascript
// 点击 div 触发事件
$('div').on('click', function () {
  alert(2)
})

// 可由其他元素触发 div 的事件
// 点击 btn 触发 div 的 click 事件
$('#btn').on('click', function () {
  // $('div').click() // 触发 div 的 click 事件
  $('div').trigger('click') // trigger(type) 触发 div 的 click 事件
})
```



### jQuery 事件对象

jQuery 事件对象其实就是js事件对象的一个封装，处理了兼容性

```javascript
// screenX 和 screenY 对应屏幕最左上角的值
// clientX 和 clientY 距离页面左上角的位置（忽视滚动条）
// pageX 和 pageY 距离页面最顶部的左上角的位置（会计算滚动条的距离）

// event.keyCode 按下的键盘代码
// event.data 存储绑定事件时传递的附加数据

// event.stopPropagation() 阻止事件冒泡行为
// event.preventDefault() 阻止浏览器默认行为
// return false 既能阻止事件冒泡，又能阻止浏览器默认行为
```

**注意**：`js` 中的 `return false` 只能起到阻止浏览器的默认行为，`jquery` 中的 `return false`  既能阻止事件冒泡也能阻止浏览器的默认行为

【案例：钢琴版导航（加强)】

【案例：弹幕效果】



## jQuery 特点

### 隐式迭代

#### 基本概念

隐式迭代：jQuery 在设置属性时会自动的遍历，因此我们不需要再遍历

1. jQuery 在执行设置性操作时，会给所有的元素都设置上相同的值
2. jQuery 在执行获取性操作时，只会返回第一个元素对应的值
3. 如果想要给每一个元素都设置不同的值，需要手动进行遍历 jQuery 对象

#### each方法

遍历 jQuery 对象集合，为每个匹配的元素执行一个函数

语法：

```javascript
$(selector).each(function (index, element) {
  // index 表示当前元素在所有匹配元素中的索引号
  // element 表示当前元素
  // this 在函数内部，this指向了element
})

$('li').each(function (index, ele) {
  // $(ele).css('backgroundColor', arr[index])
  $(this).css('backgroundColor', arr[index])
})
```



### 链式编程

链式编程的原理：设置性操作会返回一个 jQuery 对象，因此可以继续调用 jQuery 的方法

1. 设置操作的时候，可以使用链式编程
2. 获取操作的时候，无法使用链式编程，（因为没有返回jq对象）
3. 链式编程不要太长，因为代码可读性差

```javascript
prevObject: 返回上一次找到的jq对象
end() // 上一次返回的 jq 对象（封装了 prevObject 属性）
```

【案例：五角星评分案例.html】



### 多库共存

jQuery 使用 `$ `作为标示符，但是如果与其他框架中的 `$` 冲突时，jQuery 可以释放 `$` 符的控制权

```javascript
// noConflict() // 返回 $ 的功能
var c = $.noConflict() // 释放 $ 的控制权,并且把 $ 的能力给了 c
```



## jQuery 插件

插件：其实就是个 js 库，依赖于 jquery，而且在 jquery 的基础上新增一些功能

### 使用插件

```
1. 先引入jQuery文件
2. 在引入插件（如果有用到css的话，需要引入css）
3. 使用插件
```

常用插件的使用

- [jquery.color.js](https://github.com/jquery/jquery-color)

  animate 只支持数值型的动画，色值型的不支持，这个插件就可以让animate 做色值型的动画

- [jquery.lazyload.js](https://github.com/tuupola/jquery_lazyload)

```javascript
// 使用方法
// html图片调用方法
// 为图片加入样式 lazy 图片路径引用方法用 data-original
// <img class='lazy' data-original='img/1.jpg'>
// js出始化lazyload并设置图片显示方式
$(function () {
  $('img.lazy').lazyload({
    effect: 'fadeIn',
    placeholder: 'img/2.jpg', // 用图片提前占位,待图片加载时,占位图则会隐藏
    effect: 'fadeIn', // 载入使用何种效果
    threshold: 200, // 表示滚动条在离目标位置200的高度时开始加载图片,可以做到不让用户察觉
    event: 'click' // 事件触发时才加载
  })
})
```



### 制作 jQuery 插件

制作 jQuery 插件的核心思想：给 jQuery 的原型增加方法即可。

```javascript
$.fn.pluginName = function () {}
```

- 制作基本的jQuery插件（jquery.bgc.js）
- 制作手风琴插件



## jQuery 架构

看源码学习推荐看 1.7.0 版本，源码比较清晰

### jq 的基本架构

沙箱 ，减少全局污染

```javascript
;(function (window, undefined) {
  // console.log(undefined)
  var jQuery = function () {}
  // 往外暴露
  window.jQuery = window.$ = jQuery
})(window)
var jq = new jQuery() // ==> 得到一个jq的实例对象
console.log(jq)
```

参数 `window` 的作用：

- 减少对 window 的搜索过程
- 有利于代码压缩

参数 `undefined` 的作用：

- 参数 `undefined` 的值是 `undefined`
- `undefined` 这个数据类型的值在ie678 中是可以被修改的，现在有 `undefined` 形参在这，在沙箱里面去使用 `undefined` 的时候，就不会去引用外面被修改的 `undefined` 的值



### 省去 new 操作

```javascript
// 省去 new 操作，得到一个jq的实例对象
;(function (window, undefined) {
  // jQuery 是 工厂函数， 里面干啥？
  var jQuery = function (selector) {
    // return new 构造函数
    // 在 jq 里面，真正的构造函数是 init，而且 init 方法放在 jq 的原型上
    // jQuery.fn.init ==> 是从 jq 的原型上拿 init 方法
    return new jQuery.fn.init(selector) // init 何种调用模式， 构造函数模式
  }

  jQuery.fn = jQuery.prototype = {
    // 原型替换
    constructor: jQuery,
    init: function (selector) {
      // init 是真正的构造函数
      // 获取元素
      var ele = document.querySelectorAll(selector)
      // this ==> init的实例对象
      ;[].push.apply(this, ele)
    },

    css: function () {
      console.log('css is ok')
    }
  }

  window.jQuery = window.$ = jQuery
})(window)

// 把 init 的构造函数的 prototype 改成 jquery 的原型
// 目的： 让 init 的实例对象可以访问 jq 原型上的方法
jQuery.fn.init.prototype = jQuery.fn

var $div = $('div') // init实例对象
console.log($div)
$div.css()
```