---
title: Fixed 定位脱离 Viewport 的 bug
tags:
  - css
id: '393'
categories:
  - 前端
date: 2018-08-27 22:09:05
---

### Fixed 定位脱离 Viewport 的 bug

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

对于声明 transfrom 值非 none 元素，其子元素中若存在 position: fixed 将以声明 transform 的最近祖先作为基准而定位，这是因为 transfrom 值非 none 的元素[定义了一个局部坐标系统](http://www.w3.org/TR/css3-2d-transforms/#transform-rendering)，导致 postion: fixed 以此坐标系统计算布局。
