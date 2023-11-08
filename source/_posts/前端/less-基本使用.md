---
title: LESS 基本使用
tags:
  - less
id: '425'
categories:
  - 前端
date: 2018-12-11 22:30:46
---

## Less 语法

### 变量

**注释**

```less
/* 这是CSS中的注释，因此会编译到css中 */
// 这是less的注释，css不能识别这个注释， 最后不会编译到css文件
```

**变量**

```less
// @变量名: 变量值;
@color: #ccc;
p {
  color: @color;
}
```

### mixin 函数

**混入函数**

```less
// 定义一个函数：不带参数
.btn() {
  background-color: #ccc;
}
// 调用函数
.my_btn {
  .btn();
}

// 定义一个函数：带参数
.btn_border(@width) {
  border: @width solid #000;
}
.my_btn {
  // 如果函数定义了参数，调用的时候必须传入参数，否则会报错
  .btn_border(10px);
}

// 定义一个函数：带参数默认值
.btn_border(@width: 1px) {
  border: @width solid #000;
}
.my_btn {
  // 因为有默认值，所以不会报错
  .btn_border();
  .btn_border(10px);
}
```

应用：定义兼容多浏览器的圆角

```less
.border_radius(@value: 5px) {
  -webkit-border-radius: @value;
  -moz-border-radius: @value;
  -ms-border-radius: @value;
  border-radius: @value;
}
div {
  .border_radius(10px);
}
```

### 嵌套

> 我们可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。

- 使用伪类的时候 可以使用`&` 表示自己

```less
.father {
  width: 100px;
  // 子代
  .son1 {
  }
  // 后代
  > .son2 {
  }
  // 交集： & 表示本身
  &.now {
  }
  &::before {
  }
  &:hover {
  }
}
```

### 导入

```less
// 可以省略后缀名
@import 'variable';
@import 'maxin';
```

模块化的思想，分模块进行管理这些 less 文件，最终只需要使用 import 将 less 引入到一起即可

### 函数（运算）

> 在我们的 CSS 中充斥着大量的数值型的 value，less 可以直接支持运算，也提供了一系列的函数提供给我们使用。

```
li {
  float: left;
  width: round(100%/6, 2);
  height: 100px + 100px;
}
```

http://www.1024i.com/demo/less/reference.html
