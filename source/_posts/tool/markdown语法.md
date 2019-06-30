---
title: Markdown 语法
tags: Markdown
categories:
- [工具]
date: 2018/09/12 18:00:00
updated: 2019/01/27 22:29:00
---


# Markdown语法

## Markdown基本语法

待...

## Markdown使用技巧

### 换行
* 方法1：连续两个以上空格+回车
* 方法2：使用html语言换行标签：`<br>`

### 居中

* 使用align属性
* 使用`<center>`标签（HTML5 不支持）

### 首行缩进两个字符

* `&nbsp;` 不换行空格，全称No-Break Space
* `&ensp;` 半角的空格，全称是En Space
* `&emsp;` 全角的空格，全称是Em Space，占据的宽度正好是1个中文宽度

### 字体

* `*斜体*或_斜体_`
* `**粗体**`
* `***加粗斜体***`
* `~~删除线~~`
* 字号与颜色：使用内嵌HTML

```html
<font color=#0099ff size=3 face="黑体">color=#0099ff size=3 face="黑体"</font>
```
效果：<font color=#0099ff size=3 face="黑体">color=#0099ff size=3 face="黑体"</font>

### 背景色

使用内嵌 HTML 借助 table，tr，td 等表格标签的 bgcolor 属性

```html
<table><tr><td bgcolor=orange>背景色是：orange</td></tr></table>
```
效果：<table><tr><td bgcolor=orange>背景色是：orange</td></tr></table>

### 分割线

在一行中用三个以上的星号 `*` 、减号 `-` 、底线 `_` 来建立一个分隔线，中间用空格隔开，行内不能有其他东西。（除第一个符号的左侧最多添加三个空格外三个相同符号两侧可以添加任意多个空格）

### 链接

#### 文字

* 行内式：`[文字](url "title")`
* 参考式：`[文字][1]`  `[1]:url "title"`
* 自动链接：`<url>`，将链接用<>包起来，Markdown 会自动把它转成链接。

### 图片：

* 行内式：`![alt_text](url "title")`

> `alt_text`：图片的 alt 标签，用来描述图片的关键词，可以不写。最初的本意是当图片因为某种原因不能被显示时而出现的替代文字，后来又被用于SEO，可以方便搜索引擎根据 `alt_text` 里面的关键词搜索到图片。 url：可以是图片的本地地址或者是网址。"title"：鼠标悬置于图片上会出现的标题文字，可以不写。

* 参考式：同上

* 使用 img 标签：`<img src="" width="" height="">`，`<div align=center></div>` 实现居中

### 折叠按钮

```html
<details>
  <summary>
    点击展开
  </summary>
  <!-- 内部展示内容 -->
</details>
```

<details>
  <summary>
    点击展开
  </summary>

设置小三角样式：
```css
summary::-webkit-details-marker {
  color: #42b983;
}
```

</details>

## Markdown 编辑器

[typora](https://www.typora.io/)