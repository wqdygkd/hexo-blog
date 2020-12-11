---
title: LESS 基本使用
tags:
  - less
id: '425'
categories:
  - - web前端
date: 2018-12-11 22:30:46
---

## Less 简介

> ***Less*  是一门 CSS 预处理语言（预先处理）,它扩展了 CSS 语言，增加了变量、Mixin、函数等特性**
>
> 浏览器不直接识别 less 文件，浏览器只识别 css 文件，所以我们写了 less 文件之后，我们需要预先把 less 文件转换成 css 文件。

本质上，LESS 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 CSS 文件。LESS 并没有裁剪 CSS 原有的特性，更不是用来取代 CSS 的，而是在现有 CSS 语法的基础上，为 CSS 加入程序式语言的特性。

**less 仅仅是写 css 的另一种方式，写出来的 less 文件浏览器也不识别，所以啊，我们写完了 less 文件，还需要通过 less 解析器解析成 css，最终浏览器引入的还是 css 文件。**

学习网站：

[官网 http://lesscss.org/](http://lesscss.org/)
[中文网 http://lesscss.cn/](http://lesscss.cn/)

## less 的编译

> 如何把 less 文件变成 css 文件

### 使用打包工具

`gulp`

`webpack`

### 使用考拉

> koala 是一个前端预处理器语言（less/sass）图形编译工具，支持 Less、Sass、Compass、CoffeeScript，帮助 web 开发者更高效地使用它们进行开发。跨平台运行，完美兼容 windows、linux、mac。

[考拉官网](http://koala-app.com/index-zh.html)

使用步骤：

1. 把`less`文件夹拖进去
2. 会在当前目录生成一个`css`目录

优点：不用 node 环境，不用 less 环境，koala 内置了

### 使用插件

easy less

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
