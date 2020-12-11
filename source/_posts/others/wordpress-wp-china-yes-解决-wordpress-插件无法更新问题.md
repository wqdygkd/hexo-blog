---
title: WP-China-Yes 解决 wordpress 插件无法更新问题
tags: []
id: '957'
categories:
  - - wordpress
date: 2020-03-18 15:22:24
---

去年开始国内无法正常访问 `wordpress.org`, 一直显示 `429 Too Many Requests` 错误，所以在我们使用 wordpress 程序的时候会发现无法在线安装主题或者插件，甚至无法更新 WP 版本。

WordPress 官网打不开原因可以参考：https://www.hostloc.com/thread-597678-5-1.html

情况大致是因为：

`wordpress.org` 受到了中国大陆流量的攻击，导致 WordPress 的 CDN 提供商屏蔽了中国大陆的流量，大陆用户访问插件主题商城等服务时报 429 错误。

这里推荐一款插件：WP-China-Yes

此插件将全面替换 WordPress 访问官方服务的链接为高速稳定的中国大陆节点，以此加快站点更新版本、安装升级插件主题的速度，并彻底解决 429 报错问题。

插件是开源的

发布地址：https://www.ibadboy.net/archives/3204.html
下载地址：https://github.com/wp-china-yes/wp-china-yes/releases

使用：

下载并安装插件后直接启用即可，无需设置，插件会自动接管所有 WP 访问境外服务器的流量。
插件不会更改你的 WordPress 程序，若不想使用大陆加速节点，直接停用插件即可。

常见问题：
插件/主题更新缓慢甚至超时
这种情况在大型包更新的情况下偶尔会出现，原因是第一次访问资源，云存储中还未有相应的镜像，再试一次就会好了。
