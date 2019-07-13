---
title: Fixed定位脱离Viewport的bug
tags: [html&css]
categories:
- [html&css]
date: 2018/08/27 18:00:00
updated: 2019/01/21 02:17:00
---


### Fixed定位脱离Viewport的bug



```html
<style>
  .outer {
    overflow: hidden;
    width: 300px;
    height: 300px;
    background: yellow;
  }
  .mid {
    margin: 20px;
    width: 200px;
    height: 200px;
    transform: translate(0, 0);
    background: greenyellow;
  }
  .inner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: pink;
    z-index: 1
  }
</style>
</head>
<body>
  <div class="outer">
    <div class="mid">
      <div class="inner"></div>
    </div>
  </div>
</body>
</html>
```

对于声明transfrom值非none元素，其子元素中若存在position: fixed将以声明transform的最近祖先作为基准而定位，这是因为transfrom值非none的元素[定义了一个局部坐标系统](http://www.w3.org/TR/css3-2d-transforms/#transform-rendering)，导致postion: fixed以此坐标系统计算布局。

