---
title: js 中编码（encode）和解码（decode）的三种方法
tags:
  - js
id: '408'
categories:
  - - web前端
date: 2019-07-09 22:20:44
---

### js 中编码（encode）和解码（decode）的三种方法

js 对文字进行编码涉及 3 个函数：escape、encodeURI、encodeURIComponent，相应 3 个解码函数：unescape、decodeURI、decodeURIComponent

- escape()函数

定义和用法：escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串
语法：escape(string)
参数：string 必需，要被转义或编码的字符串。
返回值：已编码的 string 的副本。其中某些字符被替换成了十六进制的转义序列
说明：该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： `-_.!~*'()` ，其他所有的字符都会被转义序列替换

- encodeURI()函数

定义和用法：encodeURI() 函数可把字符串作为 URI 进行编码
语法：encodeURI(URIstring)
参数：URIstring 必需，一个字符串，含有 URI 或其他要编码的文本。
返回值：URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换
说明：该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码：`-_.!~*'()` ，该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：`;/?:@&=+$,#`

- encodeURIComponent()

定义和用法：encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
语法：encodeURIComponent(URIstring)
参数：URIstring 必需，一个字符串，含有 URI 组件或其他要编码的文本
返回值：URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换
说明：该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码：`-_.!~*'()`，其他字符（比如 ：`;/?:@&=+$,#` 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的

说明：

- encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号

- 传递参数时需要使用 encodeURIComponent，这样组合的 url 才不会被#等特殊字符截断
