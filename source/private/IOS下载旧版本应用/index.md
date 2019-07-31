---
title: 【技术贴】IOS如何下载旧版本应用
date: 2019-06-30
---

https://www.tuicool.com/articles/VFBbmeN

https://www.xuanfengge.com/ios-how-to-download-old-app.html

## 实现原理

1. IOS 软件下载必须使用 **自己的 Apple ID** 登录 **itunes**，才能在 iPhone 上安装

2. 通过抓包软件查找 App 的 **历史版本 ID**

3. 通过抓包软件修改下载请求，将请求中 **最新版本的 ID** 改成 **历史版本 ID**，成功下载指定版本 App
