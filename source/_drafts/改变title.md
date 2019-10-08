---
title: 浏览器切换标签离开当前页面时改变title提示
date: 2019/09/27
updated: 2019/09/27
categories:
  - [vue]
---

```js
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState == 'hidden') {
    normal_title = document.title
    document.title = '离开了'
  } else document.title = normal_title
})
```
