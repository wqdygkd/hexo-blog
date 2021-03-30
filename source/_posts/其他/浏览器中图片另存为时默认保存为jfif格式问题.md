---
title: 浏览器中图片另存为时默认保存为jfif格式问题
tags: []
id: '660'
categories:
  - - 教程
date: 2020-02-29 16:30:25
---

[jfif（JPEG File Interchange Format，JPEG 档案交换格式）](https://baike.baidu.com/item/jfif)格式是一种图片存储格式之一，由 JPEG 格式衍生而来

win10 中，在浏览器中通过图片另存为时发现默认保存为该格式时，说明系统把 JPEG 格式默认为了该格式，可以通过修改注册表还原，具体操作步骤如下：

- `WIN` + `R` 打开运行窗口，输入 `regedit` 回车
- 找到路径 `HKEY_CLASSES_ROOT\MIME\Database\Content Type\image/jpeg`，把 `extension` 的值改成 .jpg，关闭注册表即可
