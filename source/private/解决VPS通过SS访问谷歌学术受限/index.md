---
title: 【技术贴】解决VPS通过SS访问谷歌学术受限
date: 2019-07-09
---



在网上搜索后发现有可能有以下原因：

1.你的VPS被人用来做爬虫爬Google，IP被封。
2.你的IPv4网段有人做爬虫，网段被封。
3.你的IPv6网段有人做爬虫，网段被封。



IPv6 网段被封

强制你的VPS用IPv4来访问，具体方法在`/etc/sysctl.conf`后追加

```
# disable ipv6
net.ipv6.conf.all.disable_ipv6=1
net.ipv6.conf.default.disable_ipv6=1
net.ipv6.conf.lo.disable_ipv6=1
```



IPv4 网段被封

强制VPS使用IPv6访问，确认打开VPS上的IPv6功能，更改VPS的hosts中指定Google Schoolar的IPv6地址，编辑`/etc/hosts`后追加：

```
## Scholar
## type 'host google.com' to get the correct ipv6 address or
## visit https://github.com/lennylxx/ipv6-hosts
2404:6800:4004:81a::200e scholar.google.cn
2404:6800:4004:81a::200e scholar.google.com.hk
2404:6800:4004:81a::200e scholar.google.com
2404:6800:4004:81a::200e scholar.l.google.com
```



更改配置后，重启SS