---
title: less 使用 - mixin 混合
categories:
  - [工具]
date: 2019/07/21
---

### mixin 混合

可以在 mixin 中使用类选择器和 id 选择器

.bgc 定义了一个属性集，在任何需要使用 .bgc 属性集的选择器中，只需像下面这样调用：(小括号是可选的)

```less
.bgc {
  background-color: #ccc;
}
div {
  color: #f00;
  .bgc();
}
```

编译后的 CSS 代码为：

```css
.bgc {
  background-color: #ccc;
}

div {
  color: #f00;
  background-color: #ccc;
}
```

总结：mixin 其实就是一种嵌套，简单的讲，mixin 就是规则级别的复用

mixin 的定义也会被原封不动的输出到编译生成的 CSS 代码中

如果希望编译生成的 CSS 代码中不包含 mixin 的定义，在定义 mixin 时，只需在 class、id 的后面添加一对小括号即可。如：

```less
.bgc() {
  background-color: #ccc;
}
div {
  .bgc;
}
```

编译后的 CSS 代码为：

```css
div {
  background-color: #ccc;
}
```

mixin 可以包含选择器

```less
.hover() {
  &:hover {
    background-color: #ccc;
  }
}
div {
  .hover;
}
```

编译后的 CSS 代码为：

```css
div:hover {
  background-color: #ccc;
}
```

### 命令空间 Namespaces

如果想要在一个更复杂的选择器中混合属性，可以堆叠多个 id 或类

可以将 mixin 置于 id 选择器之下，这样可以确保它不会和另一个库冲突

```less
#bgc {
  .inner() {
    color: red;
  }
}

div {
  #bgc.inner;
}
```

### !important 关键字

在 mixin 后使用 !important 关键字，将会标记调用所有继承的属性为!important

```less
.bgc {
  background-color: #ccc;
}

div {
  .bgc !important;
}

// 编译后 css 为
div {
  background-color: #ccc !important;
}
```

带参数的 Mixin

mixin 还可以接受参数，这些参数在混合时传递给选择器块

从上面的代码可以看出：mixin 其实就是一种嵌套，简单的讲，mixin 就是规则级别的复用。除了类选择器外，你也可以使用 id 选择器来定义 mixin。
