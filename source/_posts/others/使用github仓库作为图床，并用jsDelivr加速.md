---
title: 使用 github 仓库作为图床，并用 jsDelivr 加速
tags:
  - github
  - 图床
  - jsDelivr
id: 2007
date: 2020-12-09
---

1. 创建一个仓库来存储需要存放的静态资源

2. 使用JSDelivr加速加载Github资源

形式为 `https://cdn.jsdelivr.net/gh/{Github用户名}/{Github仓库名}@{版本名}/{仓库下资源路径}`

其中版本名可以是当前仓库的 Release 或分支名

例如 github 链接为

```
https://github.com/cuilongjin/static/blob/main/test.txt
```

则使用JSDelivr加速链接为

```
https://cdn.jsdelivr.net/gh/cuilongjin/static@main/test.txt
```

3. 使用 picgo 进行图片上传

> picgo 一款图片上传的工具，目前支持SM.MS图床，七牛图床，腾讯云COS，阿里云OSS，Imgur，又拍云，GitHub等图床
> github地址：https://github.com/Molunerfinn/PicGo
> 配置手册：https://picgo.github.io/PicGo-Doc/zh/guide/
> 插件：https://github.com/PicGo/Awesome-PicGo

配置 github图床

仓库名为第一步创建的仓库，分支名随意，我的为 main
token 获取地址: https://github.com/settings/tokens，点击 `Generate new token` ,复选框为你这个 token 的权限，勾选 `repo` 即可
存储路径为仓库目录，可以随意
自定义域名根据需要设置，这里我们设置为 jsdelivr 加速域名，形式为 `https://cdn.jsdelivr.net/gh/{Github用户名}/{Github仓库名}@{版本名}`

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@main/img/20210101223210.png)
