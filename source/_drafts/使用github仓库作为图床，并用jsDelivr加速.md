---
title: 使用github 仓库作为图床，并用jsDelivr加速
tags: []
id: '2007'
categories:
  -
date: 2020-12-09
---

创建一个仓库来存储需要存放的静态资源

使用JSDelivr加速加载Github资源

形式为
```
https://cdn.jsdelivr.net/gh/{Github用户名}/{Github仓库名}@{版本名}/{仓库下资源路径}
```

其中版本名可以是 github 当前仓库的Release或分支名

例如 github 链接为
```
https://github.com/cuilongjin/static/blob/main/test.txt
```

而使用JSDelivr加速链接为
```
https://cdn.jsdelivr.net/gh/cuilongjin/static@main/test.txt
```

picgo进行图片上传
一款图片上传的工具，目前支持SM.MS图床，微博图床，七牛图床，腾讯云COS，阿里云OSS，Imgur，又拍云，GitHub等图床
github地址：https://github.com/Molunerfinn/PicGo
配置手册：https://picgo.github.io/PicGo-Doc/zh/guide/
插件：https://github.com/PicGo/Awesome-PicGo

token获取: https://github.com/settings/tokens，点击 Generate new token ,复选框为你这个token的权限，全部勾选即可
2d9cbc1bfc4bf7d0ec63ed9e428d8af11048e5d9
1fd37004e4527fea373a81f208e527ed977207eb

https://docs.github.com/cn/free-pro-team@latest/rest
