---
title: 解决VPS通过SS访问谷歌学术受限
tags:
  - ss
id: '222'
categories:
  - - 教程
date: 2019-07-09 00:00:09
---

在网上搜索后发现有可能有以下原因：

1.你的 VPS 被人用来做爬虫爬 Google，IP 被封

2.你的 IPv4 网段有人做爬虫，网段被封

3.你的 IPv6 网段有人做爬虫，网段被封

IPv6 网段被封

强制你的 VPS 用 IPv4 来访问，具体方法在 `/etc/sysctl.conf` 后追加

```
# disable ipv6
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
```

IPv4 网段被封

强制 VPS 使用 IPv6 访问，确认打开 VPS 上的 IPv6 功能，更改 VPS 的 hosts 中指定 Google Schoolar 的 IPv6 地址，编辑`/etc/hosts`后追加：

```
## Scholar
## type 'host google.com' to get the correct ipv6 address or
## visit https://github.com/lennylxx/ipv6-hosts
2404:6800:4004:81a::200e scholar.google.cn
2404:6800:4004:81a::200e scholar.google.com.hk
2404:6800:4004:81a::200e scholar.google.com
2404:6800:4004:81a::200e scholar.l.google.com
```

更改配置后，重启 SS
