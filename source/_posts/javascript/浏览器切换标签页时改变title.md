---
title: 浏览器切换标签离开当前页面时改变 title 提示
date: 2019/09/27
updated: 2019/09/27
categories:
  - [js]
---

```js
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState == 'hidden') {
    normal_title = document.title
    document.title = '离开了'
  } else document.title = normal_title
})
```
