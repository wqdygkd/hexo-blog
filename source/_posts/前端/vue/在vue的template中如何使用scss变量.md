---
title: 在vue的template中如何使用scss变量
tags: []
id: '2000'
categories:
  - 前端
date: 2020-11-06
---



在 scss 中使用 `:export` 暴露变量

```scss
$color: #009A61;
//暴露css
:export {
  color: $color;
}
```

在 `script` 中引入变量

```js
import variables from '@/assets/styles/variables.scss'
```

在 `computed` 中缓存暴露变量

```js
computed: {
  variables() {
    return variables
  }
}
```
