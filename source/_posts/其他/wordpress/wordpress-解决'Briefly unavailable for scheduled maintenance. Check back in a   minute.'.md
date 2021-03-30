---
title: 解决 WordPress 'Briefly unavailable for scheduled maintenance. Check back in a
  minute.'
tags: []
id: '951'
categories:
  - - wordpress
date: 2020-03-14 15:49:35
---

WordPress 在升级程序、主题、插件时，都会先切换到维护模式，也就是显示 'Briefly unavailable for scheduled maintenance. Check back in a minute'，如果升级顺利，也就几秒左右就恢复正常；但是如果由于网速不佳等原因导致升级中断，WordPress 就会一直停留在维护模式，不论前台还是后台。

如何解决这个问题呢？

马上通过 FTP 登录你的网站，删除 WordPress 根目录下的 `.maintenance` ，刷新网页即可。
