---
title: word-break、word-wrap、white-space、overflow-wrap
tags: []
id: '997'
categories:
  - - uncategorized
date: 2020-03-19
---

word-wrap: normal(默认)  允许内容顶开指定的容器边界。
word-wrap: break-word; 内容将在边界内换行，如果单词太长，会被整体换行，而不会截断单词

word-wrap 是控制是否“为词断行”的，设置或检索当前行超过指定容器的边界时是否断开转行。长串的英文单词不被断开而是换行

word-break语法：
word-break: normal(默认) | break-all | keep-all

word-break:break-all 是断开单词。主要解决了长串英文的问题，如果单词太长，会被截断

white-space语法：
white-space: normal(默认) | pre | nowrap
normal: 默认。空白会被浏览器忽略。
pre: 空白会被浏览器保留。其行为方式类似HTML中的pre标签。
nowrap: 禁止换行显示
