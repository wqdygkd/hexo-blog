---
title: 无公网ip 使用zerotier 实现内网穿透
tags: []
id: '819'
categories:
  - - uncategorized
---

有固定的公网IP或动态的公网IP：常见的方案动态域名解析做端口转发方式等

无公网IP：常见的实现方案向日葵、teamviewer、ngrok、frp等

本文主要讲解一个无公网IP的情况，通过ZeroTier实现内网穿透，而且配置起来非常容易

ZeroTier设备支持：

免费用户可以支持100个设备，支持Windows、macOS、Linux、IOS、Android、Synology、QNAP、Western Digital MyCloud NAS等等。

ZeroTier原理：

ZeroTier虚拟了一个网段，网段为192.147.17.0/24，公司和家里分别安装ZeroTier客户端，客户端会虚拟出一个网络并加入192.147.17.0/24这个网段，在家即可访问192.147.17.22地址，反之同理。

部署：

1、创建账号

[https://my.zerotier.com](https://my.zerotier.com)

2、创建网络

进入https://my.zerotier.com/network点击Create创建网络

点击进入已创建的网络 此时可以看到Network ID，后续添加设备都会需要这个ID

Access Control，默认是Certificate (Private Network)，选择此模式表示每次在添加新的主机时，需要手动勾选是否允许连接，如果选择None (Public Network)模式，表示加入网络后自动分配IP并允许连接，从安全性来说建议使用默认选项Certificate (Private Network)，方便性来看None (Public Network)更方便，不用每次加入网络后手动勾选。

好了，一个中转的ZeroTier就配置完成了，接下来只需要在其他设备安装所对应的客户端，然后加入到这个网络中就可以了。

下优势：①. 节点之间属于 P2P UDP 直连，无需服务器中转流量，互联速度仅仅取决于你的和其他节点的直连上传带宽（当然握手之初是需要经过中心服务器来当媒婆的，之后就是UDP直连了！）；②. 节点之间的流量是加密和压缩的，所以有带宽放大的功能；③. 配置简单，只需要填入一个 Network ID ，然后管理员在 Zerotier 官网管理页面允许通过一次，以后就直接允许连上了。④.连上后各个虚拟网卡相当于同一局域网内，无应用的限制了——至于有哪些应用场景就需要读者你自己脑洞大开了。⑤.关键的一点，节点在100以内，所有功能都是免费的！