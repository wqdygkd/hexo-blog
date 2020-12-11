---
title: Jellyfin开启硬件加速
tags:
  - jellyfin
id: '1424'
categories:
  - - NAS
date: 2020-05-16 17:09:01
---

之前使用群晖 Docker 折腾 Jellyfin，解决了个人音视频收藏的基本需求，但仍有不足，比如说视频播放的时候，CPU 占用会很高（软解吃 CPU），并且会卡顿。

#### 解决方案

1、查看系统是否支持显卡硬解转码

使用 SSH 登录群晖系统，运行命令`ls /dev/dri`，若输出 card0、renderD128，则说明支持显卡硬解。

![](https://wqdy.top/wp-content/uploads/2020/05/2020-05-16_17-00-15.png)

2、给容器提权

在群群 Docker 容器中找到 Jellyfin 的容器，编辑容器的常规设置，必须勾选使用高权限执行容器。

3、添加环境

在环境中添加两项，分别是 `PUID` 值填写为 `0` ，`PGID` 值填写为 `0`

4、启用 `VAAPI` 硬件加速

Docker 中启动容器，打开 Jellyfin 网页端，依次进入控制台->播放，在硬件选项中选择 VAAPI 保存设置即可。

#### 使用效果

前后对比：
![](https://wqdy.top/wp-content/uploads/2020/05/jellyfin-3.png)

可以看到 CPU 占用明显降低了，播放也不卡顿了，效果还是非常明显的。
