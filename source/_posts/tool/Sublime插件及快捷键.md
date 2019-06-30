---
title: sublime 插件、快捷键
tags: sublime
categories:
- [工具]
date: 2018/09/12 18:30:00
updated: 2018/11/28 16:57:00
---


# sublime 插件、快捷键
---

## 插件

* [Sublime Tutor](https://packagecontrol.io/packages/Sublime%20Tutor) ：键盘快捷方式教程
  Help > Sublime Tutor

* AlignTab ：自定义快捷键



## 快捷键

* `Ctrl + X`	如果已经选中文本，则剪切该文本。如果未选中任何文本，则剪切光标所在行
* `Ctrl + Z`	撤消
* `Ctrl + Shift + V`	缩进粘贴
* `Ctrl + Shift + Z` 或 `Ctrl + Y`	恢复
* `Ctrl + L`	Select line - Repeat to select next lines
* `Ctrl + D`	Select word - Repeat select others occurrences
* `Ctrl + Shift + D`	如果已经选中文本，则复制该文本。如果未选中任何文本，则复制光标所在行
* `Ctrl + Enter`	Insert line after
* `Ctrl + Shift + Enter`	Insert line before
* `Alt + F3`	选择所有相同单词的实例
* `Tab` 或 `Ctrl + ]`	缩进
* `Shift + Tab` 或 `Ctrl + [`	取消缩进
* `Ctrl + Shift + K`	Delete Line
* `Ctrl + KK`	Delete from cursor to end of line
* `Ctrl + K + Backspace`	 Delete from cursor to start of line
* `Alt + Shift + W`	使用标签包裹选中部分
* `Ctrl + ←`	移动光标至上一个词
* `Ctrl + →`	移动光标至下一个词
* `Ctrl + Shift + ↓`	Move line/selection down
* `Ctrl + Shift + ↑`	Move line/selection up
* `Home`	移动光标至行首
* `End`	移动光标至行尾
* `Ctrl + Home`	移动光标至文档开头
* `Ctrl + End`	移动光标至文档结尾
* `Ctrl + M`	跳转到左/右圆括号、方括号、大括号
* `Ctrl + Shift + M`	选择括号内的内容
* `Ctrl + R`	跳转到定义
* `Ctrl + /`	Comment/un-comment current line
* `Ctrl + Shift + /`	Block comment current selection
* `Ctrl + N`	新建标签
* `Ctrl + PgUp`	向左切换标签
* `Ctrl + PgDn`	向右切换标签
* `Ctrl + W`	关闭标签
* `Ctrl + Shift + T`	重新打开标签
* `Shift + 鼠标右键`	竖向选择
* `Ctrl + Shift + '`	选择与光标关联的开始和结束标签
* `Ctrl + Shift + A`	选择容器内内容
* `Ctrl + Shift + ;`	移除与你的光标相关的父标签(清除标记)
* `Ctrl + Shift + Y`	计算数学表达式
* `Alt + ↓&↑`	以0.1的步长改变数字
* `Alt + Shift + ↓&↑`	以10的步长改变数字
* `Ctrl + ↓&↑`	以1的步长改变数字
* `Ctrl+K+U` `Ctrl+K+L`	改变大小写

http://sublime.emptystack.net/

## issues
1.
> "Error: 404 Not Found
> Sorry, the requested URL 'http://127.0.0.1:51004/view/29' caused an error:
> 'buffer_id(29) is not valid (closed or unsupported file format)'
> NOTE: If you run multiple instances of Sublime Text, you may want to adjust the server_port option in order to get this plugin work again."

Quick Fix 1: Remove Strikethrough Extension

`Sublime Text > Preferences > Package Settings > OmniMarkupPreviewer > Settings - User`
paste the following to remove the strikeout package.

```css
{
    "renderer_options-MarkdownRenderer": {
        "extensions": ["tables", "fenced_code", "codehilite"]
    }
}
```

Quick Fix 2: Fix the Strikethrough Extension (if you need it)

Find the python-markdown sublime package.

`/Packages/OmniMarkupPreviewer/OmniMarkupLib/Renderers/libs/mdx_strikeout.py`

Replace the makeExtension() method with the following:

```python
def makeExtension(*args, **kwargs):
    return StrikeoutExtension(*args, **kwargs)
Save, quit and reload Sublime Text.
```
